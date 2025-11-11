"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, RefreshCw, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function RoundEndScreen({
  onNextRound,
  onRestart,
  isGameOver,
}: {
  onNextRound: () => void;
  onRestart: () => void;
  isGameOver: boolean;
}) {
  const router = useRouter();

  const handleNewGame = () => {
    router.push('/create');
  }

  return (
    <Card className="text-center p-4 sm:p-6">
      <CardHeader>
        <CardTitle className="font-headline text-2xl sm:text-3xl">
          {isGameOver ? '¡Se acabaron las palabras!' : 'Fin de la Ronda'}
        </CardTitle>
        <CardDescription>
          {isGameOver ? '¡Ups! Ya no quedan más. Es hora de empezar de nuevo.' : 'Preparaos para la siguiente ronda.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGameOver ? (
          <Button onClick={handleNewGame} size="lg" className="w-full text-base sm:text-lg py-5 sm:py-6">
            <Award className="mr-2 h-5 w-5" />
            Empezar de Nuevo
          </Button>
        ) : (
          <Button onClick={onNextRound} size="lg" className="w-full text-base sm:text-lg py-5 sm:py-6">
            <ArrowRight className="mr-2 h-5 w-5" />
            Siguiente Ronda
          </Button>
        )}
         <Button variant="ghost" onClick={onRestart} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reiniciar Partida (mismas palabras)
        </Button>
      </CardContent>
    </Card>
  );
}
