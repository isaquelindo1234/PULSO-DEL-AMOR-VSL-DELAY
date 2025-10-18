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
        
        {/* 🔹 UTMify – captura de UTMs */}
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
        ></script>

        {/* 🔹 UTMify – Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.pixelId = "68f31b1b41bbf871c3c5652f";
              if (!window.__utmifyPixelLoaded) {
                window.__utmifyPixelLoaded = true;
                var a = document.createElement("script");
                a.async = true;
                a.defer = true;
                a.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
                document.head.appendChild(a);
              }
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
