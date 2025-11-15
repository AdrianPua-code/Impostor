
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { RoleAssignmentScreen } from '@/components/game/solo/RoleAssignmentScreen';
import { RoundEndScreen } from '@/components/game/solo/RoundEndScreen';
import { Header } from '@/components/Header';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export type Player = {
  id: number;
  name: string;
  avatar: string;
  isImpostor: boolean;
  agentNumber: number;
};

type GameStage = 'role-assignment' | 'round-end';

function createPlayers(playerCount: number): Player[] {
  const players: Player[] = [];
  const impostorIndex = Math.floor(Math.random() * playerCount);
  let agentCounter = 0;

  for (let i = 0; i < playerCount; i++) {
    const isImpostor = i === impostorIndex;
    if (!isImpostor) {
      agentCounter++;
    }
    players.push({
      id: i + 1,
      name: `Jugador ${i + 1}`,
      avatar: PlaceHolderImages.find(img => img.id === `avatar${i + 1}`)?.imageUrl || '',
      isImpostor: isImpostor,
      agentNumber: isImpostor ? 0 : agentCounter,
    });
  }
  return players;
}

function Game() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allPhrases, setAllPhrases] = useState<string[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [secretPhrase, setSecretPhrase] = useState('');
  const [stage, setStage] = useState<GameStage>('role-assignment');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [shuffledPhrases, setShuffledPhrases] = useState<string[]>([]);
  const [round, setRound] = useState(0);

  useEffect(() => {
    const playerCount = parseInt(searchParams.get('players') || '3', 10);
    const phrasesStr = searchParams.get('phrases');
    if (phrasesStr) {
      const phrases = JSON.parse(decodeURIComponent(phrasesStr));
      setAllPhrases(phrases);
      const gamePlayers = createPlayers(playerCount);
      setPlayers(gamePlayers);
      
      const shuffled = [...phrases].sort(() => Math.random() - 0.5);
      setShuffledPhrases(shuffled);
      setSecretPhrase(shuffled[0]);
      setRound(0);
    }
  }, [searchParams]);
  
  const currentPlayer = players[currentPlayerIndex];

  const handleRolesAssigned = () => {
     if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setCurrentPlayerIndex(0);
      setStage('round-end');
    }
  };

  const handleNextRound = () => {
    const nextRound = round + 1;
    if (nextRound >= shuffledPhrases.length) {
      // Game over logic is handled in RoundEndScreen, which will navigate
      return;
    }
    
    const playerCount = players.length;
    let agentCounter = 0;
    const newImpostorIndex = Math.floor(Math.random() * playerCount);
    const updatedPlayers = players.map((p, i) => {
        const isImpostor = i === newImpostorIndex;
        if (!isImpostor) {
          agentCounter++;
        }
        return {
          ...p,
          isImpostor: isImpostor,
          agentNumber: isImpostor ? 0 : agentCounter,
        };
      });
    
    setPlayers(updatedPlayers);
    setRound(nextRound);
    setSecretPhrase(shuffledPhrases[nextRound]);
    setCurrentPlayerIndex(0);
    setStage('role-assignment');
  };

  const handleRestart = () => {
    const playerCount = parseInt(searchParams.get('players') || '3', 10);
    const gamePlayers = createPlayers(playerCount);
    setPlayers(gamePlayers);

    const shuffled = [...allPhrases].sort(() => Math.random() - 0.5);
    setShuffledPhrases(shuffled);
    setSecretPhrase(shuffled[0]);
    setRound(0);
    setCurrentPlayerIndex(0);
    setStage('role-assignment');
  };

  const renderStage = () => {
    if (!currentPlayer) {
      return <div>Cargando partida...</div>;
    }

    switch (stage) {
      case 'role-assignment':
        return (
          <RoleAssignmentScreen
            key={currentPlayer.id}
            player={currentPlayer}
            secretPhrase={secretPhrase}
            onContinue={handleRolesAssigned}
            isLastPlayer={currentPlayerIndex === players.length -1}
          />
        );
      case 'round-end':
        return <RoundEndScreen players={players} onNextRound={handleNextRound} onRestart={handleRestart} isGameOver={round >= shuffledPhrases.length - 1} />;
      default:
        return <div>Cargando...</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8">
            <Home className="h-5 w-5" />
            <span className="sr-only">Abandonar Partida</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Desean abandonar la partida?</AlertDialogTitle>
            <AlertDialogDescription>
              Si abandonan, perderán todo el progreso. Tendrán que empezar de nuevo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push('/')}>Aceptar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {renderStage()}
        </div>
      </main>
    </div>
  );
}

export default function GamePage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Game />
        </Suspense>
    )
}
