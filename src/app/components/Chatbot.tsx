import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: "Olá! Sou o GYM Assistant. Como posso ajudar você a gerenciar sua academia hoje? Você pode me perguntar sobre alunos inadimplentes, vendas do dia ou como criar um novo treino.", 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simple bot logic
    setTimeout(() => {
      let botResponse = "Desculpe, ainda estou aprendendo. Poderia ser mais específico?";
      const lower = input.toLowerCase();
      
      if (lower.includes("inadimplente") || lower.includes("deve")) {
        botResponse = "Atualmente temos 3 alunos com mensalidades atrasadas: Ricardo Santos, Juliana Lima e Marcos Pereira. Deseja que eu gere os links de cobrança?";
      } else if (lower.includes("venda") || lower.includes("faturamento")) {
        botResponse = "Hoje você realizou 12 vendas na loja, totalizando R$ 845,00 em suplementos. Excelente desempenho!";
      } else if (lower.includes("treino") || lower.includes("ficha")) {
        botResponse = "Para criar um treino, vá na aba 'Treinos' e clique em 'Novo Template'. Se preferir, posso sugerir uma rotina de Hipertrofia.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[380px] h-[500px] bg-[#111111] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-orange-500 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-black/20 p-2 rounded-xl">
                  <Bot className="h-5 w-5 text-black" />
                </div>
                <div>
                  <h3 className="text-black font-bold text-sm">GYM Assistant</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-900 rounded-full animate-pulse" />
                    <span className="text-[10px] text-black/60 font-bold uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-black/50 hover:text-black">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                    ? 'bg-orange-500 text-black font-medium rounded-tr-none' 
                    : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/50 border-t border-white/5">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua dúvida..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-orange-500 hover:text-orange-400"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3" /> Powered by GymMax AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-500 text-black p-4 rounded-2xl shadow-xl shadow-orange-500/20 hover:scale-110 transition-all active:scale-95 group relative"
      >
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-bounce" />
        <MessageSquare className="h-6 w-6" />
      </button>
    </div>
  );
}
