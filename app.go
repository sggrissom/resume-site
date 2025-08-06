package resume

import (
	"resume/backend"
	"resume/cfg"

	"go.hasen.dev/vbeam"
	"go.hasen.dev/vbolt"

	"net"
	"net/http"
	"strings"
)

var Info vbolt.Info

func OpenDB(dbpath string) *vbolt.DB {
	dbConnection := vbolt.Open(dbpath)
	vbolt.InitBuckets(dbConnection, &cfg.Info)
	return dbConnection
}

func MakeApplication() *vbeam.Application {
	vbeam.RunBackServer(cfg.Backport)
	db := OpenDB(cfg.DBPath)
	var app = vbeam.NewApplication("ResumeSite", db)
	backend.RegisterResumeRoutes(app)
	backend.RegisterVisitRoutes(app)
	return app
}

func LogRequestsMiddleware(app *vbeam.Application) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ip := realIP(r)
		ua := r.UserAgent()
		ref := r.Referer()
		path := r.URL.Path

		if path != "/visits" && path != "/favicon.ico" && !strings.HasPrefix(path, "/static") {
			go logRequestToDB(app.DB, ip, ua, ref, path) // do this async so it doesn't block
		}

		app.ServeHTTP(w, r)
	})
}

func logRequestToDB(db *vbolt.DB, ip, userAgent, referrer, path string) {
	vbolt.WithWriteTx(db, func(tx *vbolt.Tx) {
		backend.AddVisitTx(tx, ip, userAgent, referrer, path)
		vbolt.TxCommit(tx)
	})
}

func realIP(r *http.Request) string {
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		parts := strings.Split(xff, ",")
		return strings.TrimSpace(parts[0])
	}

	if xrip := r.Header.Get("X-Real-IP"); xrip != "" {
		return xrip
	}

	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}
