package handlers

import (
	"fmt"
	"log/slog"
	"net/http"
)

func writeError(w http.ResponseWriter, code int, msg string) {
	slog.Warn(fmt.Sprintf("[%d] %s", code, msg))
	w.WriteHeader(code)
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	n, err := w.Write([]byte(msg))
	if err != nil {
		slog.Warn(err.Error())
	}
	if n < len(msg) {
		slog.Warn("Responded with fewer bytes than expected")
	}
}
