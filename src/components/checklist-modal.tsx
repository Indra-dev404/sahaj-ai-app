'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Printer } from 'lucide-react';

interface ChecklistModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    actions: string[];
}

export default function ChecklistModal({ isOpen, onOpenChange, actions }: ChecklistModalProps) {
    const handlePrint = () => {
        const printContent = document.getElementById('printable-checklist');
        if (printContent) {
            const newWindow = window.open('', '', 'height=500,width=500');
            if (newWindow) {
                newWindow.document.write('<html><head><title>Sahaj AI - Checklist</title>');
                newWindow.document.write('<style>body{font-family:sans-serif;} li{margin-bottom: 8px;}</style>');
                newWindow.document.write('</head><body>');
                newWindow.document.write(printContent.innerHTML);
                newWindow.document.write('</body></html>');
                newWindow.document.close();
                newWindow.print();
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Your Action Checklist</DialogTitle>
                    <DialogDescription>
                        Here's a simple checklist of actions required for your document.
                    </DialogDescription>
                </DialogHeader>
                <div id="printable-checklist" className="py-4">
                    <ul className="space-y-4">
                        {actions.map((action, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <Checkbox id={`action-${index}`} />
                                <label htmlFor={`action-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {action}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <DialogFooter>
                    <Button onClick={handlePrint}><Printer className="mr-2" /> Print</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
