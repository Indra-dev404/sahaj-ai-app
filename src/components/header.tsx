import Logo from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b glassmorphism">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-4" onClick={() => window.location.reload()}>
          <Logo />
          <span className="font-bold text-lg hidden sm:inline-block">Sahaj AI</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/firebase/genkit/tree/main/studio/samples/paperwork-decoder" target="_blank" rel="noopener noreferrer" aria-label="Github Repository">
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
