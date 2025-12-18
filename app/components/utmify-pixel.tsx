"use client";

import { useEffect } from "react";

export function UtmifyPixel() {
  useEffect(() => {
    // Verificar se já está no cliente
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    // Adicionar error handler global para suprimir erros do ipify IPv6
    const originalError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      // Ignorar erros relacionados ao api6.ipify.org (IPv6 não disponível)
      if (
        typeof message === "string" &&
        (message.includes("api6.ipify.org") ||
          message.includes("ERR_NAME_NOT_RESOLVED") ||
          message.includes("Failed to fetch"))
      ) {
        return true; // Suprimir o erro
      }
      // Para outros erros, usar o handler original se existir
      if (originalError) {
        return originalError(message, source, lineno, colno, error);
      }
      return false;
    };

    // Adicionar unhandledrejection handler para promises rejeitadas
    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (
        reason &&
        typeof reason === "object" &&
        "message" in reason &&
        typeof reason.message === "string" &&
        (reason.message.includes("api6.ipify.org") ||
          reason.message.includes("ERR_NAME_NOT_RESOLVED") ||
          reason.message.includes("Failed to fetch"))
      ) {
        event.preventDefault(); // Suprimir o erro
      }
    };
    window.addEventListener("unhandledrejection", unhandledRejectionHandler);

    // Verificar se o script já foi adicionado
    const existingScript = document.querySelector(
      'script[src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"]'
    );
    if (existingScript) {
      return () => {
        window.removeEventListener("unhandledrejection", unhandledRejectionHandler);
        window.onerror = originalError;
      };
    }

    // Define o pixelId no window
    (window as any).pixelId = "694062ecad5cf41795f0425c";

    // Cria e adiciona o script do pixel
    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("defer", "");
    script.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");

    // Adicionar error handler no script
    script.onerror = () => {
      // Silenciar erros de carregamento do script
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {
      window.removeEventListener("unhandledrejection", unhandledRejectionHandler);
      window.onerror = originalError;
    };
  }, []);

  return null;
}



