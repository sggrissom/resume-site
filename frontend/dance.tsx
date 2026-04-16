import * as preact from "preact";

export const DanceCaseStudy = () => (
  <div class="case-study">
    <p class="section-body">
      Low-cost multi-room streaming system designed for dance studios using Go, SRS, and FFmpeg.
    </p>

    <h3>Overview</h3>
    <p>
      I built a prototype streaming platform to allow dance studios to broadcast classes to parents,
      both for in-studio displays and remote viewing. The system supports multiple rooms per studio
      and integrates access control, stream lifecycle management, and real-time status updates.
    </p>
    <p>
      Rather than relying on managed streaming services, I focused on a self-hosted approach using a
      VPS to control cost and simplify deployment.
    </p>

    <h3>Problem &amp; Constraints</h3>
    <p>Dance studios often want to provide live video access to classes:</p>
    <ul>
      <li>Parents viewing remotely</li>
      <li>Internal displays inside the studio</li>
      <li>Multiple concurrent rooms</li>
    </ul>
    <p>Existing solutions tend to be expensive or poorly suited for low-concurrency, multi-room setups.</p>
    <p>The system was designed around:</p>
    <ul>
      <li>Cost sensitivity — avoid per-viewer pricing; prefer fixed-cost infrastructure</li>
      <li>Typical usage — 5–10 viewers per room, occasional event spikes</li>
      <li>Multi-room support — 3–5 concurrent streams per studio</li>
      <li>Bandwidth control — avoid always-on upstream streaming</li>
      <li>Simple deployment — run on a single VPS</li>
    </ul>

    <h3>System Design</h3>
    <p>The system uses an RTMP → HLS pipeline built around SRS and FFmpeg:</p>
    <pre>{`RTSP Camera / iPhone (Larix)
        ↓
      FFmpeg
        ↓ (RTMP)
      SRS
        ↓ (HLS)
   Go Web Server
        ↓
   Browser (hls.js)`}</pre>
    <p>
      Video is ingested from RTSP cameras or mobile devices, optionally transcoded via FFmpeg, and
      pushed to SRS over RTMP. SRS generates HLS streams, which are served to clients through a Go
      web server and played using hls.js.
    </p>
    <p>
      HLS was chosen over lower-latency protocols (e.g., WebRTC) to prioritize reliability and
      compatibility. Latency is higher, but acceptable for passive viewing.
    </p>
    <p>
      The system is designed to run on a VPS rather than managed streaming services. This keeps costs
      predictable and low for typical usage, while leaving room for CDN-based scaling if needed.
    </p>
    <p>
      To reduce complexity, the initial implementation uses a single bitrate stream. Adaptive bitrate
      streaming is a natural extension but was deferred.
    </p>
    <p>
      For RTSP cameras, ingest is handled on demand using FFmpeg. Streams are started and stopped
      through the application rather than running continuously, reducing unnecessary bandwidth usage.
    </p>

    <h3>Application &amp; Backend Design</h3>
    <p>Beyond the media pipeline, the system includes a full backend application layer:</p>
    <ul>
      <li>Studio-based multi-tenant model with rooms and memberships</li>
      <li>Role-based access control (admin vs viewer)</li>
      <li>Per-room stream keys with regeneration</li>
      <li>Class and schedule-aware access control</li>
      <li>Real-time stream status updates via SSE</li>
    </ul>
    <p>The Go service also handles operational concerns:</p>
    <ul>
      <li>Background jobs for cleanup and analytics resets</li>
      <li>Rotating logs and environment-based configuration</li>
      <li>Health check endpoint (<code>/healthz</code>) for deployment validation</li>
      <li>Reset of transient viewer/streaming state on startup for safe recovery</li>
    </ul>

    <h3>Stream Lifecycle Integration</h3>
    <p>
      A key part of the design is integrating stream lifecycle events directly into the application.
    </p>
    <p>
      SRS is configured to call back into the Go service when streams start and stop. This allows the
      application to:
    </p>
    <ul>
      <li>Validate stream keys at publish time</li>
      <li>Track which rooms are live</li>
      <li>Update clients in real time via SSE</li>
    </ul>
    <p>
      This keeps stream state consistent between the media layer and the application layer without
      polling or external coordination.
    </p>

    <h3>Implementation Highlights</h3>
    <ul>
      <li>RTSP → FFmpeg → RTMP → HLS pipeline using SRS</li>
      <li>On-demand ingest control for RTSP cameras</li>
      <li>SSE-based real-time stream status updates</li>
      <li>Multi-room support with per-room access control</li>
      <li>Backend-driven stream lifecycle via SRS hooks</li>
      <li>HLS output served per room (<code>/hls/&lt;roomId&gt;/stream.m3u8</code>)</li>
    </ul>

    <h3>Lessons &amp; Tradeoffs</h3>
    <ul>
      <li>A VPS-based approach keeps costs low and predictable, but would require CDN integration or horizontal scaling for large events</li>
      <li>FFmpeg provides flexibility but introduces operational complexity, especially with inconsistent RTSP sources</li>
      <li>HLS is reliable and simple to integrate, but comes with higher latency than real-time protocols</li>
      <li>Integrating stream lifecycle via hooks simplified state management compared to polling-based approaches</li>
    </ul>

    <h3>Outcome</h3>
    <p>
      The system demonstrated a working end-to-end streaming platform from camera to browser,
      including multi-room support, access control, and real-time updates.
    </p>
    <p>
      It validated that a VPS-based architecture could support typical studio usage at significantly
      lower cost than managed solutions, while maintaining acceptable reliability.
    </p>
    <p>
      The project remained a prototype and was not fully productized due to external adoption decisions,
      but it established a solid foundation and clarified the tradeoffs involved in scaling.
    </p>

    <h3>Code</h3>
    <p>
      <a href="https://github.com/sggrissom/StreamSite" target="_blank" rel="noopener noreferrer">
        GitHub: sggrissom/StreamSite
      </a>
    </p>
  </div>
);
