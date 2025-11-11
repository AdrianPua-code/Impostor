
"use client";

import { Suspense } from 'react';
import { PhrasesForm } from '@/components/game/setup/PhrasesForm';

function PhrasesPageContent() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="flex-grow flex items-center justify-center p-4">
                <PhrasesForm />
            </main>
        </div>
    );
}

export default function PhrasesPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <PhrasesPageContent />
        </Suspense>
    )
}
