'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import { mockAnalyses } from '@/lib/mock-data';
import Image from 'next/image';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface FormTemplateLibraryProps {
    onSelectTemplate: (analysis: any) => void;
}

export default function FormTemplateLibrary({ onSelectTemplate }: FormTemplateLibraryProps) {
    const { toast } = useToast();

    const handleSelect = (id: string) => {
        const analysis = mockAnalyses[id as keyof typeof mockAnalyses];
        if (analysis) {
             toast({
                title: 'Feature In Progress',
                description: 'Viewing pre-analyzed templates is coming soon!',
            });
            // onSelectTemplate(analysis);
        }
    };
    
    return (
        <div className="mt-16 md:mt-24">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">
                    Or, explore a common form
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    See how Sahaj AI works with these pre-analyzed popular government forms.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {placeholderImages.map((image, index) => (
                    <Card key={image.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300" style={{'--reveal-delay': `${index*150}ms`} as React.CSSProperties}>
                        <CardHeader>
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                width={600}
                                height={400}
                                className="w-full h-48 object-cover rounded-t-lg"
                                data-ai-hint={image.imageHint}
                            />
                        </CardHeader>
                        <CardContent>
                            <CardTitle>{image.description}</CardTitle>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="secondary" onClick={() => handleSelect(image.id)}>
                                View Simplified Guide
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
