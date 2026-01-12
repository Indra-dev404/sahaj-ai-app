# **App Name**: Sahaj AI - Paperwork Decoder

## Core Features:

- Smart Document Intake: Dual-mode upload (PDF/Image & Live Camera Scan) with a multi-stage animated loading sequence.
- Simplified Guide Interface: Bilingual toggle, clause-by-clause comparison of 'Form Term' and 'Simple Term', actionable chips for required actions.
- Multilingual Voice-First Chat: Voice-to-text, auto-speak toggle with natural speech, dynamic language re-initialization for chat sessions.
- Map Grounding: Find Nearby Centers: Use Gemini and browser's Geolocation API tool to find the nearest relevant government offices.
- "Easy Checklist" Export: Convert the "Required Actions" from the analysis into a clean, printable TODO checklist.
- Form Template Library (Pre-Analysis): Curated list of popular forms to show a pre-loaded "Sahaj Guide" demo without uploads.
- AI-Powered Paperwork Analysis: Analyze uploaded documents using Google Gemini API ecosystem, extracting key information, simplifying complex terms, and providing actionable insights in multiple languages, grounded by search.

## Style Guidelines:

- Primary color: Indigo (#4f46e6) and Violet (#7c3aed) gradients for a premium gov-tech aesthetic.
- Background color: Light grey (#f7f7f7) for clean and modern design.
- Accent color: Teal (#008080) to highlight key actionable elements.
- Body and headline font: 'Inter' (sans-serif) for high-contrast, accessible typography. Note: currently only Google Fonts are supported.
- Use Glassmorphism with backdrop-filter: blur() for navigation and floating panels to create a modern and clean UI.
- Implement Staggered Reveals with CSS animations for analysis results and use Haptic Feedback (scale-95) on button clicks.
- Ensure ARIA labels for all icon-only buttons to maintain accessibility and a minimum 16px font size for explanations.