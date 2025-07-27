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

	core_server "go.hasen.dev/core_server/lib"
)

//go:embed dist
var embedded embed.FS

func main() {
	distFS, err := fs.Sub(embedded, "dist")
	if err != nil {
		log.Fatalf("failed to sub‐fs: %v", err)
	}

	app := resume.MakeApplication()

	app.Frontend = distFS
	app.StaticData = os.DirFS(cfg.StaticDir)

	mux := http.NewServeMux()
	mux.Handle("/rpc/", app)
	mux.Handle("/", http.FileServer(http.FS(distFS)))

	const (
		Domain = "grissom.zone"
		Port   = 8666
	)
	core_server.AnnounceForwardTarget(Domain, Port)

	addr := fmt.Sprintf(":%d", Port)
	log.Printf("listening on %s (for %q)\n", addr, Domain)
	log.Fatal(http.ListenAndServe(addr, mux))
}
