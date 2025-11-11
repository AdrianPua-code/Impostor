import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Modo Práctica</CardTitle>
        <CardDescription>Juega una ronda rápida contra bots para aprender las reglas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">Tu objetivo: descubrir al impostor o, si eres tú, engañar a todos.</p>
        <Button onClick={onStart} size="lg" className="w-full text-lg py-6">
          <Zap className="mr-2" />
          Empezar Ronda
        </Button>
        <Button variant="ghost" asChild className="w-full">
          <Link href="/">Volver al Menú</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
