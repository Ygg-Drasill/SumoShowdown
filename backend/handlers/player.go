package handlers

import "net/http"

type userRespone struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type userTokenRespone struct {
	Id    int    `json:"id"`
	Token string `json:"token"`
}
