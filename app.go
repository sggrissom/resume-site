package resume

import (
	"resume/cfg"

	"go.hasen.dev/vbeam"
	"go.hasen.dev/vbolt"
)

type ResumeResponse struct {
	Field string
}

type Empty struct{}

func GetResume(ctx *vbeam.Context, req Empty) (resp ResumeResponse, err error) {
	resp.Field = "test"
	return
}

func MakeApplication() *vbeam.Application {
	vbeam.RunBackServer(cfg.Backport)
	db := vbolt.Open(cfg.DBPath)
	var app = vbeam.NewApplication("ResumeSite", db)
	vbeam.RegisterProc(app, GetResume)
	return app
}
