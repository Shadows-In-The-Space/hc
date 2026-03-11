interface FAQ {
  question: string;
  answer: string;
}

interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string;
  };
  sameAs: string[];
}

interface FAQSchema {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "helpcheck",
    url: "https://helpcheck.de",
    logo: "https://helpcheck.de/logo.webp",
    description: "Ihre Plattform für rechtliche Fragen. Kostenlose Prüfung von Bußgeldbescheiden und Datenlecks.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+49-30-12345678",
      contactType: "customer service",
      areaServed: "DE",
      availableLanguage: "German"
    },
    sameAs: [
      "https://facebook.com/helpcheck",
      "https://instagram.com/helpcheck",
      "https://twitter.com/helpcheck"
    ]
  };
}

export function generateFAQSchema(faqs: FAQ[]): FAQSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export default {
  generateOrganizationSchema,
  generateFAQSchema
};
