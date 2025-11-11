import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Swords } from 'lucide-react';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl sm:text-3xl">Menú Principal</CardTitle>
            <CardDescription>Comienza una nueva partida de engaño.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <Link href="/create" passHref>
                <Button variant="default" className="w-full text-lg py-6" size="lg">
                  <Swords className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                  Nueva Partida
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="text-center p-4 text-xs sm:text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} El Impostor. Derechos reservados de Adrian Samudio Pua.</p>
      </footer>
    </div>
  );
}
