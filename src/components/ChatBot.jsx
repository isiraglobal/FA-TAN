import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'System Node Active. I am the Hermes Infrastructure Assistant. How can I assist your positioning within the MARKETPEACE network?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    // SECURITY: Enforce input length cap — prevents large payloads
    const sanitizedInput = input.trim().slice(0, 500);
    if (!sanitizedInput) return;

    const userMessage = { role: 'user', content: sanitizedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Knowledge Base Lookup
    const lowercaseInput = sanitizedInput.toLowerCase();
    let response = "";

    if (lowercaseInput.includes("booth") || lowercaseInput.includes("tier") || lowercaseInput.includes("standard") || lowercaseInput.includes("flagship")) {
      response = "Standard Nodes ($250) are 8x6 spaces. Flagship Nodes ($500) are 10x8 corner positions with 2x visibility. Both include Wi-Fi and core signage.";
    } else if (lowercaseInput.includes("deposit") || lowercaseInput.includes("early bird")) {
      response = "Early-bird activation requires a $100 deposit. This secures your position and saves you up to $150 on total entry fees.";
    } else if (lowercaseInput.includes("refund") || lowercaseInput.includes("cancel")) {
      response = "Full system refunds are available up to 7 days prior to rollout. All node balances must be settled 14 days before activation.";
    } else if (lowercaseInput.includes("ticket") || lowercaseInput.includes("price") || lowercaseInput.includes("entry")) {
      response = "General admission is $5. Children under 12 enter free. This ensures maximum foot traffic for our strategic partners.";
    } else if (lowercaseInput.includes("city") || lowercaseInput.includes("next") || lowercaseInput.includes("location") || lowercaseInput.includes("rollout")) {
      response = "We are currently active in the Texas Triangle (Houston, Austin, Dallas). Q3 2026 expansion includes Atlanta, Charlotte, and Nashville.";
    } else if (lowercaseInput.includes("data") || lowercaseInput.includes("ownership")) {
      response = "Creators maintain 100% sovereignty over their patron data. MARKETPEACE provides the infrastructure; you keep the leverage.";
    } else if (lowercaseInput.includes("apply") || lowercaseInput.includes("join") || lowercaseInput.includes("vendor")) {
      response = "Initiate your sync via the Vendor portal. Approval typically occurs within a 72-hour system synchronization window.";
    } else {
      // SECURITY (MED-3): Do NOT echo raw user input in the response string.
      // Reflecting user input, even in a pattern that React normally escapes,
      // creates a dangerous pattern to maintain. Use a generic fallback instead.
      response = "Thank you for your question. The MARKETPEACE team will have more details available closer to each event. Feel free to reach out via our Contact page for specific inquiries.";
    }

    setTimeout(() => {
      const assistantMessage = { 
        role: 'assistant', 
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 md:w-16 md:h-16 bg-[#0077b6] text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,119,182,0.5)] hover:shadow-[0_0_50px_rgba(0,119,182,0.8)] transition-all border border-white/20"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, x: 20 }}
            className="fixed bottom-28 right-6 md:right-8 z-[100] w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] md:h-[600px] bg-[#061530]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center gap-4 bg-white/5">
              <div className="w-10 h-10 rounded-full bg-[#0077b6]/20 flex items-center justify-center border border-[#0077b6]/40">
                <Bot className="w-5 h-5 text-[#0077b6]" />
              </div>
              <div>
                <h3 className="text-white font-medium tracking-tight">Hermes AI</h3>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">System Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 flex flex-col gap-6 scrollbar-hide"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                    ? 'bg-[#0077b6] text-white rounded-tr-none' 
                    : 'bg-white/5 text-white/80 border border-white/10 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-[#0077b6] animate-spin" />
                    <span className="text-white/40 text-xs italic">Hermes is processing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10 bg-white/5">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  // SECURITY: maxLength enforced at DOM level too
                  maxLength={500}
                  placeholder="Ask Hermes..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#0077b6] transition-all placeholder:text-white/20"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2.5 bg-[#0077b6] text-white rounded-xl hover:bg-[#0096e6] transition-all disabled:opacity-50 disabled:hover:bg-[#0077b6]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-center text-[9px] text-white/20 mt-4 uppercase tracking-widest font-bold">
                Powered by Hermes Infrastructure Intelligence
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
