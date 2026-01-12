# Sahayogi

**Understand any government form, instantly.**

Sahayogi is a web application designed to demystify complex government paperwork. By leveraging the power of generative AI, Sahayogi analyzes uploaded government forms (PDFs or images) and provides a clear, simplified explanation in plain language. With support for multiple languages and optional voice narration, Sahayogi aims to make official documents accessible to everyone, regardless of language or literacy barriers.

## Key Features

- **AI-Powered Explanations**: Utilizes Google's Gemini models to analyze form content and generate easy-to-understand summaries.
- **Multi-Format Support**: Upload your forms as PDF, PNG, JPG, or WEBP files.
- **Multilingual Explanations**: Get explanations in English, Bengali, or Hindi.
- **Voice Narration**: Listen to an audio version of the explanation for enhanced accessibility.
- **Simple & Secure**: An intuitive drag-and-drop interface ensures ease of use. Your documents are processed securely and are not stored.
- **No Login Required**: Access all features instantly without the need to create an account.
- **Responsive Design**: A clean, mobile-friendly interface that works on any device.

## Tech Stack

This project is built with a modern, type-safe, and performant technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI/Generative**: [Genkit](https://firebase.google.com/docs/genkit) with the Google AI plugin (Gemini)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

To run this project locally, you will need to have Node.js and npm installed.

### 1. Set up Environment Variables

Create a `.env` file in the root of the project and add your Google AI API key:

```
GEMINI_API_KEY=your_api_key_here
```

### 2. Install Dependencies

Install the necessary packages using npm:

```bash
npm install
```

### 3. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).
