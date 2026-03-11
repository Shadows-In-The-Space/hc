// Chatbot Components
export { ChatProvider, useChat } from './ChatContext';
export type { ChatState, Message, Lead } from './ChatContext';

export { ChatInterface } from './ChatInterface';
export { FloatingWidget } from './FloatingWidget';
export { LeadForm, AppointmentBooking } from './LeadForm';
export type { CRMLeadPayload, CRMAppointmentPayload } from './LeadForm';

export { checkEmailBreach, formatBreachResultForChat, isValidEmail } from './dataLeakService';
export type { DataLeakResult, BreachInfo } from './dataLeakService';
