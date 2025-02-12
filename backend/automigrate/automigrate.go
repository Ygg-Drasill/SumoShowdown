package automigrate

import (
	"context"
	"database/sql"

	_ "modernc.org/sqlite"
)

func init() {
	db, err := sql.Open("sqlite", "./data.db")
	if err != nil {
		panic(err)
	}
	_, err = db.ExecContext(
		context.Background(),
		`CREATE TABLE IF NOT EXISTS session (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			code INTEGER UNIQUE NOT NULL
		);
		CREATE TABLE IF NOT EXISTS player (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			session_id INTEGER REFERENCES session(id),
			token TEXT NOT NULL,
			name TEXT
		);
		CREATE TABLE IF NOT EXISTS match (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			session_id INTEGER REFERENCES session(id),
			left_won INTEGER
		);
		CREATE TABLE IF NOT EXISTS ticket (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			session_id INTEGER REFERENCES session(id),
			match_id INTEGER REFERENCES match(id),
			player_id INTEGER REFERENCES player(id),
			left_wins INTEGER NOT NULL
		);`,
	)
	if err != nil {
		panic(err)
	}
}
