package main

import (
	"fmt"
	"net/http"
	"os"
	"resume"

	"go.hasen.dev/vbeam"
	"go.hasen.dev/vbeam/esbuilder"
	"go.hasen.dev/vbeam/local_ui"

	"resume/cfg"
)

const Port = 8666
const Domain = "resume.localhost"
const FEDist = ".serve/frontend"

func StartLocalServer() {
	defer vbeam.NiceStackTraceOnPanic()

	app := resume.MakeApplication()
	app.Frontend = os.DirFS(FEDist)
	app.StaticData = os.DirFS(cfg.StaticDir)
	vbeam.GenerateTSBindings(app, "frontend/server.ts")

	var addr = fmt.Sprintf(":%d", Port)
	var appServer = &http.Server{Addr: addr, Handler: app}
	appServer.ListenAndServe()
}

var FEOpts = esbuilder.FEBuildOptions{
	FERoot: "frontend",
	EntryTS: []string{
		"main.tsx",
	},
	EntryHTML: []string{"index.html"},
	CopyItems: []string{
		"images",
		"resume",
	},
	Outdir: FEDist,
	Define: map[string]string{
		"BROWSER": "true",
		"DEBUG":   "true",
		"VERBOSE": "false",
	},
}

var FEWatchDirs = []string{
	"frontend",
	"frontend/images",
	"frontend/resume",
}

func main() {
	os.Mkdir(".serve", 0644)
	os.Mkdir(".serve/static", 0644)
	os.Mkdir(".serve/frontend", 0644)

	var args local_ui.LocalServerArgs
	args.Domain = Domain
	args.Port = Port
	args.FEOpts = FEOpts
	args.FEWatchDirs = FEWatchDirs
	args.StartServer = StartLocalServer

	local_ui.LaunchUI(args)
}
