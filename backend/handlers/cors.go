package handlers

import "net/http"

type CorsHandler struct {
	handler http.Handler
}

func NewCorsHandler(h http.Handler) *CorsHandler {
	return &CorsHandler{h}
}

func (h *CorsHandler) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Access-Control-Allow-Origin", "*")
	writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	h.handler.ServeHTTP(writer, request)
}
