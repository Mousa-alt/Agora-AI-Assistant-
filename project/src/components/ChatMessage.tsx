import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden shadow-sm flex items-center justify-center">
          <img
            src="https://raw.githubusercontent.com/Mousa-alt/Sigma-logo-PORTRAIT/main/d3ed66bf-f8c7-43a9-ba1d-4e5671338613.ico"
            alt="Sigma AI"
            className="w-full h-full"
          />
        </div>
      )}
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="text-sm leading-relaxed space-y-2">
          {message.content.split('\n').filter(line => line.trim()).map((line, i) => (
            <div key={i} className="flex gap-2">
              {line.trim().startsWith('-') && <span className="flex-shrink-0">•</span>}
              <span>{line.replace(/^-\s*/, '')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}