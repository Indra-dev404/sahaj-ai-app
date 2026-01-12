'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Languages as LanguageIcon } from 'lucide-react';
import { Language, LANGUAGES } from '@/lib/types';

interface LanguageSwitcherProps {
    onLanguageChange: (language: Language) => void;
    isButton?: boolean;
}

export default function LanguageSwitcher({ onLanguageChange, isButton=true }: LanguageSwitcherProps) {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>('EN');

    const handleValueChange = (value: string) => {
        const lang = value as Language;
        setSelectedLanguage(lang);
        onLanguageChange(lang);
    };

    if (isButton) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline"><LanguageIcon className="mr-2" /> {LANGUAGES.find(l => l.code === selectedLanguage)?.name}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup value={selectedLanguage} onValueChange={handleValueChange}>
                        {LANGUAGES.map(lang => (
                            <DropdownMenuRadioItem key={lang.code} value={lang.code}>{lang.name}</DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
    
    return (
        <Select value={selectedLanguage} onValueChange={handleValueChange}>
            <SelectTrigger>
                <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
                {LANGUAGES.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
