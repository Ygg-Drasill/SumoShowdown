package handlers

import (
	"context"
	"net/http"
	"strconv"
	"strings"
)

func (ctx *DbContext) TokenMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")
		if len(auth) == 0 {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("No token provided"))
			return
		}
		if !strings.HasPrefix(auth, "Bearer ") {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Token must be a bearer token"))
			return
		}

		parts := strings.Split(strings.TrimPrefix(auth, "Bearer "), ".")
		token := parts[1]
		sessionId, err := strconv.Atoi(parts[0])
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Invalid token"))
			return
		}

		var validPlayerRows int
		err = ctx.Db.QueryRow(`SELECT count(*) FROM session JOIN main.player ON session.id = player.session_id
         WHERE session.id = ? AND player.token = ?`, sessionId, token).Scan(&validPlayerRows)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		if validPlayerRows == 0 {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Invalid token"))
			return
		}

		r = r.WithContext(context.WithValue(r.Context(), "session", sessionId))
		r = r.WithContext(context.WithValue(r.Context(), "token", token))
		next.ServeHTTP(w, r)
	})
}
