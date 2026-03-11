/**
 * Datenleck-Prüfung Service
 * Nutzt kostenlose Quellen zur Prüfung ob eine Email kompromittiert wurde
 */

export interface DataLeakResult {
  email: string;
  isBreached: boolean;
  breachCount: number;
  breaches: BreachInfo[];
  checkedAt: Date;
}

export interface BreachInfo {
  name: string;
  domain: string;
  breachDate: string;
  description: string;
  dataClasses: string[];
  isVerified: boolean;
  isFabricated: boolean;
  isSensitive: boolean;
}

/**
 * Prüft eine Email-Adresse gegen bekannte Datenlecks (Mock für MVP)
 */
export async function checkEmailBreach(email: string): Promise<DataLeakResult> {
  const normalizedEmail = email.toLowerCase().trim();
  return getMockBreachResult(normalizedEmail);
}

/**
 * Firefox Monitor Integration
 */
export function getFirefoxMonitorUrl(email: string): string {
  return `https://monitor.firefox.com/?email=${encodeURIComponent(email)}`;
}

/**
 * Validiert eine Email-Adresse
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formatiert das Ergebnis für die Anzeige im Chat
 */
export function formatBreachResultForChat(result: DataLeakResult): string {
  if (!result.isBreached) {
    return `✅ **Gute Nachricht!**

Ihre E-Mail-Adresse *${result.email}* wurde in keinem bekannten Datenleck gefunden.

Datenschutz-Tipp: Achten Sie auf sichere Passwörter und nutzen Sie wo möglich die Zwei-Faktor-Authentifizierung.`;
  }

  const breachList = result.breaches.map(b =>
    `\n• **${b.name}** (${b.breachDate})
  - Betroffene Daten: ${b.dataClasses.join(', ')}`
  ).join('');

  return `⚠️ **Achtung: Datenleck gefunden!**

Ihre E-Mail-Adresse *${result.email}* wurde in **${result.breachCount}** bekannten Datenlecks gefunden:${breachList}

**Empfehlung:**
1. Ändern Sie umgehend Ihr Passwort bei den betroffenen Diensten
2. Nutzen Sie einen Passwort-Manager
3. Aktivieren Sie Zwei-Faktor-Authentifizierung

**Ihre Rechte:** Bei einem Datenleck haben Sie möglicherweise Anspruch auf Schadensersatz.`;
}

function getMockBreachResult(email: string): DataLeakResult {
  const testEmails = ['test@test.com', 'demo@demo.com'];
  const isBreached = testEmails.includes(email);

  const mockBreaches: BreachInfo[] = isBreached ? [
    {
      name: 'LinkedIn',
      domain: 'linkedin.com',
      breachDate: '2021-04-08',
      description: 'Daten von LinkedIn-Nutzern wurden kompromittiert',
      dataClasses: ['Email addresses', 'Phone numbers', 'Job titles'],
      isVerified: true,
      isFabricated: false,
      isSensitive: false
    },
    {
      name: 'Adobe',
      domain: 'adobe.com',
      breachDate: '2013-10-04',
      description: 'Adobe Systems wurde kompromittiert',
      dataClasses: ['Email addresses', 'Passwords', 'Password hints'],
      isVerified: true,
      isFabricated: false,
      isSensitive: false
    }
  ] : [];

  return {
    email,
    isBreached,
    breachCount: mockBreaches.length,
    breaches: mockBreaches,
    checkedAt: new Date()
  };
}
