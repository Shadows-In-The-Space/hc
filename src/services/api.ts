/**
 * API Service for HelpCheck Backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

export interface LeadPayload {
  email: string;
  name?: string;
  phone?: string;
  topic?: string;
  message?: string;
  source?: string;
}

export interface Lead {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  topic: string | null;
  message: string | null;
  status: string;
  source: string;
  created_at: string;
  updated_at: string;
}

/**
 * Submit a lead to the backend
 */
export async function submitLead(lead: LeadPayload): Promise<Lead> {
  const response = await fetch(`${API_BASE_URL}/api/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error('Failed to submit lead');
  }

  return response.json();
}

/**
 * Get all leads (requires admin auth)
 */
export async function getLeads(): Promise<Lead[]> {
  const response = await fetch(`${API_BASE_URL}/api/leads`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch leads');
  }

  return response.json();
}

/**
 * Check email for breaches
 */
export async function checkEmailBreach(email: string): Promise<{
  email: string;
  breach_count: number;
  breaches: string[];
  cached: boolean;
}> {
  const response = await fetch(`${API_BASE_URL}/api/check-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to check email');
  }

  return response.json();
}
