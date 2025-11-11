
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft } from 'lucide-react';

export function CreateGameForm() {
  const [players, setPlayers] = useState(3);
  const router = useRouter();

  const handleCreateGame = () => {
    router.push(`/setup/phrases?players=${players}`);
  };

  return (
    <div className="w-full max-w-lg">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="w-4 h-4" />
        Volver al Menú
      </Link>
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl sm:text-3xl">Crear Nueva Partida</CardTitle>
          <CardDescription>Configura los ajustes para la partida.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <div className="space-y-4">
            <Label htmlFor="players" className="text-base font-medium">
              Número de Jugadores ({players})
            </Label>
            <div className="flex items-center gap-4">
              <Slider
                id="players"
                value={[players]}
                onValueChange={(value: number[]) => setPlayers(value[0])}
                min={3}
                max={8}
                step={1}
              />
              <span className="font-bold text-primary text-xl w-8 text-center">{players}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateGame} className="w-full text-base sm:text-lg py-5 sm:py-6" size="lg">
            Siguiente
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
