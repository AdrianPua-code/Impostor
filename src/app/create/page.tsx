import { CreateGameForm } from '@/components/game/CreateGameForm';

export default function CreateGamePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow flex items-center justify-center p-4">
        <CreateGameForm />
      </main>
    </div>
  );
}
