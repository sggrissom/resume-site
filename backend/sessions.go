package backend

import (
	"fmt"
	"resume/cfg"
	"strings"
	"time"

	"go.hasen.dev/generic"
	"go.hasen.dev/vbeam"
	"go.hasen.dev/vbolt"
	"go.hasen.dev/vpack"
)

type Session struct {
	Id           int
	StartTime    time.Time
	EndTime      time.Time
	Ip           string
	UserAgent    string
	RequestCount int
	IsBot        bool
	IsMobile     bool
	Platform     string
	Browser      string
}

type Visit struct {
	Id        int
	Timestamp time.Time
	Ip        string
	UserAgent string
	Referrer  string
	Path      string
}

func PackSession(self *Session, buf *vpack.Buffer) {
	vpack.Version(1, buf)
	vpack.Int(&self.Id, buf)
	vpack.UnixTime(&self.StartTime, buf)
	vpack.UnixTime(&self.EndTime, buf)
	vpack.String(&self.Ip, buf)
	vpack.String(&self.UserAgent, buf)
	vpack.Int(&self.RequestCount, buf)
	vpack.Bool(&self.IsBot, buf)
	vpack.Bool(&self.IsMobile, buf)
	vpack.String(&self.Platform, buf)
	vpack.String(&self.Browser, buf)
}

func PackVisit(self *Visit, buf *vpack.Buffer) {
	vpack.Version(1, buf)
	vpack.Int(&self.Id, buf)
	vpack.UnixTime(&self.Timestamp, buf)
	vpack.String(&self.Ip, buf)
	vpack.String(&self.UserAgent, buf)
	vpack.String(&self.Path, buf)
}

// Buckets
// =============================================================================

var SessionBucket = vbolt.Bucket(&cfg.Info, "session", vpack.FInt, PackSession)
var VisitBucket = vbolt.Bucket(&cfg.Info, "visit", vpack.FInt, PackVisit)

// SessionIndex term: UserAgent + ip, priority: end time, target: session id
var SessionIndex = vbolt.IndexExt(&cfg.Info, "session_by",
	vpack.StringZ, vpack.UnixTimeKey, vpack.FInt)

func AddVisitTx(tx *vbolt.Tx, ip string, userAgent string, referrer string, path string) {
	var visit Visit
	visit.Id = vbolt.NextIntId(tx, VisitBucket)
	visit.Timestamp = time.Now()
	visit.Ip = ip
	visit.UserAgent = userAgent
	visit.Referrer = referrer
	visit.Path = path

	vbolt.Write(tx, VisitBucket, visit.Id, &visit)

	session := getCurrentSessionForVisit(tx, visit)
	if session != nil {
		UpdateSessionTx(tx, visit, session)
	} else {
		session = AddSessionTx(tx, visit)
	}
	UpdateSessionIndex(tx, session)
}

func UpdateSessionIndex(tx *vbolt.Tx, session *Session) {
	term := fmt.Sprintf("%s-%s", session.Ip, session.UserAgent)
	priority := session.EndTime
	vbolt.SetTargetTermsUniform(
		tx,
		SessionIndex,
		session.Id,
		[]string{term},
		priority,
	)
}

func getCurrentSessionForVisit(tx *vbolt.Tx, visit Visit) *Session {
	term := fmt.Sprintf("%s-%s", visit.Ip, visit.UserAgent)
	var sessionIds []int
	window := vbolt.Window{}
	vbolt.ReadTermTargets(
		tx,
		SessionIndex,
		term,
		&sessionIds,
		window)
	if len(sessionIds) > 0 {
		var mostRecentSession Session
		vbolt.Read(tx, SessionBucket, sessionIds[0], &mostRecentSession)
		oneHourAgo := time.Now().Add(-time.Hour)
		if mostRecentSession.EndTime.After(oneHourAgo) {
			return &mostRecentSession
		}
	}
	return nil
}

func UpdateSessionTx(tx *vbolt.Tx, visit Visit, session *Session) {
	session.EndTime = time.Now()
	session.RequestCount = session.RequestCount + 1

	vbolt.Write(tx, SessionBucket, session.Id, session)
}

func AddSessionTx(tx *vbolt.Tx, visit Visit) *Session {
	var session Session
	session.Id = vbolt.NextIntId(tx, SessionBucket)
	session.StartTime = time.Now()
	session.EndTime = time.Now()
	session.Ip = visit.Ip
	session.UserAgent = visit.UserAgent
	session.IsBot = isUserAgentABot(visit.UserAgent)
	session.IsMobile = isUserAgentMobile(visit.UserAgent)
	session.Platform = getPlaform(visit.UserAgent)
	session.Browser = getBrowser(visit.UserAgent)
	session.RequestCount = 1

	vbolt.Write(tx, SessionBucket, session.Id, &session)
	return &session
}

func isUserAgentABot(userAgent string) bool {
	ua := strings.ToLower(userAgent)
	if strings.Contains(ua, "bot") || strings.Contains(ua, "crawl") || strings.Contains(ua, "spider") {
		return true
	}
	return false

}

func isUserAgentMobile(userAgent string) bool {
	ua := strings.ToLower(userAgent)
	if strings.Contains(ua, "mobi") || strings.Contains(ua, "android") || strings.Contains(ua, "iphone") {
		return true
	}
	return false
}

func getPlaform(userAgent string) string {
	ua := strings.ToLower(userAgent)
	switch {
	case strings.Contains(ua, "windows"):
		return "Windows"
	case strings.Contains(ua, "macintosh"):
		return "Mac"
	case strings.Contains(ua, "linux"):
		return "Linux"
	case strings.Contains(ua, "cros"):
		return "ChromeOS"
	case strings.Contains(ua, "iphone"):
		return "iPhone"
	case strings.Contains(ua, "ios"):
		return "iOS"
	case strings.Contains(ua, "android"):
		return "Android"
	default:
		return "Unknown"
	}
}

func getBrowser(userAgent string) string {
	ua := strings.ToLower(userAgent)
	switch {
	case strings.Contains(ua, "chrome"):
		return "Chrome"
	case strings.Contains(ua, "firefox"):
		return "Firefox"
	case strings.Contains(ua, "safari") && !strings.Contains(ua, "chrome"):
		return "Safari"
	case strings.Contains(ua, "edge"):
		return "Edge"
	default:
		return "Unknown"
	}
}

func GetAllVisits(tx *vbolt.Tx) (visits []Visit) {
	vbolt.IterateAll(tx, VisitBucket, func(key int, value Visit) bool {
		generic.Append(&visits, value)
		return true
	})
	return visits
}

func GetAllSessions(tx *vbolt.Tx) (sessions []Session) {
	vbolt.IterateAll(tx, SessionBucket, func(key int, value Session) bool {
		generic.Append(&sessions, value)
		return true
	})
	return sessions
}

func RegisterVisitRoutes(app *vbeam.Application) {
	vbeam.RegisterProc(app, GetVisits)
	vbeam.RegisterProc(app, GetSessions)
	vbeam.RegisterProc(app, GetSessionStats)
	vbeam.RegisterProc(app, GetTopPages)
	vbeam.RegisterProc(app, GetReferrerStats)
}

type VisitsResponse struct {
	Visits []Visit
}

func GetVisits(ctx *vbeam.Context, req vbeam.Empty) (resp VisitsResponse, err error) {
	resp.Visits = GetAllVisits(ctx.Tx)
	return
}

type SessionsResponse struct {
	Sessions []Session
}

func GetSessions(ctx *vbeam.Context, req vbeam.Empty) (resp SessionsResponse, err error) {
	resp.Sessions = GetAllSessions(ctx.Tx)
	return
}

type SessionStats struct {
	TotalVisits        int
	TotalSessions      int
	HumanSessions      int
	BotSessions        int
	MobileSessions     int
	DesktopSessions    int
	AveragePageViews   float64
	TodayVisits        int
	TodaySessions      int
	TopPlatforms       []PlatformCount
	TopBrowsers        []BrowserCount
}

type PlatformCount struct {
	Platform string
	Count    int
}

type BrowserCount struct {
	Browser string
	Count   int
}

type SessionStatsResponse struct {
	Stats SessionStats
}

func GetSessionStats(ctx *vbeam.Context, req vbeam.Empty) (resp SessionStatsResponse, err error) {
	visits := GetAllVisits(ctx.Tx)
	sessions := GetAllSessions(ctx.Tx)

	resp.Stats.TotalVisits = len(visits)
	resp.Stats.TotalSessions = len(sessions)

	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location())

	platformCounts := make(map[string]int)
	browserCounts := make(map[string]int)

	totalPageViews := 0
	for _, session := range sessions {
		totalPageViews += session.RequestCount

		if session.IsBot {
			resp.Stats.BotSessions++
		} else {
			resp.Stats.HumanSessions++
		}

		if session.IsMobile {
			resp.Stats.MobileSessions++
		} else {
			resp.Stats.DesktopSessions++
		}

		if session.StartTime.After(today) {
			resp.Stats.TodaySessions++
		}

		platformCounts[session.Platform]++
		browserCounts[session.Browser]++
	}

	for _, visit := range visits {
		if visit.Timestamp.After(today) {
			resp.Stats.TodayVisits++
		}
	}

	if len(sessions) > 0 {
		resp.Stats.AveragePageViews = float64(totalPageViews) / float64(len(sessions))
	}

	for platform, count := range platformCounts {
		resp.Stats.TopPlatforms = append(resp.Stats.TopPlatforms, PlatformCount{
			Platform: platform,
			Count:    count,
		})
	}

	for browser, count := range browserCounts {
		resp.Stats.TopBrowsers = append(resp.Stats.TopBrowsers, BrowserCount{
			Browser: browser,
			Count:   count,
		})
	}

	return
}

type PageCount struct {
	Path  string
	Count int
}

type TopPagesResponse struct {
	Pages []PageCount
}

func GetTopPages(ctx *vbeam.Context, req vbeam.Empty) (resp TopPagesResponse, err error) {
	visits := GetAllVisits(ctx.Tx)
	pageCounts := make(map[string]int)

	for _, visit := range visits {
		pageCounts[visit.Path]++
	}

	for path, count := range pageCounts {
		resp.Pages = append(resp.Pages, PageCount{
			Path:  path,
			Count: count,
		})
	}

	return
}

type ReferrerCount struct {
	Referrer string
	Count    int
}

type ReferrerStatsResponse struct {
	Referrers []ReferrerCount
}

func GetReferrerStats(ctx *vbeam.Context, req vbeam.Empty) (resp ReferrerStatsResponse, err error) {
	visits := GetAllVisits(ctx.Tx)
	referrerCounts := make(map[string]int)

	for _, visit := range visits {
		referrer := visit.Referrer
		if referrer == "" {
			referrer = "Direct"
		}
		referrerCounts[referrer]++
	}

	for referrer, count := range referrerCounts {
		resp.Referrers = append(resp.Referrers, ReferrerCount{
			Referrer: referrer,
			Count:    count,
		})
	}

	return
}
