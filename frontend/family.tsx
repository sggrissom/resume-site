import * as preact from "preact";

export const FamilyCaseStudy = () => (
  <div class="case-study">
    <p class="section-body">
      Full-stack system for managing family data (photos, measurements, milestones) with a
      local-first iOS client and Go backend.
    </p>

    <h3>Overview</h3>
    <p>
      I built a personal "family portal" to track and organize long-term family data, including
      photos, growth measurements, and milestone-style entries (similar to a digital baby book).
      The system is designed to support structured data over time, with the ability to compare
      across children at the same age.
    </p>
    <p>The project includes:</p>
    <ul>
      <li>A Go backend with a Preact web frontend</li>
      <li>A native iOS app with local-first data storage and sync</li>
      <li>Background processing for media and metadata</li>
    </ul>
    <p>
      Although primarily used for my own family, the system is designed with multi-user support
      and could be extended to a broader audience.
    </p>

    <h3>Problem &amp; Constraints</h3>
    <p>I wanted a system that could:</p>
    <ul>
      <li>Store and organize photos with flexible tagging and associations</li>
      <li>Track measurements (height, weight, etc.) over time and visualize trends</li>
      <li>Record milestone-style entries in a structured but flexible way</li>
      <li>Compare different children at the same age (e.g., height at 2 years)</li>
      <li>Work well on mobile, including offline usage</li>
    </ul>
    <p>Key constraints:</p>
    <ul>
      <li>Local-first mobile UX with full offline support</li>
      <li>Incremental sync, not full dataset reloads</li>
      <li>Image resizing, storage, and metadata extraction at upload time</li>
      <li>Flexible schema for milestones and tags without rigid structure</li>
      <li>Simple Go server with minimal dependencies and low hosting cost</li>
    </ul>

    <h3>System Design</h3>
    <p>The system consists of three main components:</p>
    <ul>
      <li>Go backend (API, storage, background jobs)</li>
      <li>Web frontend (Preact)</li>
      <li>Native iOS app (local-first with sync)</li>
    </ul>

    <h4>Data Model</h4>
    <p>The backend is centered around a few core entities:</p>
    <ul>
      <li><strong>Person</strong> — represents a family member</li>
      <li><strong>Photo</strong> — associated with one or more people, includes metadata and variants</li>
      <li><strong>Measurement</strong> — time-based values (e.g., height, weight)</li>
      <li><strong>Milestone</strong> — structured or semi-structured events tied to a person</li>
    </ul>
    <p>Photos support tagging and associations, allowing flexible queries like:</p>
    <ul>
      <li>All photos of a specific child</li>
      <li>Photos at a certain age</li>
      <li>Milestone-related images</li>
    </ul>
    <p>Measurements are stored with timestamps and can be compared across individuals at equivalent ages.</p>

    <h4>Media Processing Pipeline</h4>
    <p>Image handling is done at upload time:</p>
    <ul>
      <li>Extract metadata (e.g., timestamps via EXIF when available)</li>
      <li>Generate multiple sizes (e.g., thumbnail, medium, large)</li>
      <li>Store variants for efficient serving</li>
      <li>Optionally retain the original image</li>
    </ul>
    <p>
      This allows the frontend and mobile app to request appropriately sized images without
      additional processing.
    </p>

    <h4>iOS App: Local-First Sync</h4>
    <p>The iOS app is designed around a local-first model:</p>
    <ul>
      <li>All data is stored locally on the device</li>
      <li>Users can view and edit content offline</li>
      <li>Changes are synced to the backend when connectivity is available</li>
    </ul>
    <p>Rather than relying on real-time APIs, the system uses a delta-based sync approach:</p>
    <ul>
      <li>Track changes locally</li>
      <li>Push updates to the server</li>
      <li>Pull incremental updates from the server</li>
    </ul>
    <p>
      This avoids full dataset reloads and keeps the app responsive even with larger datasets
      (e.g., many photos).
    </p>

    <h4>Background Processing</h4>
    <p>The backend includes a lightweight job system for asynchronous work:</p>
    <ul>
      <li>Image processing (resizing, metadata extraction)</li>
      <li>Cleanup tasks</li>
      <li>Data normalization</li>
    </ul>
    <p>This keeps request latency low while handling heavier processing in the background.</p>

    <h3>Application Design</h3>
    <p>The system supports:</p>
    <ul>
      <li>Multi-person data management within a family</li>
      <li>Tagging and flexible categorization of photos and milestones</li>
      <li>Graph-based visualization of measurements over time</li>
      <li>Comparison of individuals at the same age</li>
    </ul>
    <p>
      The web frontend provides administrative functionality, while the iOS app focuses on
      browsing and data entry.
    </p>

    <h3>Lessons &amp; Tradeoffs</h3>
    <ul>
      <li>A local-first model significantly improves usability on mobile, but requires careful handling of sync conflicts and data consistency</li>
      <li>Preprocessing images at upload time simplifies client logic, at the cost of increased backend complexity</li>
      <li>Flexible data models (e.g., milestones and tags) improve usability but make querying and validation more complex</li>
      <li>A custom lightweight backend (Go + file-based storage) keeps costs low and deployment simple</li>
    </ul>

    <h3>Outcome</h3>
    <p>
      The system provides a complete, usable platform for managing long-term family data,
      including media, measurements, and milestones.
    </p>
    <p>It demonstrates:</p>
    <ul>
      <li>Full-stack system design (backend, web, and mobile)</li>
      <li>Local-first application architecture with incremental sync</li>
      <li>Media processing and storage pipelines</li>
      <li>Flexible data modeling for real-world use cases</li>
    </ul>
    <p>
      While primarily used for personal purposes, the architecture supports extension to a
      multi-user product with minimal changes.
    </p>

    <h3>Code</h3>
    <p>
      <a href="https://github.com/sggrissom/Family-Portal" target="_blank" rel="noopener noreferrer">
        GitHub: sggrissom/Family-Portal
      </a>
      {" · "}
      <a href="https://github.com/sggrissom/Family-Portal-Ios" target="_blank" rel="noopener noreferrer">
        iOS App: sggrissom/Family-Portal-Ios
      </a>
    </p>
  </div>
);
