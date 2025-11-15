"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

export function PhrasesForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [playerCount, setPlayerCount] = useState(0);
  const [phrases, setPhrases] = useState<string[]>([]);
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isPhraseVisible, setIsPhraseVisible] = useState(false);

  useEffect(() => {
    const players = parseInt(searchParams.get('players') || '0', 10);
    setPlayerCount(players);
  }, [searchParams]);

  const handleNextPlayer = () => {
    if (currentPhrase.trim() === '') return;

    const newPhrases = [...phrases, currentPhrase];
    setPhrases(newPhrases);
    setCurrentPhrase('');
    setIsPhraseVisible(false); // Hide phrase for next player

    if (currentPlayerIndex < playerCount - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      // Last player, move to the game
      const phrasesParam = JSON.stringify(newPhrases);
      router.push(`/game?players=${playerCount}&phrases=${encodeURIComponent(phrasesParam)}`);
    }
  };

  const isLastPlayer = currentPlayerIndex === playerCount - 1;

  if (playerCount === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="w-full max-w-lg">
      <Link href="/create" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="w-4 h-4" />
        Volver
      </Link>
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl sm:text-3xl">Turno del Jugador {currentPlayerIndex + 1}</CardTitle>
          <CardDescription>Introduce tu palabra secreta. ¡Que nadie la vea!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-4 sm:p-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="phrase-input">Palabra Secreta</Label>
            <div className="relative">
              <Input
                id="phrase-input"
                type={isPhraseVisible ? 'text' : 'password'}
                placeholder="Escribe una palabra..."
                value={currentPhrase}
                onChange={(e) => setCurrentPhrase(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setIsPhraseVisible(!isPhraseVisible)}
              >
                {isPhraseVisible ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {isPhraseVisible ? 'Ocultar palabra' : 'Mostrar palabra'}
                </span>
              </Button>
            </div>
          </div>
          <div>
            <Progress value={((currentPlayerIndex + 1) / playerCount) * 100} className="w-full" />
            <p className="text-center text-sm text-muted-foreground mt-2">
              Jugador {currentPlayerIndex + 1} de {playerCount}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 sm:p-6 pt-0">
          <Button onClick={handleNextPlayer} className="w-full text-base sm:text-lg py-5 sm:py-6" size="lg" disabled={currentPhrase.trim() === ''}>
            {isLastPlayer ? 'Empezar Partida' : 'Siguiente Jugador'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
