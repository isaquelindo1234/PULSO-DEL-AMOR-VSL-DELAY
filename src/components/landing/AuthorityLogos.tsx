import Image from 'next/image';

export function AuthorityLogos() {
    const logos = [
      { name: "MOM", src: "https://mexico.mom-gmr.org/uploads/tx_lfrogmom/media/11534-1329_import.png", width: 111, height: 40 },
      { name: "Infobae", src: "https://static.cdnlogo.com/logos/i/91/infobae.svg", width: 111, height: 40 },
      { name: "BBC News", src: "https://toppng.com/uploads/preview/bbc-news-logo-png-bbc-world-channel-logo-11563049882jqyf96g6u7.png", width: 111, height: 40 },
      { name: "Univision", src: "https://e7.pngegg.com/pngimages/518/905/png-clipart-univision-communications-logo-univision-deportes-network-unimas-odessatx-purple-television.png", width: 111, height: 40 },
    ];
  
    return (
      <div className="py-4">
        <p className="text-center text-sm text-muted-foreground mb-4">COMO VISTO EN:</p>
        <div className="flex justify-center items-center gap-8 sm:gap-12 flex-wrap">
          {logos.map((logo) => (
            <Image
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              loading="lazy"
              className="object-contain h-auto"
              style={{maxWidth: '111px'}}
            />
          ))}
        </div>
      </div>
    );
  }
  