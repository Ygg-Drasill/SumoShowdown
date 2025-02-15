package main

import (
	"database/sql"
	"net/http"
	"sumoshowdownapi/handlers"

	_ "modernc.org/sqlite"
	_ "sumoshowdownapi/database" //auto-migration
)

func main() {
	db, err := sql.Open("sqlite", "./data.db")
	if err != nil {
		panic("no db found")
	}
	dbContext := &handlers.DbContext{Db: db}

	server := http.NewServeMux()
	server.Handle("PUT /sessions/new", dbContext.NewSessionHandler())
	server.Handle("POST /sessions/join", dbContext.JoinSessionHandler())

	server.Handle("PUT 	/sessions/{id}/next", dbContext.NextMatchHandler())
	server.Handle("PUT 	/sessions/{id}/vote", dbContext.TokenMiddleware(dbContext.VoteHandler()))
	server.Handle("PATCH /sessions/{id}/votes/close", dbContext.CloseVotingHandler())
	server.Handle("GET /sessions/:id/match/results", dbContext.MatchResultHandler())

	err = http.ListenAndServe("localhost:8080", server)
	if err != nil {
		panic(err)
	}
}
