"use client";

export function LoadingScreen() {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      role="status"
      aria-label="Carregando dados"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinner animado */}
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-pink-500 border-r-orange-500 border-b-yellow-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 opacity-75 animate-pulse"></div>
          </div>
        </div>

        {/* Texto de loading */}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-white">
            Capturando dados...
          </p>
          <p className="text-sm text-white/60">
            Isso pode levar alguns segundos
          </p>
        </div>

        {/* Barra de progresso animada */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div className="h-full w-1/3 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 rounded-full loading-progress"></div>
        </div>
      </div>
    </div>
  );
}

