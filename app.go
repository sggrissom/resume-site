package resume

import (
	"resume/cfg"

	"go.hasen.dev/vbeam"
	"go.hasen.dev/vbolt"
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
	//todo, parse from markdown
	resp.Name = "Steven Grissom"
	resp.Title = "Senior Software Engineer"
	resp.Summary = "Senior Software Engineer with 11+ years building full‑stack systems and owning features end‑to‑end, from ideation through day‑to‑day support. Deep expertise in backend architecture (Java, PHP, C#), distributed workflows, and performance‑critical services, with frontend work in React/TypeScript. Experienced operating and scaling live production systems, debugging complex issues in large codebases, and collaborating with cross‑functional partners to deliver user‑focused solutions."
	resp.Skills.Languages = []string{"Java", "C#", "Javascript", "Typescript", "PHP", "C", "C++"}
	resp.Skills.Tools = []string{"React", "Elasticsearch", "Solr", "Lucene", "AWS", "Zend", "RabbitMQ", "Kibana"}
	resp.Experience = []ExperienceResponse{
		{
			Company:  "Veeva Systems Inc",
			Role:     "Senior Software Engineer",
			Location: "Pleasanton, CA (Remote)",
			Period:   "Jan 2023 - Present",
			Bullets: []string{
				"Acted as backend-focused technical lead for full-stack feature development on a B2B learning platform, focusing on asynchronous job processing, system integration, and reliable data workflows.",
				"Led implementation of an automation system that syncs user and training profiles, eliminating manual setup and ensuring training eligibility is maintained across user lifecycle events.",
				"Developed backend logic to support global GCP training auto-completion by querying a multi-tenant registry and retrieving certificates from a shared S3 bucket, reducing redundant training across customers.",
				"Delivered a rule-based curriculum outcome system from end to end, with frontend configuration in React and backend async handling, laying the groundwork for extensible training automation.",
				"Investigate and resolve production issues as part of on-call rotation, using distributed log tracing and service-level debugging to identify and resolve issues impacting customers.",
				"Collaborate with product managers, QA, and designers to scope features and ensure architectural alignment with platform goals.",
				"Mentor junior developers, review code, give team-level technical presentations, and help shape architecture during sprint planning and implementation.",
			},
		},
		{
			Company:  "Paycom",
			Role:     "Senior Software Developer",
			Location: "Oklahoma City, OK",
			Period:   "Sep 2016 - Dec 2022",
			Bullets: []string{
				"Contributed to a high-volume Applicant Tracking System within Paycom’s HR software suite, delivering full-stack features across candidate search, requisition workflows, and offer management. Focused on performance, maintainability, and system reliability while leading cross-team initiatives from prototype to production.",
				"Prototyped and led development of a high-performance resume search engine using Elasticsearch, reducing query times from 30+ seconds to under 100ms. Designed a custom C# sync service to keep search data in sync with MySQL in a predominantly PHP-based ecosystem.",
				"Delivered a large-scale offer letter management system with templating, approval workflows, and PDF generation. Integrated with payroll and onboarding systems by collaborating across multiple product teams to ensure data consistency and automation.",
				"Introduced fast, custom unit testing frameworks (C#, PHP, React) to accelerate developer feedback loops, cutting suite runtime from over a minute to under 5 seconds and promoting test-driven development.",
				"Migrated legacy frontend features to React and RESTful APIs to support mobile compatibility and improved UI performance.",
				"Mentored junior developers, authored technical documentation, and served as technical lead on cross-team projects through all phases of planning, implementation, and delivery.",
			},
		},
		{
			Company:  "Federal Aviation Administration",
			Role:     "Electrical Engineer",
			Location: "Oklahoma City, OK",
			Period:   "Aug 2014 - July 2016",
			Bullets: []string{
				"Built a high-speed C++ application to parse fault logs, reducing processing time from 2 minutes to under 1 second, adopted by 8–10 engineers.",
			},
		},
		{
			Company:  "K20 Center",
			Role:     "Computer Programmer",
			Location: "Norman, OK",
			Period:   "Aug 2012 - July 2014",
			Bullets: []string{
				"Developed a native iPad app in Objective-C for school administrators, distributed via the App Store.",
				"Built and maintained PHP/JavaScript web applications to support educational programs.",
			},
		},
	}
	resp.Education.School = "University of Oklahoma"
	resp.Education.Degree = "BS in Computer Engineering, Magna Cum Laude"
	resp.Education.Period = "2014"
	return
}

func MakeApplication() *vbeam.Application {
	vbeam.RunBackServer(cfg.Backport)
	db := vbolt.Open(cfg.DBPath)
	var app = vbeam.NewApplication("ResumeSite", db)
	vbeam.RegisterProc(app, GetResume)
	return app
}
