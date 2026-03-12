import type {
  IntakeAnswers,
  ModuleId,
  ProcessStep,
  UserStorySelection,
} from '../types'

export const moduleLabels: Record<ModuleId, string> = {
  intake: 'Module 1: Intake',
  processMap: 'Module 2: Process Map',
  actionItems: 'Action Items',
  userStories: 'Module 3: User Stories',
  results: 'Clinician Dashboard',
}

export const hrEmail = {
  sender: 'Sarah Jenkins',
  title: 'Requirements for the new Vacation Booking System',
  body: [
    'Hi team,',
    'We urgently need to replace our current vacation booking system. It is causing too many headaches for both staff and management.',
    'Currently, we are facing three major problems:',
    '1. Employees have to manually type their employee ID and department into every request form.',
    '2. Managers are losing approval requests because they just get buried in their regular email inboxes.',
    '3. Employees have no way of knowing how many Paid Time Off (PTO) days they have left without calling HR.',
    'For the new system, we absolutely must have these three features:',
    '1. An automated tracker that instantly shows employees their remaining PTO balance on the home screen.',
    '2. A centralized "Approval Dashboard" for managers, so they do not have to rely on emails.',
    '3. Mobile access, so employees can submit requests from their phones.',
    'Please map out the new process and draft the initial user stories based on this.',
    'Thanks,',
    'Sarah',
  ],
}

export const intakeQuestions = [
  {
    key: 'autoFill',
    label: 'Which current pain point should the new system remove from the request form?',
    options: [
      { value: '', label: 'Select an answer' },
      { value: 'manual-entry', label: 'Employees manually typing their ID and department' },
      { value: 'spreadsheet-export', label: 'Managers exporting requests into spreadsheets' },
      { value: 'slow-login', label: 'Employees waiting too long to sign in' },
    ],
  },
  {
    key: 'dashboard',
    label: 'What workflow change does management need most urgently?',
    options: [
      { value: '', label: 'Select an answer' },
      { value: 'central-dashboard', label: 'A central approval dashboard for managers' },
      { value: 'email-digest', label: 'A daily approval digest email' },
      { value: 'hr-routing', label: 'All requests routed back to HR first' },
    ],
  },
  {
    key: 'ptoBalance',
    label: 'What employee-facing feature must appear on the home screen?',
    options: [
      { value: '', label: 'Select an answer' },
      { value: 'instant-pto', label: 'An instant remaining PTO balance tracker' },
      { value: 'payroll-summary', label: 'A payroll summary widget' },
      { value: 'meeting-agenda', label: 'A list of weekly meetings' },
    ],
  },
  {
    key: 'mobile',
    label: 'What access requirement is explicitly requested?',
    options: [
      { value: '', label: 'Select an answer' },
      { value: 'mobile-access', label: 'Mobile access from employees’ phones' },
      { value: 'vpn-only', label: 'A VPN-only desktop portal' },
      { value: 'shared-kiosk', label: 'A shared kiosk near reception' },
    ],
  },
] satisfies Array<{
  key: keyof IntakeAnswers
  label: string
  options: Array<{ value: string; label: string }>
}>

export const correctIntakeAnswers: IntakeAnswers = {
  autoFill: 'manual-entry',
  dashboard: 'central-dashboard',
  ptoBalance: 'instant-pto',
  mobile: 'mobile-access',
}

export const correctProcessSteps: ProcessStep[] = [
  { id: 'step-1', label: 'Employee logs into the Vacation Booking Portal.' },
  { id: 'step-2', label: 'Employee selects desired vacation dates and submits the request.' },
  { id: 'step-3', label: 'System verifies the employee has enough PTO balance.' },
  { id: 'step-4', label: 'System routes the request to the employee’s direct manager.' },
  { id: 'step-5', label: 'Manager reviews the pending request on their Approval Dashboard.' },
  { id: 'step-6', label: 'Manager clicks "Approve" or "Deny".' },
  { id: 'step-7', label: 'System sends an automated status notification to the employee.' },
  { id: 'step-8', label: 'System updates the employee’s remaining PTO balance.' },
]

export const roleOptions = ['Employee', 'Manager', 'HR Director', 'System Administrator']

export const actionOptions = [
  'view my PTO balance on the home screen',
  'approve requests from a central dashboard',
  'manually type in my employee ID',
  'export data to a spreadsheet',
]

export const benefitOptions = [
  "I don't lose requests in my email inbox",
  "I don't have to call HR to find out how many days I have left",
  'I can bypass my manager’s approval',
  'the database runs faster',
]

export const defaultUserStories: [UserStorySelection, UserStorySelection] = [
  { role: '', action: '', benefit: '' },
  { role: '', action: '', benefit: '' },
]

export const correctUserStories: [UserStorySelection, UserStorySelection] = [
  {
    role: 'Employee',
    action: 'view my PTO balance on the home screen',
    benefit: "I don't have to call HR to find out how many days I have left",
  },
  {
    role: 'Manager',
    action: 'approve requests from a central dashboard',
    benefit: "I don't lose requests in my email inbox",
  },
]

export const interruptionPrompt = {
  sender: 'Dev_Alex',
  message:
    'Hey, sorry to interrupt. Quick question on the Payroll project we talked about yesterday. Are we still using the standard 40-hour work week for the baseline calculations, or did we officially change that to 37.5?',
  responses: [
    'Yes, we are still using 40 hours.',
    'No, it officially changed to 37.5.',
    "I'm working on something else right now, let me check my notes and get back to you.",
  ],
}
