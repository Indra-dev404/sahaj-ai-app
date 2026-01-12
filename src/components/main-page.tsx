'use client';
import { useState, useCallback } from 'react';
import type { AnalysisResult, AnalysisState, Language } from '@/lib/types';
import { analyzePaperwork } from '@/lib/actions';
import { useToast } from "@/hooks/use-toast";
import HomeView from './home-view';
import AnalysisLoader from './analysis-loader';
import AnalysisView from './analysis-view';

export default function MainPage() {
    const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [documentDataUri, setDocumentDataUri] = useState<string | null>(null);
    const { toast } = useToast();

    const performAnalysis = useCallback(async (dataUri: string, language: Language) => {
        setAnalysisState('loading');
        setError(null);
        setAnalysisResult(null);

        try {
            const result = await analyzePaperwork({ documentDataUri: dataUri, language });
            setAnalysisResult(result);
            setAnalysisState('success');
            setDocumentDataUri(dataUri);
        } catch (e) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(errorMessage);
            setAnalysisState('error');
            toast({
                variant: "destructive",
                title: "Analysis Failed",
                description: errorMessage,
            });
        }
    }, [toast]);
    
    const handleFileAnalyze = useCallback((file: File, language: Language) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const dataUri = reader.result as string;
            performAnalysis(dataUri, language);
        };
        reader.onerror = () => {
            const errorMessage = "Failed to read the file.";
            setError(errorMessage);
            setAnalysisState('error');
            toast({
                variant: "destructive",
                title: "File Error",
                description: errorMessage,
            });
        };
    }, [performAnalysis, toast]);


    const handleLanguageChange = useCallback(async (language: Language) => {
        if (!documentDataUri) return;
        await performAnalysis(documentDataUri, language);
    }, [documentDataUri, performAnalysis]);


    const handleReset = () => {
        setAnalysisState('idle');
        setAnalysisResult(null);
        setError(null);
        setDocumentDataUri(null);
    };

    if (analysisState === 'loading') {
        return <AnalysisLoader />;
    }

    if (analysisState === 'success' && analysisResult) {
        return <AnalysisView 
            result={analysisResult} 
            onReset={handleReset} 
            onLanguageChange={handleLanguageChange} 
        />;
    }

    // idle or error state
    return <HomeView onAnalyze={handleFileAnalyze} error={error} />;
}
