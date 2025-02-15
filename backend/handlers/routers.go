package handlers

import "net/http"

func (ctx *DbContext) SessionsRouter() *http.ServeMux {
	mux := http.NewServeMux()

	return mux
}
