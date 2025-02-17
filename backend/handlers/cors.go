package handlers

import "net/http"

type CorsHandler struct {
	handler http.Handler
}

func NewCorsHandler(h http.Handler) *CorsHandler {
	return &CorsHandler{h}
}

func (h *CorsHandler) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE")
	writer.Header().Set("Access-Control-Allow-Credentials", "true")
	writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, Accept")
	h.handler.ServeHTTP(writer, request)
}
