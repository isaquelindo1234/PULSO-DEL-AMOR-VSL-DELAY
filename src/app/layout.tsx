import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Pulso del Amor',
  description: 'Activa el interruptor de arrepentimiento en el cerebro masculino.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        <Script src="https://fast.wistia.com/assets/external/E-v1.js" async />
        <Script src="https://fast.wistia.com/player.js" async />
      </head>
      <body className="font-body antialiased bg-background">
        {children}
        <Toaster />
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          strategy="lazyOnload"
        ></Script>
        <Script id="utmify-pixel" strategy="lazyOnload">
          {`
            window.pixelId = "68f31b1b41bbf871c3c5652f";
            (function () {
              var a = document.createElement("script");
              a.async = true; a.defer = true;
              a.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
              document.head.appendChild(a);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
