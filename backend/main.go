package main

import (
	"database/sql"
	"net/http"
	_ "sumoshowdownapi/automigrate"
	"sumoshowdownapi/handlers"

	_ "modernc.org/sqlite"
)

func main() {
	db, err := sql.Open("sqlite", "./data.db")
	if err != nil {
		panic("no db found")
	}
	dbContext := &handlers.DbContext{
		Db: db,
	}
	server := http.NewServeMux()
	server.Handle("PUT /sessions/new", dbContext.NewSessionHandler())
	http.ListenAndServe("localhost:8080", server)
}
