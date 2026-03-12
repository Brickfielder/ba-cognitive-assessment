# Project Specifications: Business Analyst Cognitive Assessment Web-App

## 1. Background & Clinical Context
**Patient Profile:** A patient recovering from a brain injury, previously employed as a Business Analyst (BA). 
**Cognitive Deficits:** - Poor verbal encoding and retention over time.
- Reduced processing speed.
- Potential neurological apathy (difficulty with self-initiation).
**Objective:** Create an ecologically valid, interactive web-application to assess the patient's readiness to return to work. The app simulates a contained BA project ("Upgrading an internal vacation-booking system") to measure executive functioning, memory, initiation, and task-switching.

## 2. Technical Architecture & Deployment
- **Platform:** Front-end only (HTML, CSS, JavaScript / React).
- **Deployment:** GitHub Pages (Static hosting).
- **Data Storage:** STRICTLY LOCAL. No backend database (to ensure patient data privacy compliance). 
- **State Management:** App must track metrics in browser memory during the session and output a final "Results Dashboard" UI at the end. Data clears upon page refresh/close.

## 3. Telemetry & Metrics to Track (Background Processes)
The app must globally listen for and track the following events:
- **Time on Task:** Duration spent on each specific module/screen.
- **Idle Time:** Track periods of 30+ seconds with no mouse movement, scrolling, or clicks (measures apathy/cognitive stalling).
- **Reference Clicks:** Count how many times the user clicks the "Source Material" button (measures working memory/encoding deficits).
- **Task Switching Recovery:** Time taken to close an interruption (Module 4) and resume interaction with the primary task.
- **Accuracy Scores:** Points awarded for correct sequencing and correct data extraction.

## 4. App Structure & Modules

### Module 1: The Intake (Information Extraction)
- **UI:** Displays a simulated email from an "HR Director" detailing current system flaws and future requirements. 
- **Action:** User reads the email, clicks "Next", and is presented with a "Requirement Gathering Form" (text inputs or multiple choice).
- **Feature:** Include a "Refer back to email" button. Every click must increment the `Reference Clicks` counter.

### Module 2: The Process Map (Sequencing & Logic)
- **UI:** A drag-and-drop interface containing 8-10 jumbled business process steps (e.g., "Employee requests PTO", "Manager approves").
- **Action:** User must drag the steps into the correct chronological order.
- **Tracking:** Measure total time to completion and final sequence accuracy.

### Module 3: Writing User Stories (Initiation & Translation)
- **Trigger:** Transitioning from Module 2 to Module 3 must *lack* explicit prompting. The UI should display a generic "Action Items" dashboard to see if the user auto-initiates the next logical task.
- **UI:** A drop-down sentence builder to create Agile User Stories (Format: *As a [User], I want to [Action] so that [Benefit]*).
- **Action:** User builds two user stories based on the original Module 1 email.

### Module 4: The Interruption (Task Switching)
- **Trigger:** Programmed to fire randomly while the user is actively engaging with Module 2 or Module 3.
- **UI:** A modal/pop-up mimicking a "Teams/Slack chat notification" from a developer asking a simple, unrelated question.
- **Action:** User must select a multiple-choice reply, close the chat, and return to their work.
- **Tracking:** Measure time from pop-up appearance to user response, and time from pop-up closure to the next interaction on the main task.

## 5. Final Output: The Clinician Dashboard
- **Trigger:** Upon completing Module 3.
- **UI:** A hidden or clean final screen displaying all collected metrics clearly.
- **Data Displayed:**
  - Total Session Time.
  - Time per Module.
  - Total Idle Time instances (>30s).
  - Number of "Refer back to email" clicks.
  - Accuracy scores for Modules 1, 2, and 3.
  - Interruption recovery time (Module 4).