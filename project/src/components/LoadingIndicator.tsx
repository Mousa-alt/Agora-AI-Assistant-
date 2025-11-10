export function LoadingIndicator() {
  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden shadow-sm flex items-center justify-center">
        <img
          src="https://raw.githubusercontent.com/Mousa-alt/Sigma-logo-PORTRAIT/main/d3ed66bf-f8c7-43a9-ba1d-4e5671338613.ico"
          alt="Sigma AI"
          className="w-full h-full"
        />
      </div>
      <div className="bg-gray-100 rounded-2xl px-4 py-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
