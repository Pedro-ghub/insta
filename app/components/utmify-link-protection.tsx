"use client";

import { useEffect } from "react";

export function UtmifyLinkProtection() {
  useEffect(() => {
    // Prevenir que o Utmify modifique links do Next.js após a hidratação
    if (typeof window === "undefined") return;

    // Aguardar a hidratação do React completar
    const protectLinks = () => {
      // Encontrar todos os links internos do Next.js
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach((link) => {
        const anchor = link as HTMLAnchorElement;
        const originalHref = anchor.getAttribute("href");

        // Se o link tem um href relativo e foi modificado pelo Utmify
        if (originalHref && originalHref.startsWith("/") && !originalHref.includes("?")) {
          // Armazenar o href original como atributo data
          if (!anchor.dataset.originalHref) {
            anchor.dataset.originalHref = originalHref;
          }

          // Se o href foi modificado (tem query params), restaurar
          if (anchor.href.includes("?") && anchor.href !== originalHref) {
            anchor.href = originalHref;
          }
        }
      });
    };

    // Executar após um pequeno delay para garantir que o Utmify já processou
    const timeout = setTimeout(protectLinks, 100);

    // Também proteger após mudanças no DOM
    const observer = new MutationObserver(() => {
      protectLinks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return null;
}

