# RightRoute - Base Mini App

Your Pocket Guide to Knowing Your Rights - A mobile-first app providing instant, simplified legal information and scripts for individuals facing interactions with law enforcement.

## Features

- **On-Demand Rights Cards**: Mobile-optimized guides with state-specific legal information
- **Interactive Scripts**: AI-generated "what to say" and "what not to say" scripts
- **Quick Record Button**: Audio recording functionality for documenting interactions
- **Shareable Digital Cards**: Generate and share rights information with your network
- **Base Integration**: Built as a Base Mini App with OnchainKit integration
- **Multilingual Support**: Available in English and Spanish

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Styling**: Tailwind CSS with custom design system
- **AI**: OpenAI/OpenRouter for script generation
- **TypeScript**: Full type safety throughout

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `OPENAI_API_KEY` or `OPENROUTER_API_KEY`: For AI script generation

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Architecture

### Components
- `MobileNavBar`: Navigation with hamburger menu
- `InfoCard`: Reusable card component with variants
- `ActionFAB`: Floating action button
- `ScriptGenerator`: AI-powered script generation
- `RecordButton`: Audio recording functionality
- `ShareButton`: Social sharing capabilities

### Design System
- **Colors**: Purple gradient theme with accent colors
- **Typography**: Clean, readable fonts optimized for mobile
- **Spacing**: Consistent spacing scale (xs: 4px, sm: 8px, md: 12px, lg: 20px, xl: 32px)
- **Motion**: Smooth transitions with 200ms duration

## Legal Notice

This app provides general legal information and should not be considered legal advice. Laws vary by jurisdiction. Users should consult with qualified legal professionals for specific legal matters.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
