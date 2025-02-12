package handlers

import (
	"encoding/json"
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
		ctx.Db.QueryRow("INSERT INTO session(code) VALUES (?)", code).Scan(&sessionId)
		res, err := json.Marshal(newSessionResponse{
			Id:   sessionId,
			Code: code,
		})
		if err != nil {
			panic(err)
		}
		w.WriteHeader(300)
		w.Header().Add("content-type", "application/json")
		w.Write(res)
	}
}

func (ctx *DbContext) JoinSessionHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		token := uuid.New()
		code, err := strconv.Atoi(r.URL.Query().Get("code"))
		name := r.URL.Query().Get("name")
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("parameter missing"))
			return
		}
		var sessionId int
		err = ctx.Db.QueryRow("SELECT id FROM session WHERE code = ?", code).Scan(&sessionId)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("session not found"))
			return
		}
		ctx.Db.Exec("INSERT INTO player(session_id, token, name) VALUES (?, ?, ?)", sessionId, token, name)
		w.Write([]byte(token.String()))
	}
}
