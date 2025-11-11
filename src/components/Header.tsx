import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn('py-6 sm:py-8 text-center', className)}>
      <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter text-primary">
        El Impostor
      </h1>
      <p className="mt-1 sm:mt-2 text-base sm:text-lg text-muted-foreground">El juego definitivo de engaño</p>
    </header>
  );
}
