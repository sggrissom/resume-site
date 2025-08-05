package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"go.hasen.dev/vbeam/esbuilder"
)

func main() {
	log.Println("Starting frontend build…")

	reportCh := make(chan esbuilder.ESReport, 2)

	options := esbuilder.FEBuildOptions{
		FERoot:       "frontend",
		EntryTS:      []string{"main.tsx"},
		EntryHTML:    []string{"index.html"},
		CopyItems:    []string{"images", "resume"},
		Outdir:       "release/dist",
		NoSourceMaps: true,
		Define: map[string]string{
			"BROWSER": "true",
			"DEBUG":   "false",
			"VERBOSE": "false",
		},
	}

	ok := esbuilder.FEBuild(options, reportCh)

	report := <-reportCh

	if !ok || len(report.Errors) > 0 {
		log.Println("Build completed with errors:")
		for _, e := range report.Errors {
			log.Printf("  %s (%d:%d)\n", e.Text, e.Location.Line, e.Location.Column)
		}
		os.Exit(1)
	}

	fmt.Printf(" Built into release/dist in %s (started at %s)\n",
		report.Duration.Truncate(time.Millisecond),
		report.Time.Format("15:04:05"),
	)
}
