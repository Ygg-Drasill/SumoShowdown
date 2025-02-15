package database

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
			session_id INTEGER,
			token TEXT NOT NULL, 
			name TEXT,
			constraint fk_session foreign key (session_id) references session(id) on delete cascade
		);
		CREATE TABLE IF NOT EXISTS match (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			session_id INTEGER,
			start_time INTEGER UNIQUE NOT NULL default (unixepoch()),
			left_won INTEGER,
			open INTEGER NOT NULL default true,
			constraint fk_session foreign key (session_id) references session(id) on delete cascade
		);
		CREATE TABLE IF NOT EXISTS ticket (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			session_id INTEGER NOT NULL,
			match_id INTEGER NOT NULL,
			player_id INTEGER NOT NULL,
			left_wins INTEGER NOT NULL,
			created_at INTEGER NOT NULL default (unixepoch()),
			constraint fk_session foreign key (session_id) references session(id) on delete cascade,
			constraint fk_match foreign key (match_id) references match(id),
			constraint fk_player foreign key (player_id) references player(id)
		);`,
	)
	if err != nil {
		panic(err)
	}
}
