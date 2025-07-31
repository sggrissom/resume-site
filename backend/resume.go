package backend

import (
	"resume/cfg"

	"go.hasen.dev/vbeam"

	"encoding/json"
	"io"
	"os"
)

var application *vbeam.Application

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

func RegisterResumeRoutes(app *vbeam.Application) {
	vbeam.RegisterProc(app, GetResume)
	application = app
}

func getResumeCachePath() string {
	return cfg.StaticDir + "cache/resume.json"
}

func getResumeTextPath() string {
	return "resume/resume.json"
}

func GetResume(ctx *vbeam.Context, req vbeam.Empty) (resp ResumeResponse, err error) {
	srcFile, err := application.Frontend.Open(getResumeTextPath())
	if err != nil {
		return resp, err
	}
	defer srcFile.Close()

	err = os.MkdirAll(cfg.StaticDir+"cache", 0755)
	if err != nil {
		return resp, err
	}

	dstFile, err := os.Create(getResumeCachePath())
	if err != nil {
		return resp, err
	}
	defer dstFile.Close()

	_, err = io.Copy(dstFile, srcFile)
	if err != nil {
		return resp, err
	}

	file, err := os.Open(getResumeCachePath())
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
