import * as preact from "preact";

export const TurnTakerCaseStudy = () => (
  <div class="case-study">
    <p class="section-body">
      Custom embedded device (PCB + firmware + enclosure) built to manage turn-taking between
      children using a simple interactive interface.
    </p>

    <h3>Overview</h3>
    <p>
      I designed and built a small standalone device to help manage turn-taking between my children
      (e.g., who gets to sit in the front seat). The device provides a simple interface with buttons
      and a display, allowing turns to be tracked and deferred over time.
    </p>
    <p>The project spans hardware, firmware, and physical design:</p>
    <ul>
      <li>Custom PCB design (KiCad)</li>
      <li>Embedded firmware (Raspberry Pi Pico)</li>
      <li>Battery-powered operation</li>
      <li>3D-printed enclosure</li>
    </ul>

    <h3>Problem &amp; Constraints</h3>
    <p>The goal was to create a simple, physical system that:</p>
    <ul>
      <li>Clearly indicates whose turn it is</li>
      <li>Allows deferring a turn (with future compensation)</li>
      <li>Persists state across power cycles</li>
      <li>Runs on battery power</li>
      <li>Is small, durable, and easy for kids to use</li>
    </ul>
    <p>Constraints:</p>
    <ul>
      <li>Only a few buttons and a small display</li>
      <li>Battery-operated, so power usage matters</li>
      <li>Turns must be retained across resets</li>
      <li>Predictable, deterministic behavior</li>
    </ul>

    <h3>System Design</h3>
    <p>The device is built around a microcontroller-based architecture:</p>
    <ul>
      <li>Microcontroller: Raspberry Pi Pico</li>
      <li>Display: small monochrome display (128×64 class)</li>
      <li>Input: physical buttons</li>
      <li>Power: rechargeable battery via external charging</li>
    </ul>
    <p>The firmware manages:</p>
    <ul>
      <li>Turn tracking and state transitions</li>
      <li>Deferral logic (allowing a child to skip and save a turn)</li>
      <li>UI rendering and animations on the display</li>
      <li>Persistent storage of device state</li>
    </ul>
    <p>
      State is stored locally on the microcontroller to ensure behavior is consistent even after
      power loss.
    </p>

    <h3>Hardware Design</h3>
    <p>The PCB was designed in KiCad and includes:</p>
    <ul>
      <li>Microcontroller footprint and supporting circuitry</li>
      <li>Button inputs</li>
      <li>Display connector</li>
      <li>Power input via JST connector</li>
    </ul>
    <p>Design considerations included:</p>
    <ul>
      <li>Footprint selection and validation before fabrication</li>
      <li>Routing simplicity for a small form factor</li>
      <li>Integration with off-the-shelf components (display, battery, switches)</li>
    </ul>
    <p>The board was fabricated from generated Gerber files and assembled manually.</p>

    <h3>Firmware &amp; UI</h3>
    <p>The firmware implements a simple state machine:</p>
    <ul>
      <li>Tracks whose turn it is</li>
      <li>Updates state on button presses</li>
      <li>Applies deferral rules</li>
      <li>Renders the current state to the display</li>
    </ul>
    <p>The UI is intentionally minimal, but with some flair:</p>
    <ul>
      <li>Clear indication of current turn</li>
      <li>Basic animations to reinforce state changes</li>
      <li>Button-based interaction only</li>
    </ul>
    <p>This keeps the device intuitive for children while avoiding unnecessary complexity.</p>

    <h3>Mechanical Design</h3>
    <p>The enclosure was designed in CAD (FreeCAD) and 3D printed:</p>
    <ul>
      <li>Sized to fit the PCB, display, and battery</li>
      <li>Designed for durability and ease of handling</li>
      <li>Iterative adjustments for fit and tolerances</li>
    </ul>
    <p>
      This required coordinating physical dimensions across PCB layout, components, and enclosure
      design.
    </p>

    <h3>Lessons &amp; Tradeoffs</h3>
    <ul>
      <li>Hardware projects require careful alignment between PCB design, component selection, and enclosure dimensions</li>
      <li>Simple user interfaces are harder than they appear — small design decisions significantly affect usability</li>
      <li>Battery-powered systems introduce additional constraints around power management and charging</li>
      <li>Iteration cycles are slower than software, so upfront design decisions carry more weight</li>
    </ul>

    <h3>Outcome</h3>
    <p>
      The project resulted in a functional, battery-powered device that manages turn-taking with a
      simple physical interface.
    </p>
    <p>It demonstrates:</p>
    <ul>
      <li>End-to-end hardware, firmware, and mechanical design</li>
      <li>Embedded systems programming with persistent state</li>
      <li>PCB design and fabrication workflow</li>
      <li>Practical UI design under strict constraints</li>
    </ul>

    <h3>Code &amp; Design Files</h3>
    <p>
      <a href="https://github.com/sggrissom/turn-taker" target="_blank" rel="noopener noreferrer">
        GitHub: sggrissom/turn-taker
      </a>
    </p>
  </div>
);
