'use client';

import type { Language } from '@/lib/types';
import FileUploader from './file-uploader';
import FormTemplateLibrary from './form-template-library';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface HomeViewProps {
    onAnalyze: (file: File, language: Language) => void;
    error: string | null;
}

export default function HomeView({ onAnalyze, error }: HomeViewProps) {
    const handleSelectTemplate = (analysis: any) => {
        // This would set the analysis state in main-page
        console.log("Template selected", analysis);
    };

    return (
        <div className="container py-8 md:py-12 animate-reveal">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold font-headline text-gradient-primary">
                    Decode Any Paperwork, Instantly.
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground">
                    From complex legal forms to dense government notices, Sahaj AI simplifies everything into your native language. Upload a document to begin.
                </p>
            </div>

            <div className="mt-8 max-w-2xl mx-auto">
                {error && (
                     <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Analysis Failed</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <FileUploader onFileSelect={(file, lang) => onAnalyze(file, lang)} />
            </div>
            
            <FormTemplateLibrary onSelectTemplate={handleSelectTemplate} />
        </div>
    )
}
