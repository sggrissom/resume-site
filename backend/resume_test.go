package backend

import (
	"strings"
	"testing"
)

func TestParseResumeTxt_Basic(t *testing.T) {
	input := `
Steven Grissom
Senior Software Engineer

Summary
I build stuff.

Skills
Languages: Go, C++
Tools: React, Solr

Experience
Senior Engineer, ACME Corp – Anywhere, USA        2020 – Present
* Built cool stuff.
* Led a team.

Education
Some University – BS in Computer Engineering         2010
`

	expected := ResumeResponse{
		Name:    "Steven Grissom",
		Title:   "Senior Software Engineer",
		Summary: "I build stuff.",
		Skills: SkillResponse{
			Languages: []string{"Go", "C++"},
			Tools:     []string{"React", "Solr"},
		},
		Experience: []ExperienceResponse{
			{
				Company:  "ACME Corp",
				Role:     "Senior Engineer",
				Location: "Anywhere, USA",
				Period:   "2020 – Present",
				Bullets:  []string{"Built cool stuff.", "Led a team."},
			},
		},
		Education: EducationResponse{
			School: "Some University",
			Degree: "BS in Computer Engineering",
			Period: "2010",
		},
	}

	actual, err := ParseResumeTxt(strings.NewReader(input))
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if actual.Name != expected.Name ||
		actual.Title != expected.Title ||
		actual.Summary != expected.Summary {
		t.Errorf("top-level fields don't match.\nGot: %+v\nWant: %+v", actual, expected)
	}

	if len(actual.Experience) != 1 ||
		actual.Experience[0].Company != "ACME Corp" {
		t.Errorf("experience section doesn't match.\nGot: %+v\nWant: %+v", actual.Experience, expected.Experience)
	}

	if len(actual.Skills.Languages) != 2 || actual.Skills.Languages[0] != "Go" {
		t.Errorf("skills section doesn't match.\nGot: %+v\nWant: %+v", actual.Skills, expected.Skills)
	}
}
