package resume

import (
	"resume/cfg"

	"go.hasen.dev/vbeam"
	"go.hasen.dev/vbolt"

	"encoding/json"
	"io"
)

type ExperienceResponse struct {
	Company  string
	Role     string
	Location string
	Period   string
	Bullets  []string
}

type SkillResponse struct {
	Languages []string
	Tools     []string
}

type EducationResponse struct {
	School string
	Degree string
	Period string
}

type ResumeResponse struct {
	Name       string
	Title      string
	Summary    string
	Experience []ExperienceResponse
	Skills     SkillResponse
	Education  EducationResponse
}

func GetResume(ctx *vbeam.Context, req vbeam.Empty) (resp ResumeResponse, err error) {
	file, err := application.Frontend.Open("resume/resume.json")
	if err != nil {
		return
	}
	data, err := io.ReadAll(file)
	if err != nil {
		return
	}
	err = json.Unmarshal(data, &resp)
	return
}

var application *vbeam.Application

func MakeApplication() *vbeam.Application {
	vbeam.RunBackServer(cfg.Backport)
	db := vbolt.Open(cfg.DBPath)
	var app = vbeam.NewApplication("ResumeSite", db)
	vbeam.RegisterProc(app, GetResume)
	application = app
	return app
}
