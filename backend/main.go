package main

import (
	"database/sql"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
	"sumoshowdownapi/handlers"

	_ "modernc.org/sqlite"
	_ "sumoshowdownapi/database" //auto-migration
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
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

	addr := fmt.Sprintf("%s:%s", os.Getenv("API_ADDRESS"), os.Getenv("API_PORT"))
	log.Println(addr)
	err = http.ListenAndServe(addr, handlers.NewCorsHandler(server))
	if err != nil {
		panic(err)
	}
}
