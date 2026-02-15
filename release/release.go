//go:build release

package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"

	"resume"
	"resume/cfg"
)

//go:embed dist
var embedded embed.FS

const Port = 8660

func main() {
	distFS, err := fs.Sub(embedded, "dist")
	if err != nil {
		log.Fatalf("failed to sub‐fs: %v", err)
	}

	app := resume.MakeApplication()
	app.Frontend = distFS
	app.StaticData = os.DirFS(cfg.StaticDir)

	addr := fmt.Sprintf(":%d", Port)
	log.Printf("listening on %s\n", addr)
	var appServer = &http.Server{Addr: addr, Handler: resume.LogRequestsMiddleware(app)}
	appServer.ListenAndServe()
}
