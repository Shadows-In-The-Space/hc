import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// --- Types ---
export interface Lead {
  name: string;
  email: string;
  phone: string;
  topic: 'verkehrsrecht' | 'datenleck' | 'allgemein';
  description: string;
  appointmentDate?: string;
  appointmentTime?: string;
  files?: File[];
}

export interface ChatState {
  isOpen: boolean;
  isFloating: boolean;
  messages: Message[];
  lead: Lead | null;
  currentStep: 'greeting' | 'chat' | 'lead' | 'appointment' | 'done';
  isDataLeakCheck: boolean;
  uploadedFiles: File[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface ChatContextType extends ChatState {
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setLead: (lead: Lead | null) => void;
  setCurrentStep: (step: ChatState['currentStep']) => void;
  setIsDataLeakCheck: (value: boolean) => void;
  setUploadedFiles: (files: File[]) => void;
  resetChat: () => void;
}

const initialState: ChatState = {
  isOpen: false,
  isFloating: false,
  messages: [
    { role: 'assistant', content: 'Willkommen bei helpcheck! Ich helfe Ihnen, Ihre Ansprüche bei Verkehrsverstößen oder Datenlecks zu prüfen. Welches Anliegen haben Sie?' }
  ],
  lead: null,
  currentStep: 'greeting',
  isDataLeakCheck: false,
  uploadedFiles: []
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ChatState>(initialState);

  const openChat = useCallback(() => setState(prev => ({ ...prev, isOpen: true })), []);
  const closeChat = useCallback(() => setState(prev => ({ ...prev, isOpen: false })), []);
  const toggleChat = useCallback(() => setState(prev => ({ ...prev, isOpen: !prev.isOpen })), []);

  const addMessage = useCallback((message: Message) => {
    setState(prev => ({ ...prev, messages: [...prev.messages, message] }));
  }, []);

  const setMessages = useCallback((messages: Message[]) => {
    setState(prev => ({ ...prev, messages }));
  }, []);

  const setLead = useCallback((lead: Lead | null) => {
    setState(prev => ({ ...prev, lead }));
  }, []);

  const setCurrentStep = useCallback((currentStep: ChatState['currentStep']) => {
    setState(prev => ({ ...prev, currentStep }));
  }, []);

  const setIsDataLeakCheck = useCallback((isDataLeakCheck: boolean) => {
    setState(prev => ({ ...prev, isDataLeakCheck }));
  }, []);

  const setUploadedFiles = useCallback((uploadedFiles: File[]) => {
    setState(prev => ({ ...prev, uploadedFiles }));
  }, []);

  const resetChat = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <ChatContext.Provider value={{
      ...state,
      openChat,
      closeChat,
      toggleChat,
      addMessage,
      setMessages,
      setLead,
      setCurrentStep,
      setIsDataLeakCheck,
      setUploadedFiles,
      resetChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export default ChatContext;
