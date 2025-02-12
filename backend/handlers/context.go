package handlers

import "database/sql"

type DbContext struct {
	Db *sql.DB
}
