package handlers

import (
	"net/http"
	"strconv"
)

func (ctx *DbContext) NextMatchHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.Atoi(r.PathValue("id"))
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		ctx.Db.Exec(`UPDATE match SET open = false WHERE session_id = $1 AND open = true;
INSERT INTO match (session_id)  VALUES ($1)`, id)

		w.WriteHeader(http.StatusCreated)
	}
}

func (ctx *DbContext) VoteHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sessionId := GetSessionId(r)
		playerToken := GetPlayerToken(r)
		pathId, err := strconv.Atoi(r.PathValue("id"))
		if sessionId != pathId || err != nil {
			writeError(w, http.StatusBadRequest, "Session ID mismatch")
			return
		}
		prediction := r.URL.Query().Get("prediction")
		var leftWins bool
		switch prediction {
		case "left":
			leftWins = true
			break
		case "right":
			leftWins = false
			break
		default:
			writeError(w, http.StatusBadRequest, "Invalid prediction")
			return
		}

		//TODO: Use unique constraint (player.id, match.id) instead of SQL monster:
		result, err := ctx.Db.Exec(`WITH
current_player AS (SELECT id, session_id FROM player WHERE token = ?),
current_match AS ( SELECT match.id FROM current_player LEFT JOIN match WHERE match.session_id = current_player.session_id ORDER BY start_time DESC LIMIT 1 ),
match_tickets AS ( SELECT current_match.id as mid, ticket.player_id FROM current_match JOIN ticket ON current_match.id = ticket.match_id )
INSERT INTO ticket(session_id, match_id, player_id, left_wins)
SELECT current_player.session_id, mid, current_player.id, ?
FROM current_player, match_tickets WHERE NOT EXISTS(
SELECT id FROM current_player JOIN match_tickets ON current_player.id = match_tickets.player_id)`, playerToken, leftWins)

		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}
		if rowsAffected == 0 {
			writeError(w, http.StatusBadRequest,
				"Player unable to vote. Possible causes: No match available, player already voted or voting is closed")
			return
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func (ctx *DbContext) CloseVotingHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sessionId := r.PathValue("id")
		result, err := ctx.Db.Exec(`UPDATE match SET open = false FROM 
                                  (SELECT * FROM match WHERE session_id = $1 AND open = true ORDER BY start_time DESC LIMIT 1)`, sessionId)
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}
		if rowsAffected == 0 {
			writeError(w, http.StatusBadRequest, "No open match found")
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func (ctx *DbContext) EndMatchHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sessionId := r.PathValue("id")
		winner := r.URL.Query().Get("winner")
		var leftWon bool
		switch winner {
		case "left":
			leftWon = true
			break
		case "right":
			leftWon = false
			break
		default:
			writeError(w, http.StatusBadRequest, "Invalid Winner")
			return
		}
		result, err := ctx.Db.Exec(`UPDATE match SET open = false, left_won = $2 FROM 
                                  (SELECT * FROM match WHERE session_id = $1 AND open = false ORDER BY start_time DESC LIMIT 1)`,
			sessionId, leftWon)
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}
		if rowsAffected == 0 {
			writeError(w, http.StatusBadRequest, "No left winner found")
			return
		}
	}
}

type playerResult struct {
	id      int
	name    string
	correct bool
}

type matchResult struct {
	matchId         int
	winner          string
	playerResults   []playerResult
	ticketCreatedAt int
}

func (ctx *DbContext) MatchResultHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		matchId, err := strconv.Atoi(r.URL.Query().Get("match_id"))
		if err != nil {
			writeError(w, http.StatusBadRequest, "Invalid match ID")
			return
		}
		rows, err := ctx.Db.Query("", matchId)
		defer rows.Close()
		for rows.Next() {
		}
	}
}
