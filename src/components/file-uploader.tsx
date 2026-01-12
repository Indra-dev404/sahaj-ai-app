'use client';
import { useState, useCallback, useRef } from 'react';
import { Upload, Camera, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/types';
import LanguageSwitcher from './language-switcher';

interface FileUploaderProps {
    onFileSelect: (file: File, language: Language) => void;
}

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [language, setLanguage] = useState<Language>('EN');
    const inputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFile = useCallback((file: File | null) => {
        if (file) {
            if (!['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid File Type',
                    description: 'Please upload a PDF or an image file (JPEG, PNG, WEBP).',
                });
                return;
            }
            setSelectedFile(file);
        }
    }, [toast]);

    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, [handleFile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (selectedFile) {
            onFileSelect(selectedFile, language);
        } else {
            toast({
                title: 'No file selected',
                description: 'Please select a file to analyze.',
            });
        }
    };

    return (
        <Card className="shadow-xl">
            <CardHeader className="text-center">
                <CardTitle>Start Here</CardTitle>
                <CardDescription>Choose your language and upload a document.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <LanguageSwitcher onLanguageChange={setLanguage} isButton={false} />
                 </div>
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                        "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                        dragActive ? "border-primary bg-accent" : "border-border hover:border-primary/50"
                    )}
                    onClick={() => inputRef.current?.click()}
                >
                    <input ref={inputRef} type="file" className="hidden" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={handleChange} />
                    {selectedFile ? (
                        <div className="text-center p-4">
                            <FileText className="w-12 h-12 mx-auto mb-2 text-primary" />
                            <p className="font-semibold truncate">{selectedFile.name}</p>
                            <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full" onClick={() => toast({ title: "Coming Soon!", description: "Live camera scan will be available in a future update."})}>
                        <Camera className="mr-2 h-4 w-4" /> Live Camera Scan
                    </Button>
                     <Button onClick={handleSubmit} className="w-full bg-gradient-primary text-primary-foreground font-bold active:scale-95 transition-transform">
                        Analyze Document
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// Dummy Card components for structure. You might need to import them from ui/card if not already.
const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("rounded-lg border bg-card text-card-foreground", className)} {...props} />;
const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <h3 className={cn("font-semibold leading-none tracking-tight", className)} {...props} />;
const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("p-6 pt-0", className)} {...props} />;
const Label = ({ className, ...props }: React.HTMLAttributes<HTMLLabelElement>) => <label className={cn("text-sm font-medium leading-none", className)} {...props} />;
