"use client";

import { useEffect } from "react";

export function UtmifyPixel() {
  useEffect(() => {
    // Verificar se já está no cliente
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    // Verificar se o script já foi adicionado
    const existingScript = document.querySelector(
      'script[src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"]'
    );
    if (existingScript) {
      return;
    }

    // Define o pixelId no window
    (window as any).pixelId = "694062ecad5cf41795f0425c";
    
    // Cria e adiciona o script do pixel
    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("defer", "");
    script.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
    document.head.appendChild(script);
  }, []);

  return null;
}



