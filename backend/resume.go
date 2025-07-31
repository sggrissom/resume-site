package backend

import (
	"resume/cfg"

	"go.hasen.dev/vbeam"

	"bufio"
	"encoding/json"
	"io"
	"os"
	"strings"
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
	return "resume/resume.txt"
}

func GetResume(ctx *vbeam.Context, req vbeam.Empty) (resp ResumeResponse, err error) {
	txtFile, err := application.Frontend.Open(getResumeTextPath())
	if err != nil {
		return resp, err
	}
	defer txtFile.Close()

	resp, err = ParseResumeTxt(txtFile)
	if err != nil {
		return
	}

	err = os.MkdirAll(cfg.StaticDir+"cache", 0755)
	if err != nil {
		return
	}

	outFile, err := os.Create(getResumeCachePath())
	if err != nil {
		return
	}
	defer outFile.Close()

	enc := json.NewEncoder(outFile)
	enc.SetIndent("", "  ")
	err = enc.Encode(resp)
	return
}

func ParseResumeTxt(r io.Reader) (resp ResumeResponse, err error) {
	scanner := bufio.NewScanner(r)
	var section string
	var currentExp *ExperienceResponse

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		switch strings.ToLower(line) {
		case "summary", "skills", "experience", "education":
			section = strings.ToLower(line)
			continue
		}

		switch section {
		case "":
			if resp.Name == "" {
				resp.Name = line
			} else {
				resp.Title = line
			}
		case "summary":
			if resp.Summary != "" {
				resp.Summary += " "
			}
			resp.Summary += line
		case "skills":
			if strings.HasPrefix(line, "Languages:") {
				resp.Skills.Languages = splitCSV(line[len("Languages:"):])
			} else if strings.HasPrefix(line, "Tools:") {
				resp.Skills.Tools = splitCSV(line[len("Tools:"):])
			}
		case "experience":
			if strings.HasPrefix(line, "*") && currentExp != nil {
				currentExp.Bullets = append(currentExp.Bullets, strings.TrimSpace(strings.TrimPrefix(line, "*")))
			} else {
				if currentExp != nil {
					resp.Experience = append(resp.Experience, *currentExp)
				}
				currentExp = parseExperienceHeader(line)
			}
		case "education":
			if strings.Contains(line, "–") {
				school, right := splitOnce(line, "–")
				degree, period := splitRight(right, " ")
				resp.Education.School = strings.TrimSpace(school)
				resp.Education.Degree = strings.TrimSpace(degree)
				resp.Education.Period = strings.TrimSpace(period)
			}
		}
	}
	if currentExp != nil {
		resp.Experience = append(resp.Experience, *currentExp)
	}
	return resp, scanner.Err()
}

func splitCSV(s string) []string {
	parts := strings.Split(s, ",")
	for i := range parts {
		parts[i] = strings.TrimSpace(parts[i])
	}
	return parts
}

func splitOnce(s, delim string) (string, string) {
	if i := strings.Index(s, delim); i >= 0 {
		return s[:i], s[i+len(delim):]
	}
	return s, ""
}

func splitRight(s, delim string) (string, string) {
	if i := strings.LastIndex(s, delim); i >= 0 {
		return s[:i], s[i+len(delim):]
	}
	return s, ""
}

func parseExperienceHeader(line string) *ExperienceResponse {
	left, period := splitRight(line, "        ")
	roleCompany, loc := splitOnce(left, "–")
	role, company := splitOnce(roleCompany, ",")
	return &ExperienceResponse{
		Company:  strings.TrimSpace(company),
		Role:     strings.TrimSpace(role),
		Location: strings.TrimSpace(loc),
		Period:   strings.TrimSpace(period),
		Bullets:  []string{},
	}
}
