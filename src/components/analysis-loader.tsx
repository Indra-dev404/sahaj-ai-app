'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Loader } from 'lucide-react';

const steps = [
    "Structure Analysis",
    "Legal Interpretation",
    "Simplification",
    "Translation",
    "Resource Grounding",
];

export default function AnalysisLoader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 80); // Simulate loading time of 8 seconds

        return () => clearInterval(interval);
    }, []);

    const currentStepIndex = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center animate-reveal">
            <div className="w-full max-w-md p-8 rounded-lg shadow-2xl bg-card">
                <h2 className="text-2xl font-bold text-gradient-primary mb-4">Analyzing your document...</h2>
                <p className="text-muted-foreground mb-6">Our AI is working its magic. This may take a moment.</p>
                
                <div className="w-full bg-muted rounded-full h-2.5 mb-6">
                    <div className="bg-gradient-primary h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
                </div>

                <ul className="space-y-4 text-left">
                    {steps.map((step, index) => {
                        const stepProgress = ((index + 1) / steps.length) * 100;
                        const isCompleted = progress >= stepProgress;
                        const isActive = index === currentStepIndex && !isCompleted;

                        return (
                            <li key={step} className={`flex items-center gap-3 transition-colors duration-300 ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Loader className={`w-5 h-5 ${isActive ? 'animate-spin' : ''}`} />
                                )}
                                <span>{step}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
