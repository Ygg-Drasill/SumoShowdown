package handlers

import (
	"net/http"
	"os"
)

type CorsHandler struct {
	handler http.Handler
}

func NewCorsHandler(h http.Handler) *CorsHandler {
	return &CorsHandler{h}
}

var env string

func (h *CorsHandler) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	if len(env) == 0 {
		env = os.Getenv("ENVIRONMENT")
	}
	var origin string = request.Header.Get("Origin")
	if env != "dev" {
		origin = "http://sumoshowdown.games"
	}
	writer.Header().Set("Access-Control-Allow-Origin", origin)
	writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE")
	writer.Header().Set("Access-Control-Allow-Credentials", "true")
	writer.Header().Set("Access-Control-Allow-Headers", "Authorization, Origin, Content-Type, Accept, X-Requested-With")
	if request.Method == "OPTIONS" {
		writer.WriteHeader(http.StatusOK)
	} else {
		h.handler.ServeHTTP(writer, request)
	}
}
