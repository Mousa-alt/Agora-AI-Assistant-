import { useState } from 'react';
import { Message } from './types/chat';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm Sigma AI Assistant. Ask me anything about your project - specifications, materials, timelines, approvals, or meeting minutes.",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('https://mousaalt.app.n8n.cloud/webhook/740f44a5-cd08-429f-bd40-c8865d2c8246/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: content })
      });
      
      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
content: data.response || data.output || data.text || "No response received",
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't connect to the server. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sigma AI Project Assistant
          </h1>
          <div className="flex justify-center mb-3">
            <img
              src="https://raw.githubusercontent.com/Mousa-alt/Sigma-logo-PORTRAIT/main/Sigma.png"
              alt="Sigma Logo"
              className="h-16 md:h-20 object-contain"
            />
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            Your intelligent construction project assistant
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto my-6 px-4">
        <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <ChatContainer messages={messages} isLoading={isLoading} />
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4 px-4">
        <p className="text-center text-sm text-gray-500">
          © 2024 Created by Sigma Contractors Technical Office | Powered by AI
        </p>
      </footer>
    </div>
  );
}

export default App;