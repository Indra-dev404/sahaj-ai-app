'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CornerDownLeft, Mic, Send, Bot, User, Volume2, X, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useSpeechRecognition } from '@/hooks/use-speech-recognition';
import { getChatResponse } from '@/lib/actions';
import { Language, LANGUAGES } from '@/lib/types';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type Message = {
    role: 'user' | 'bot';
    text: string;
};

interface ChatWidgetProps {
    analysisContext: string;
}

export default function ChatWidget({ analysisContext }: ChatWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState<Language>('EN');
    const [autoSpeak, setAutoSpeak] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const currentAudio = useRef<HTMLAudioElement | null>(null);

    const { isListening, transcript, startListening, stopListening } = useSpeechRecognition({
        onResult: (result) => setInputValue(result),
        lang: currentLanguage.toLowerCase(),
    });

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim()) return;
        
        const userMessage: Message = { role: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const result = await getChatResponse({
                query: messageText,
                language: currentLanguage,
                formAnalysis: analysisContext,
            });

            const botMessage: Message = { role: 'bot', text: result.responseText };
            setMessages(prev => [...prev, botMessage]);

            if (autoSpeak && result.responseAudio) {
                playAudio(result.responseAudio);
            }
        } catch (error) {
            const errorMessage: Message = { role: 'bot', text: "Sorry, I couldn't process that. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const playAudio = (audioDataUri: string) => {
        if (currentAudio.current) {
            currentAudio.current.pause();
        }
        const audio = new Audio(audioDataUri);
        currentAudio.current = audio;
        audio.play();
    };


    useEffect(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [messages]);

    const handleMicClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground shadow-lg hover:scale-110 active:scale-95 transition-transform"
                    aria-label="Open chat"
                >
                    <Bot className="w-8 h-8" />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="end" className="w-[calc(100vw-2rem)] sm:w-96 h-[60vh] p-0 flex flex-col mr-4 mb-2">
                <header className="flex items-center justify-between p-3 border-b">
                    <h3 className="font-semibold text-gradient-primary">Sahaj Assistant</h3>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="auto-speak">Auto-Speak</Label>
                      <Switch id="auto-speak" checked={autoSpeak} onCheckedChange={setAutoSpeak} />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X className="w-4 h-4"/></Button>
                </header>
                <ScrollArea className="flex-1" ref={scrollAreaRef}>
                    <div className="p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div key={index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : '')}>
                                {message.role === 'bot' && <Bot className="w-6 h-6 shrink-0 text-primary" />}
                                <div className={cn('p-3 rounded-lg max-w-[80%]', message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                    <p className="text-sm">{message.text}</p>
                                </div>
                                {message.role === 'user' && <User className="w-6 h-6 shrink-0" />}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3">
                                <Bot className="w-6 h-6 shrink-0 text-primary" />
                                <div className="p-3 rounded-lg bg-muted"><Loader2 className="w-5 h-5 animate-spin" /></div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="p-3 border-t bg-background">
                    <div className="relative">
                        <Textarea
                            placeholder={isListening ? 'Listening...' : 'Ask a question...'}
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(inputValue);
                                }
                            }}
                            className="pr-20"
                        />
                        <div className="absolute top-1/2 right-2 -translate-y-1/2 flex gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleMicClick}
                                className={cn(isListening && 'text-red-500 animate-pulse-red')}
                                aria-label={isListening ? 'Stop listening' : 'Start listening'}
                            >
                                <Mic className="w-5 h-5" />
                            </Button>
                            <Button size="icon" onClick={() => handleSendMessage(inputValue)} disabled={isLoading} aria-label="Send message">
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
