# App Content & Data Assets: Vacation Booking System Project

## Module 1: Source Material (The HR Email)
**Sender:** Sarah Jenkins (Director of HR)
**Subject:** Requirements for the new Vacation Booking System
**Message:**
Hi team, 
We urgently need to replace our current vacation booking system. It is causing too many headaches for both staff and management. 

Currently, we are facing three major problems:
1. Employees have to manually type their employee ID and department into every request form.
2. Managers are losing approval requests because they just get buried in their regular email inboxes.
3. Employees have no way of knowing how many Paid Time Off (PTO) days they have left without calling HR.

For the new system, we absolutely must have these three features:
1. An automated tracker that instantly shows employees their remaining PTO balance on the home screen.
2. A centralized "Approval Dashboard" for managers, so they don't have to rely on emails.
3. Mobile access, so employees can submit requests from their phones.

Please map out the new process and draft the initial user stories based on this.

Thanks, 
Sarah

---

## Module 2: The Process Map (Jumbled Steps)
*Instructions for Codex: Present these 8 steps to the user in a randomized, jumbled order. The array below represents the **correct chronological order** for scoring purposes.*

1. Employee logs into the Vacation Booking Portal.
2. Employee selects desired vacation dates and submits the request.
3. System verifies the employee has enough PTO balance.
4. System routes the request to the employee's direct manager.
5. Manager reviews the pending request on their Approval Dashboard.
6. Manager clicks "Approve" or "Deny".
7. System sends an automated status notification to the employee.
8. System updates the employee's remaining PTO balance.

---

## Module 3: User Stories (Drop-Down Variables)
*Instructions for Codex: Build a sentence structure that reads: "As a [Role], I want to [Action] so that [Benefit]." Provide the following drop-down options for the user to select. The bolded combinations are the correct answers based on the Module 1 email.*

**[Role] Options:**
- **Employee**
- **Manager**
- HR Director
- System Administrator

**[Action] Options:**
- **view my PTO balance on the home screen**
- **approve requests from a central dashboard**
- manually type in my employee ID
- export data to a spreadsheet

**[Benefit] Options:**
- **I don't lose requests in my email inbox**
- **I don't have to call HR to find out how many days I have left**
- I can bypass my manager's approval
- the database runs faster

*(Correct Story 1: Employee + view my PTO balance + I don't have to call HR)*
*(Correct Story 2: Manager + approve requests + I don't lose requests)*

---

## Module 4: The Interruption (Chat Pop-Up)
**Sender Name:** Dev_Alex
**Timestamp:** [Current Time]
**Message:** "Hey, sorry to interrupt. Quick question on the Payroll project we talked about yesterday. Are we still using the standard 40-hour work week for the baseline calculations, or did we officially change that to 37.5?"

**Multiple Choice Responses (User must click one to close the chat):**
A) "Yes, we are still using 40 hours."
B) "No, it officially changed to 37.5."
C) "I'm working on something else right now, let me check my notes and get back to you." *(Note: This is the safest/best BA response, but any click should close the modal and stop the interruption timer).*