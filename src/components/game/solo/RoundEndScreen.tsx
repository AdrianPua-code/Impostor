"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, RefreshCw, ArrowRight, Dices } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Player } from '@/app/game/page';
import { cn } from '@/lib/utils';

export function RoundEndScreen({
  players,
  onNextRound,
  onRestart,
  isGameOver,
}: {
  players: Player[];
  onNextRound: () => void;
  onRestart: () => void;
  isGameOver: boolean;
}) {
  const router = useRouter();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleNewGame = () => {
    router.push('/create');
  }

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedPlayer(null);

    const spinDuration = 3000;
    const spinInterval = 100;
    let spinTime = 0;

    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * players.length);
      setSelectedPlayer(players[randomIndex]);
      spinTime += spinInterval;
      if (spinTime >= spinDuration) {
        clearInterval(intervalId);
        setIsSpinning(false);
      }
    }, spinInterval);
  };

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
        
        {!isGameOver && (
          <div className="space-y-4 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold">¿Quién empieza?</h3>
              <div className="h-12 flex items-center justify-center">
                  {selectedPlayer && (
                      <p className={cn("text-2xl font-bold text-primary transition-opacity duration-300", isSpinning ? 'opacity-50' : 'opacity-100')}>
                          {selectedPlayer.name}
                      </p>
                  )}
              </div>
              <Button onClick={handleSpin} disabled={isSpinning} className="w-full">
                  <Dices className={cn("mr-2 h-5 w-5", isSpinning && "animate-spin")} />
                  {isSpinning ? 'Girando...' : 'Girar Ruleta'}
              </Button>
          </div>
        )}

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
