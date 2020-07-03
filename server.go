package main

import (
	"fmt"
	"net/http"
)


func main() {
	http.Handle("/", http.FileServer(http.Dir("./dist")))
	fmt.Println("Server listening at port 3000")
	http.ListenAndServe(":3000", nil)
}
