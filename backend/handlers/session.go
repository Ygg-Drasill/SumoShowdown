package handlers

import (
	"encoding/json"
	"fmt"
	"math"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/google/uuid"
)

type newSessionResponse struct {
	Id   int `json:"id"`
	Code int `json:"code"`
}

func (ctx *DbContext) NewSessionHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		code := int(math.Ceil(rand.Float64() * 9999))
		var sessionId int
		err := ctx.Db.QueryRow("INSERT INTO session(code) VALUES (?) RETURNING id", code).Scan(&sessionId)
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}
		res, err := json.Marshal(newSessionResponse{
			Id:   sessionId,
			Code: code,
		})
		if err != nil {
			panic(err)
		}
		w.Header().Add("content-type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(res)
	}
}

func (ctx *DbContext) JoinSessionHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := uuid.New()
		code, err := strconv.Atoi(r.URL.Query().Get("code"))
		name := r.URL.Query().Get("name")
		if err != nil {
			writeError(w, http.StatusBadRequest, "Parameter missing")
			return
		}
		var sessionId int
		err = ctx.Db.QueryRow("SELECT id FROM session WHERE code = ?", code).Scan(&sessionId)
		if err != nil {
			writeError(w, http.StatusBadRequest, "Session not found")
			return
		}
		result, err := ctx.Db.Exec("INSERT INTO player(session_id, token, name) VALUES (?, ?, ?) RETURNING id",
			sessionId, token, name)
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}
		playerId, err := result.LastInsertId()
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}
		if playerId == 0 {
			writeError(w, http.StatusInternalServerError,
				"Unable to join session, player name may already have been taken")
			return
		}
		playerToken := fmt.Sprintf("%d.%s", sessionId, token)
		response, err := json.Marshal(struct {
			Token string `json:"token"`
		}{
			Token: playerToken,
		})
		w.Header().Add("content-type", "application/json")
		w.Write(response)
	}
}

type playerInfo struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type sessionInfo struct {
	Players []playerInfo `json:"players"`
}

func (ctx *DbContext) SessionInfoHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		response := sessionInfo{Players: make([]playerInfo, 0)}
		id := r.PathValue("id")
		rows, err := ctx.Db.Query("SELECT id, name FROM player WHERE session_id = ?", id)
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
			return
		}
		for rows.Next() {
			var playerId int
			var playerName string
			err := rows.Scan(&playerId, &playerName)
			if err != nil {
				writeError(w, http.StatusInternalServerError, err.Error())
				return
			}
			response.Players = append(response.Players, playerInfo{Id: playerId, Name: playerName})
		}
		b, err := json.Marshal(response)
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
		}
		_, err = w.Write(b)
		if err != nil {
			writeError(w, http.StatusInternalServerError, err.Error())
		}
	}
}
