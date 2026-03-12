import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, User, Eye, EyeOff, Users, AlertCircle, CheckCircle, Clock, LogOut, ChevronDown, ChevronUp, MessageCircle, FileText, Trash2 } from 'lucide-react';
import { getLeads, Lead } from '../services/api';

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedLead, setExpandedLead] = useState<number | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchLeads(token);
    }
  }, []);

  const fetchLeads = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        fetchLeads(data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Connection error. Is the backend running?');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setLeads([]);
    setUsername('');
    setPassword('');
  };

  const handleDeleteLead = async (leadId: number) => {
    if (!confirm('Möchten Sie diesen Lead wirklich löschen?')) return;

    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setLeads(leads.filter(l => l.id !== leadId));
      }
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'qualified': return 'bg-green-100 text-green-700';
      case 'converted': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTopicIcon = (topic: string | null) => {
    switch (topic) {
      case 'verkehrsrecht': return '🚗';
      case 'datenleck': return '🔒';
      default: return '💬';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Login</h1>
              <p className="text-white/60 mt-2">HelpCheck Verwaltung</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Benutzername</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="admin"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Passwort</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Passwort eingeben"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-colors"
              >
                Anmelden
              </button>
            </form>

            <p className="text-white/40 text-xs text-center mt-6">
              Nur für autorisiertes Personal
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">HelpCheck Admin</h1>
            <p className="text-blue-200">Lead-Verwaltung</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Abmelden
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{leads.length}</p>
                <p className="text-gray-500 text-sm">Gesamte Leads</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{leads.filter(l => l.status === 'new').length}</p>
                <p className="text-gray-500 text-sm">Neu</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{leads.filter(l => l.status === 'qualified').length}</p>
                <p className="text-gray-500 text-sm">Qualifiziert</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{leads.filter(l => l.source === 'chatbot').length}</p>
                <p className="text-gray-500 text-sm">Vom Chatbot</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold">Alle Leads</h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-gray-500 mt-2">Laden...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Noch keine Leads vorhanden</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Datum</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-Mail</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thema</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quelle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chat</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(lead.created_at).toLocaleDateString('de-DE')}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {lead.name || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {lead.email}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="flex items-center gap-1">
                          {getTopicIcon(lead.topic)}
                          {lead.topic || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status || 'new'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {lead.source}
                      </td>
                      <td className="px-6 py-4">
                        {lead.chat_history ? (
                          <button
                            onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                          >
                            {expandedLead === lead.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            <MessageCircle className="w-4 h-4" />
                            Chat
                          </button>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Lead löschen"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {expandedLead && (
                    <>
                    {(() => {
                      const lead = leads.find(l => l.id === expandedLead);
                      if (!lead || !lead.chat_history) return null;
                      return (
                        <tr>
                          <td colSpan={7} className="bg-blue-50 p-4">
                            <div className="max-h-64 overflow-y-auto bg-white rounded-lg p-4 shadow-inner">
                              <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" /> Chat-Verlauf
                              </h4>
                              <div className="space-y-3">
                                {(() => {
                                  try {
                                    const chats = JSON.parse(lead.chat_history);
                                    return chats.map((msg: any, idx: number) => (
                                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                                          msg.role === 'user'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}>
                                          <div className="text-xs opacity-70 mb-1">
                                            {msg.role === 'user' ? 'Sie' : 'HelpCheck'}
                                          </div>
                                          {msg.content}
                                        </div>
                                      </div>
                                    ));
                                  } catch {
                                    return <p className="text-gray-500">Fehler beim Laden des Chat-Verlaufs</p>;
                                  }
                                })()}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })()}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
