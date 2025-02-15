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
		ctx.Db.Exec(`INSERT INTO match (session_id, start_time) VALUES (?, unixepoch())`, id)

		w.WriteHeader(http.StatusCreated)
	}
}

func (ctx *DbContext) VoteHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sessionId := GetSessionId(r)
		playerToken := GetPlayerToken(r)
		pathId, err := strconv.Atoi(r.PathValue("id"))
		if sessionId != pathId || err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Session id mismatch"))
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
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Invalid prediction"))
			return
		}

		result, err := ctx.Db.Exec(`WITH current_match AS ( 
SELECT * FROM match WHERE session_id = ? ORDER BY start_time DESC LIMIT 1 ),
current_player AS ( 
SELECT * FROM player WHERE token = ? ),
player_votes AS (
SELECT count(*) AS vote_count FROM player JOIN ticket ON player.id = ticket.player_id JOIN current_match m on m.id = ticket.match_id)
INSERT INTO ticket(session_id, match_id, player_id, left_wins)
SELECT current_match.session_id, current_match.id, current_player.id, ?
FROM current_match, current_player, player_votes
WHERE player_votes.vote_count = false`, sessionId, playerToken, leftWins)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(err.Error()))
			return
		}
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}
		if rowsAffected == 0 {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Player unable to vote. Possible causes: No match available, player already voted or voting is closed"))
			return
		}

		w.WriteHeader(http.StatusCreated)
	}
}
