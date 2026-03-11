import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useChat, Lead } from './ChatContext';

// --- CRM API Schnittstelle ---
export interface CRMLeadPayload {
  name: string;
  email: string;
  phone: string;
  topic: 'verkehrsrecht' | 'datenleck' | 'allgemein';
  description: string;
  source: 'chatbot' | 'website';
  timestamp: string;
}

export interface CRMAppointmentPayload {
  leadId: string;
  date: string;
  time: string;
  type: 'beratung' | 'rueckruf';
  notes?: string;
}

const API_ENDPOINTS = {
  leads: '/api/crm/leads',
  appointments: '/api/crm/appointments',
};

/**
 * Lead-Formular Komponente
 */
export const LeadForm: React.FC = () => {
  const { setCurrentStep, setLead, messages } = useChat();
  const [formData, setFormData] = useState<Partial<Lead>>({
    name: '',
    email: '',
    phone: '',
    topic: 'allgemein',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
    if (lastMessage.includes('verkehr') || lastMessage.includes('bußgeld')) {
      setFormData(prev => ({ ...prev, topic: 'verkehrsrecht' }));
    } else if (lastMessage.includes('datenleck') || lastMessage.includes('dsgvo')) {
      setFormData(prev => ({ ...prev, topic: 'datenleck' }));
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name?.trim()) {
      setError('Bitte geben Sie Ihren Namen ein.');
      return;
    }
    if (!formData.email?.trim() && !formData.phone?.trim()) {
      setError('Bitte geben Sie mindestens eine Kontaktmöglichkeit ein.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: CRMLeadPayload = {
        name: formData.name!,
        email: formData.email || '',
        phone: formData.phone || '',
        topic: formData.topic as Lead['topic'],
        description: formData.description || '',
        source: 'chatbot',
        timestamp: new Date().toISOString()
      };

      // TODO: Später mit echtem Backend verbinden
      await new Promise(resolve => setTimeout(resolve, 1000));

      setLead(formData as Lead);
      setCurrentStep('appointment');
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-teal-400" />
        Kostenlose Erstberatung sichern
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Ihr Name *"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/20 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="px-4 py-3 bg-white/20 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="tel"
            placeholder="Telefon"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="px-4 py-3 bg-white/20 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <select
            value={formData.topic}
            onChange={e => setFormData({ ...formData, topic: e.target.value as Lead['topic'] })}
            className="w-full px-4 py-3 bg-white/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400 [&>option]:text-gray-900"
          >
            <option value="allgemein" className="text-gray-900">Anliegen auswählen...</option>
            <option value="verkehrsrecht" className="text-gray-900">Verkehrsrecht</option>
            <option value="datenleck" className="text-gray-900">Datenleck / DSGVO</option>
          </select>
        </div>

        <div>
          <textarea
            placeholder="Kurze Beschreibung Ihres Anliegens..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 bg-white/20 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-300 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-teal-400 text-blue-900 font-bold rounded-xl hover:bg-teal-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Kostenlose Beratung anfordern
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[10px] text-white/40 text-center">
          Ihre Daten werden vertraulich behandelt.
        </p>
      </form>
    </div>
  );
};

/**
 * Terminbuchungs-Komponente
 */
export const AppointmentBooking: React.FC = () => {
  const { setCurrentStep, lead } = useChat();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })
        });
      }
    }
    return dates;
  }, []);

  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) return;
    setIsSubmitting(true);

    try {
      const payload: CRMAppointmentPayload = {
        leadId: lead?.email || 'unknown',
        date: selectedDate,
        time: selectedTime,
        type: 'beratung',
        notes: lead?.description
      };

      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsBooked(true);
      setCurrentStep('done');
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBooked) {
    return (
      <div className="p-6 bg-teal-400/20 backdrop-blur-sm rounded-2xl text-center">
        <CheckCircle className="w-12 h-12 text-teal-400 mx-auto mb-3" />
        <h3 className="text-white font-bold text-lg mb-2">Termin bestätigt!</h3>
        <p className="text-white/80 text-sm">Wir freuen uns auf Sie am {selectedDate} um {selectedTime}.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-teal-400" />
        Termin vereinbaren
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-white/70 text-xs font-medium mb-2 block">Datum</label>
          <div className="grid grid-cols-2 gap-2">
            {availableDates.slice(0, 4).map(date => (
              <button
                key={date.value}
                onClick={() => setSelectedDate(date.value)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedDate === date.value ? 'bg-teal-400 text-blue-900' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {date.label}
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div>
            <label className="text-white/70 text-xs font-medium mb-2 block">Uhrzeit</label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.slice(0, 6).map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTime === time ? 'bg-teal-400 text-blue-900' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleBook}
          disabled={!selectedDate || !selectedTime || isSubmitting}
          className="w-full py-3 bg-teal-400 text-blue-900 font-bold rounded-xl hover:bg-teal-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="w-5 h-5 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Termin bestätigen
              <CheckCircle className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LeadForm;
