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

	sessionsRouter := dbContext.SessionsRouter()

	server := http.NewServeMux()
	server.Handle("/sessions", sessionsRouter)

	err = http.ListenAndServe("localhost:8080", server)
	if err != nil {
		panic(err)
	}
}
