package main

import (
	"flag"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strings"
)

var tmpl = template.Must(template.ParseFiles("html/index.html"))

func homeHandler(w http.ResponseWriter, r *http.Request) {
	if err := tmpl.Execute(w, nil); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	fmt.Println("resume site starting")

	mux := http.NewServeMux()

	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	mux.HandleFunc("/", homeHandler)

	// HTTP to HTTPS redirect handler
	go func() {
		log.Fatal(http.ListenAndServe(":8665", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			host := strings.Split(r.Host, ":")[0]
			targetURL := "https://" + host + r.URL.Path
			http.Redirect(w, r, targetURL, http.StatusMovedPermanently)
		})))
	}()

	useTLS := flag.Bool("tls", false, "Enable TLS (HTTPS)")
	flag.Parse()

	addr := "localhost:8666"
	log.Printf("Starting server on %s\n", addr)

	// Conditionally enable TLS
	if *useTLS {
		log.Println("TLS enabled. Using cert.pem and privkey.pem")
		log.Fatal(http.ListenAndServeTLS(addr, "cert.pem", "privkey.pem", mux))
	} else {
		log.Println("TLS disabled. Running HTTP only")
		log.Fatal(http.ListenAndServe(addr, mux))
	}
}
