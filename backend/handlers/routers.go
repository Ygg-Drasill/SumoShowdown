package handlers

import "net/http"

func (ctx *DbContext) SessionsRouter() *http.ServeMux {
	mux := http.NewServeMux()
	mux.Handle("PUT /new", ctx.NewSessionHandler())
	mux.Handle("POST /join", ctx.JoinSessionHandler())

	mux.Handle("PUT /{id}/next", ctx.NextMatchHandler())
	mux.Handle("PUT /{id}/vote", ctx.TokenMiddleware(ctx.VoteHandler()))
	return mux
}
