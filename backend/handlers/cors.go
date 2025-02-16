package handlers

import "net/http"

type CorsHandler struct {
	handler http.Handler
}

func NewCorsHandler(h http.Handler) *CorsHandler {
	return &CorsHandler{h}
}

func (h *CorsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	h.handler.ServeHTTP(w, r)
}
