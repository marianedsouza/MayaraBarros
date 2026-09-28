import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Download, Share2, Sparkles } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  name: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose, url, name }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !url) return;

    QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#1c1917',
        light: '#ffffff',
      },
    })
      .then((data) => {
        setQrDataUrl(data);
      })
      .catch((err) => {
        console.error('Failed to generate QR code', err);
      });
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qrcode_${name.toLowerCase().replace(/\s+/g, '_')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Cartão Digital - ${name}`,
          text: `Acesse o cartão digital profissional e links de ${name}`,
          url: url,
        });
      } catch {
        // User dismissed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
    >
      <div
        className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 text-stone-900 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 transition-colors rounded-full hover:bg-stone-100"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Networking Presencial</span>
          </div>
          <h3 id="qr-modal-title" className="text-xl font-semibold text-stone-900 font-editorial">
            QR Code do Cartão
          </h3>
          <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
            Aponte a câmera do celular para abrir o cartão digital de {name} instantaneamente.
          </p>
        </div>

        <div className="mt-5 p-4 bg-stone-50 rounded-2xl border border-stone-200/80 flex flex-col items-center justify-center">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`QR Code para ${name}`}
              className="w-56 h-56 rounded-xl bg-white p-2 shadow-sm object-contain"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-xs text-stone-400">
              Gerando QR Code...
            </div>
          )}
          <p className="text-[11px] text-stone-500 mt-2.5 truncate max-w-[240px] text-center font-mono">
            {url}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-500" />
                <span>Copiar Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-stone-300 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <Download className="w-4 h-4 text-stone-500" />
            <span>Baixar PNG</span>
          </button>
        </div>

        <button
          onClick={handleNativeShare}
          className="mt-2.5 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-sm"
        >
          <Share2 className="w-4 h-4" />
          <span>Compartilhar com Alguém</span>
        </button>
      </div>
    </div>
  );
};
