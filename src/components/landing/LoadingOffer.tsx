'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

export function LoadingOffer() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalTime = 120 * 1000; // 120 segundos em milissegundos
    const intervalTime = 100; // atualiza a cada 100ms para suavidade
    const increments = totalTime / intervalTime;
    const progressIncrement = 100 / increments;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + progressIncrement;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 max-w-3xl md:max-w-[700px] py-8 text-center">
        <p className="text-lg font-medium text-primary mb-3 animate-pulse">
            Sua oferta especial está sendo carregada... Continue assistindo!
        </p>
        <Progress value={progress} className="w-full h-3" />
        <p className='text-xs text-muted-foreground mt-2'>{Math.round(progress)}%</p>
    </div>
  );
}
