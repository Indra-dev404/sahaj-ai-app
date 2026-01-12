import Header from '@/components/header';
import MainPage from '@/components/main-page';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <MainPage />
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        Disclaimer: Not a legal document. Always verify with official government sources.
      </footer>
    </div>
  );
}
