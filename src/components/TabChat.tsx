import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface TabChatProps {
  profile: UserProfile;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const TabChat: React.FC<TabChatProps> = ({ profile }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: `Olá, ${profile.name}! Sou seu Personal Trainer PRO e Especialista em Biomecânica e Hipertrofia. Como posso te ajudar com seus treinos, cargas ou dieta hoje?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const systemInstruction = `Você é o assistente virtual sênior do aplicativo MEU TREINO PRO. Seu nome é Coach PRO. Você é um personal trainer especialista em biomecânica de musculação, hipertrofia, progressão de cargas e periodização de treinos (Full Body e Divisão 5x). Responda sempre em português do Brasil de forma motivadora, técnica, clara e direta ao ponto.`;

      const chatHistory = newMessages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: chatHistory, systemInstruction })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch response');

      const replyText = data.text || 'Desculpe, ocorreu um erro ao processar sua dúvida. Tente novamente.';
      setMessages([...newMessages, { role: 'model', text: replyText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'model',
          text: 'Desculpe, ocorreu um erro de conexão com o servidor de IA. Verifique se a chave GEMINI_API_KEY está configurada no servidor.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-2xl mx-auto pb-20">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 mb-4 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-white text-sm flex items-center gap-1.5">
              Coach PRO <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            </h2>
            <p className="text-[11px] text-slate-400">Especialista em Biomecânica e Treinamento</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
          IA Servidor
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto space-y-3 p-2 scrollbar-none">
        {messages.map((msg, idx) => {
          const isModel = msg.role === 'model';
          return (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${isModel ? 'justify-start' : 'justify-end'}`}
            >
              {isModel && (
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-3xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-lg ${
                  isModel
                    ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tr-sm shadow-blue-600/25'
                }`}
              >
                {msg.text}
              </div>

              {!isModel && (
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-md">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600/20 flex items-center justify-center animate-spin text-blue-400">
              <Bot className="w-3 h-3" />
            </div>
            Coach PRO está escrevendo...
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex gap-2 overflow-x-auto py-2 shrink-0 scrollbar-none">
        {[
          'Como progredir carga no supino?',
          'Qual o descanso ideal entre séries?',
          'Como evitar dor lombar no agachamento?',
          'Dica de nutrição para hipertrofia'
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => setInput(prompt)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs whitespace-nowrap hover:bg-slate-800 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="mt-2 flex gap-2 shrink-0">
        <input
          type="text"
          placeholder="Pergunte sobre treinos, biomecânica, cargas..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 shadow-inner"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
