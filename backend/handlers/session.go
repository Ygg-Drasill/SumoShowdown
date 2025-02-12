package handlers

import (
	"encoding/json"
	"math"
	"math/rand"
	"net/http"
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
