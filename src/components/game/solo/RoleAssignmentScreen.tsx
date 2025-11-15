"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, UserX } from 'lucide-react';
import type { Player } from '@/app/game/page';

export function RoleAssignmentScreen({
  player,
  secretPhrase,
  onContinue,
  isLastPlayer,
}: {
  player: Player;
  secretPhrase: string;
  onContinue: () => void;
  isLastPlayer: boolean;
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const { isImpostor, agentNumber } = player;

  if (!isRevealed) {
    return (
      <Card className="text-center p-6 sm:p-8">
        <CardHeader>
          <CardTitle className="font-headline text-xl sm:text-2xl">Turno del {player.name}</CardTitle>
          <CardDescription>Pásale el celular a {player.name}. Cuando estés listo, pulsa para ver tu rol.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsRevealed(true)} size="lg" className="w-full text-base sm:text-lg py-5 sm:py-6">
            Revelar mi Rol
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`text-center p-4 sm:p-6 border-4 ${isImpostor ? 'border-destructive' : 'border-primary'}`}>
      <CardHeader>
        <div className="flex justify-center mb-4">
          {isImpostor ? (
            <UserX className="h-12 w-12 sm:h-16 sm:w-16 text-destructive" />
          ) : (
            <UserCheck className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
          )}
        </div>
        <CardTitle className="font-headline text-2xl sm:text-3xl">{isImpostor ? '¡Eres el Impostor!' : `Eres el Jugador ${player.id}`}</CardTitle>
        <CardDescription>{isImpostor ? 'Tu misión es engañar a todos.' : 'Descubre al impostor.'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">
            {isImpostor ? 'No sabes la palabra secreta. ¡Intenta adivinarla!' : 'La palabra secreta es:'}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-foreground font-headline break-words">
            {isImpostor ? '???' : `"${secretPhrase}"`}
          </p>
          {isImpostor && (
            <p className="text-md sm:text-lg font-semibold text-destructive mt-2">
              Finge ser el Jugador {agentNumber}
            </p>
          )}
        </div>
        <Button onClick={onContinue} size="lg" className="w-full text-base sm:text-lg py-5 sm:py-6">
          {isLastPlayer ? 'Finalizar Ronda' : 'Entendido, pasar al siguiente'}
        </Button>
      </CardContent>
    </Card>
  );
}
