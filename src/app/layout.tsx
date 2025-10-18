'use client';

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import Script from 'next/script';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  useEffect(() => {
    // This is a workaround for a hydration error that can be caused by browser extensions.
    const cleanup = () => {
      document.body.removeAttribute('bis_status');
      document.body.removeAttribute('bis_frame_id');
    };
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'bis_status' || mutation.attributeName === 'bis_frame_id')) {
          cleanup();
        }
      });
    });
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        <Script src="https://fast.wistia.com/assets/external/E-v1.js" async />
        <Script src="https://fast.wistia.com/player.js" async />
        
        {/* 1) UTMify – UTMs (carrega primeiro, sem defer/async p/ evitar corrida) */}
        <Script
          id="utmify-utms"
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
        ></Script>

        {/* 2) UTMify – Pixel (só injeta DEPOIS que o UTMs terminar de carregar) */}
        <Script
          id="utmify-pixel-loader"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                const PIXEL_ID = "68f31b1b41bbf871c3c5652f";

                function waitForUtms(retries = 50) {
                  if (window.utmify && window.utmify._id) {
                    initPixel();
                  } else if (retries > 0) {
                    setTimeout(() => waitForUtms(retries - 1), 200);
                  } else {
                    console.warn("[UTMify] _id não gerado — pixel não será inicializado para evitar erro 400.");
                  }
                }

                function initPixel() {
                  if (window.__utmifyPixelLoaded) return;
                  window.__utmifyPixelLoaded = true;
                  window.pixelId = PIXEL_ID;

                  const s = document.createElement("script");
                  s.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
                  s.async = true;
                  s.defer = true;
                  document.head.appendChild(s);
                }

                const utms = document.getElementById("utmify-utms");
                if (utms) {
                    utms.addEventListener("load", () => waitForUtms());
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-body antialiased bg-background" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
