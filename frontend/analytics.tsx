import * as preact from "preact";
import * as server from "@app/server";
import * as rpc from "vlens/rpc";

export async function fetch(route: string, prefix: string) {
  const [statsResp, topPagesResp, referrersResp] = await Promise.all([
    server.GetSessionStats({}),
    server.GetTopPages({}),
    server.GetReferrerStats({})
  ]);

  // Handle each response as [data | null, error] tuple
  const [statsData, statsError] = statsResp;
  if (statsError || !statsData) return rpc.err(statsError || "No stats data");

  const [topPagesData, topPagesError] = topPagesResp;
  if (topPagesError || !topPagesData) return rpc.err(topPagesError || "No pages data");

  const [referrersData, referrersError] = referrersResp;
  if (referrersError || !referrersData) return rpc.err(referrersError || "No referrers data");

  return rpc.ok({
    stats: statsData.Stats,
    topPages: topPagesData.Pages,
    referrers: referrersData.Referrers
  });
}

interface AnalyticsData {
  stats: server.SessionStats;
  topPages: server.PageCount[];
  referrers: server.ReferrerCount[];
}

export function view(
  route: string,
  prefix: string,
  data: AnalyticsData,
): preact.ComponentChild {
  const { stats, topPages, referrers } = data;

  // Sort data for display
  const sortedPages = topPages
    .slice()
    .sort((a, b) => b.Count - a.Count)
    .slice(0, 10);

  const sortedReferrers = referrers
    .slice()
    .sort((a, b) => b.Count - a.Count)
    .slice(0, 10);

  const sortedPlatforms = stats.TopPlatforms
    ?.slice()
    .sort((a, b) => b.Count - a.Count) || [];

  const sortedBrowsers = stats.TopBrowsers
    ?.slice()
    .sort((a, b) => b.Count - a.Count) || [];

  return (
    <div className="analytics-dashboard">
      <h2>Analytics Dashboard</h2>

      {/* Overview Stats */}
      <div className="stats-grid">
        <StatCard
          title="Total Visits"
          value={stats.TotalVisits}
          subtitle="All time"
        />
        <StatCard
          title="Total Sessions"
          value={stats.TotalSessions}
          subtitle="All time"
        />
        <StatCard
          title="Today's Visits"
          value={stats.TodayVisits}
          subtitle="Today"
        />
        <StatCard
          title="Today's Sessions"
          value={stats.TodaySessions}
          subtitle="Today"
        />
        <StatCard
          title="Human Sessions"
          value={stats.HumanSessions}
          subtitle={`${Math.round((stats.HumanSessions / Math.max(stats.TotalSessions, 1)) * 100)}% of total`}
        />
        <StatCard
          title="Mobile Sessions"
          value={stats.MobileSessions}
          subtitle={`${Math.round((stats.MobileSessions / Math.max(stats.TotalSessions, 1)) * 100)}% of total`}
        />
        <StatCard
          title="Avg Page Views"
          value={stats.AveragePageViews?.toFixed(1) || "0"}
          subtitle="Per session"
        />
        <StatCard
          title="Bot Sessions"
          value={stats.BotSessions}
          subtitle={`${Math.round((stats.BotSessions / Math.max(stats.TotalSessions, 1)) * 100)}% of total`}
        />
      </div>

      <div className="analytics-grid">
        {/* Top Pages */}
        <div className="analytics-card">
          <h3>Top Pages</h3>
          <div className="chart-container">
            {sortedPages.length > 0 ? (
              <div className="bar-chart">
                {sortedPages.map((page, index) => (
                  <div key={index} className="bar-item">
                    <div className="bar-label" title={page.Path}>
                      {page.Path === "/" ? "Home" : page.Path}
                    </div>
                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{
                          width: `${(page.Count / sortedPages[0].Count) * 100}%`
                        }}
                      />
                    </div>
                    <div className="bar-value">{page.Count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data">No page data available</div>
            )}
          </div>
        </div>

        {/* Top Referrers */}
        <div className="analytics-card">
          <h3>Traffic Sources</h3>
          <div className="chart-container">
            {sortedReferrers.length > 0 ? (
              <div className="bar-chart">
                {sortedReferrers.map((referrer, index) => (
                  <div key={index} className="bar-item">
                    <div className="bar-label" title={referrer.Referrer}>
                      {referrer.Referrer === "Direct" ? "Direct" :
                       referrer.Referrer.length > 20 ?
                       referrer.Referrer.substring(0, 20) + "..." :
                       referrer.Referrer}
                    </div>
                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{
                          width: `${(referrer.Count / sortedReferrers[0].Count) * 100}%`
                        }}
                      />
                    </div>
                    <div className="bar-value">{referrer.Count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data">No referrer data available</div>
            )}
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="analytics-card">
          <h3>Platforms</h3>
          <div className="chart-container">
            {sortedPlatforms.length > 0 ? (
              <div className="bar-chart">
                {sortedPlatforms.map((platform, index) => (
                  <div key={index} className="bar-item">
                    <div className="bar-label">{platform.Platform}</div>
                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{
                          width: `${(platform.Count / sortedPlatforms[0].Count) * 100}%`
                        }}
                      />
                    </div>
                    <div className="bar-value">{platform.Count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data">No platform data available</div>
            )}
          </div>
        </div>

        {/* Browser Distribution */}
        <div className="analytics-card">
          <h3>Browsers</h3>
          <div className="chart-container">
            {sortedBrowsers.length > 0 ? (
              <div className="bar-chart">
                {sortedBrowsers.map((browser, index) => (
                  <div key={index} className="bar-item">
                    <div className="bar-label">{browser.Browser}</div>
                    <div className="bar-container">
                      <div
                        className="bar"
                        style={{
                          width: `${(browser.Count / sortedBrowsers[0].Count) * 100}%`
                        }}
                      />
                    </div>
                    <div className="bar-value">{browser.Count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data">No browser data available</div>
            )}
          </div>
        </div>
      </div>

      <div className="analytics-actions">
        <a href="/sessions" className="btn">View Sessions</a>
        <a href="/visits" className="btn">View Visits</a>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
}

function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-title">{title}</div>
      <div className="stat-subtitle">{subtitle}</div>
    </div>
  );
}