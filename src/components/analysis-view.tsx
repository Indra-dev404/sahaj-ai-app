'use client';
import type { AnalysisResult, Language } from '@/lib/types';
import { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Expand, ListChecks, MapPin, Save, Shrink, BookMarked, Loader2 } from 'lucide-react';
import LanguageSwitcher from './language-switcher';
import { Badge } from './ui/badge';
import ChecklistModal from './checklist-modal';
import ChatWidget from './chat-widget';
import { locateNearbyGovernmentOffices } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

interface AnalysisViewProps {
    result: AnalysisResult;
    onReset: () => void;
    onLanguageChange: (language: Language) => Promise<void>;
}

export default function AnalysisView({ result, onReset, onLanguageChange }: AnalysisViewProps) {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isChecklistOpen, setIsChecklistOpen] = useState(false);
    const [locatedOffices, setLocatedOffices] = useState<string[] | null>(null);
    const [isLocating, setIsLocating] = useState(false);
    const { toast } = useToast();

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    const handleLocateHelp = useCallback(() => {
        setIsLocating(true);
        setLocatedOffices(null);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await locateNearbyGovernmentOffices({
                        formType: "Government Document", // Generic formType as workaround
                        userLocation: { latitude, longitude },
                    });
                    setLocatedOffices(response.officeLocations);
                } catch (error) {
                    toast({
                        variant: "destructive",
                        title: "Could not find offices",
                        description: "An error occurred while trying to locate nearby offices.",
                    });
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                toast({
                    variant: "destructive",
                    title: "Geolocation failed",
                    description: "Please enable location services in your browser.",
                });
                setIsLocating(false);
            }
        );
    }, [toast]);
    
    const analysisContext = useMemo(() => JSON.stringify(result), [result]);

    return (
        <div className="container mx-auto p-4 animate-reveal">
            <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <Button variant="outline" onClick={onReset}><ArrowLeft className="mr-2" /> Back</Button>
                <div className="flex items-center gap-2">
                    <LanguageSwitcher onLanguageChange={onLanguageChange} />
                    <Button variant="ghost" size="icon" onClick={toggleFullScreen} aria-label="Toggle Fullscreen">
                        {isFullScreen ? <Shrink /> : <Expand />}
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Clause-by-Clause Breakdown</CardTitle></CardHeader>
                        <CardContent>
                            <Accordion type="multiple" className="w-full">
                                {result.originalTerms.map((term, index) => (
                                    <AccordionItem value={`item-${index}`} key={index}>
                                        <AccordionTrigger className="text-left text-base">{term}</AccordionTrigger>
                                        <AccordionContent className="text-base text-muted-foreground">
                                            {result.simplifiedExplanations[index]}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <div className="space-y-6 sticky top-24">
                        <Card>
                            <CardHeader><CardTitle>Required Actions</CardTitle></CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {result.requiredActions.map((action, index) => (
                                        <Badge key={index} variant="secondary" className="text-sm">{action}</Badge>
                                    ))}
                                </div>
                                <Button onClick={() => setIsChecklistOpen(true)} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    <ListChecks className="mr-2" /> Generate Checklist
                                </Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Verified Resources</CardTitle></CardHeader>
                            <CardContent>
                                {locatedOffices ? (
                                    <div className="space-y-2">
                                        <h3 className="font-semibold">Nearby Offices:</h3>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                                            {locatedOffices.map((office, index) => <li key={index}>{office}</li>)}
                                        </ul>
                                    </div>
                                ) : (
                                    <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                                        {result.verifiedResources.map((resource, index) => (
                                            <li key={index}><a href={resource} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{resource}</a></li>
                                        ))}
                                    </ul>
                                )}
                                <Button onClick={handleLocateHelp} className="w-full mt-4" disabled={isLocating}>
                                    {isLocating ? <Loader2 className="mr-2 animate-spin" /> : <MapPin className="mr-2" />}
                                    {isLocating ? "Locating..." : "Locate Nearby Centers"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            
            <ChecklistModal isOpen={isChecklistOpen} onOpenChange={setIsChecklistOpen} actions={result.requiredActions} />
            <ChatWidget analysisContext={analysisContext} />
        </div>
    );
}
