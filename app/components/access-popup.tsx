'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AccessPopupProps {
  username?: string;
  onClose?: () => void;
  onContinue?: () => void;
}

export default function AccessPopup({ username, onClose, onContinue }: AccessPopupProps) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    // Fechar automaticamente após 6 segundos
    const timer = setTimeout(() => {
      handleClose();
    }, 6000);

    // Cleanup: limpar o timer se o componente for desmontado antes
    return () => {
      clearTimeout(timer);
    };
  }, [handleClose]);

  const handleContinue = () => {
    setIsVisible(false);
    if (onContinue) {
      onContinue();
    } else if (username) {
      router.push(`/vendas/${username}`);
    } else {
      router.push('/');
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full px-4 pt-4 animate-notification-slide-in"
      style={{
        transform: 'translateY(0)',
        WebkitTransform: 'translateY(0)',
        MozTransform: 'translateY(0)',
        msTransform: 'translateY(0)',
      }}
    >
      <div className="mx-auto max-w-sm">
        <div
          className="rounded-lg p-3 relative shadow-2xl border border-white/10"
          style={{ backgroundColor: '#0F172A' }}
        >
          {/* Botão fechar */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors"
            aria-label="Fechar"
            type="button"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          {/* Conteúdo compacto */}
          <div className="pr-5">
            {/* Headline */}
            <h2 className="text-white text-xs font-bold mb-1 leading-tight">
              🔒 O TESTE GRÁTIS SÓ PERMITE A VISUALIZAÇÃO DO CONTEÚDO
            </h2>

            {/* Subheadline */}
            <p className="text-white/70 text-[10px] leading-relaxed mb-2.5">
              Tenha acesso ao perfil completo, incluindo mensagens e histórico de atividade adquirindo o StalkGram.
            </p>
          </div>

          {/* Botão e texto */}
          <div className="space-y-1.5">
            <button
              onClick={handleContinue}
              className="w-full bg-green-500 hover:bg-green-600 rounded-lg px-3 py-2 text-white font-semibold text-xs transition-colors shadow-lg"
              aria-label="Ver tudo agora"
              type="button"
            >
              Ver tudo agora
            </button>

            <p className="text-white/60 text-[9px] text-center">
              🔓 Acesso imediato • Cancele quando quiser
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

