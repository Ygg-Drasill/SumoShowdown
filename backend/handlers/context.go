package handlers

import (
	"database/sql"
	"net/http"
)

type DbContext struct {
	Db *sql.DB
}

func GetSessionId(r *http.Request) int {
	return r.Context().Value("session").(int)
}

func GetPlayerToken(r *http.Request) string {
	return r.Context().Value("token").(string)
}
