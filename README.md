# RightRoute - Your Pocket Guide to Knowing Your Rights

A mobile-first Base Mini App providing instant, simplified legal information and scripts for individuals facing interactions with law enforcement, accessible via Base Wallet MiniApps and usable on Farcaster.

## 🚀 Features

### Core Features
- **On-Demand Rights Cards**: Mobile-optimized guides detailing rights when stopped by law enforcement
- **Interactive Scripts**: Dynamically generated 'what to say' scripts in English and Spanish
- **Quick Record Button**: Prominent, accessible button to quickly start audio/video recording
- **Shareable Digital Cards**: Auto-generate shareable digital cards with key information

### Technical Features
- **AI-Powered Content**: OpenAI integration for dynamic script generation
- **Multilingual Support**: English and Spanish content
- **State-Specific Information**: Tailored content based on user location
- **Audio Recording**: Browser-based recording with save/download functionality
- **Social Sharing**: Farcaster and Twitter integration
- **Responsive Design**: Mobile-first, glass-morphism UI

## 🛠 Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **AI Integration**: OpenAI API for script generation
- **Blockchain**: Base network integration via OnchainKit
- **Storage**: Supabase for backend services
- **Recording**: Web Audio API with MediaRecorder
- **Sharing**: Native Web Share API with social platform fallbacks

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/af3781a5-fb59-4c1e-b72f-99025eedd446.git
   cd af3781a5-fb59-4c1e-b72f-99025eedd446
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required environment variables:
   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_BASE_URL=https://api.openai.com/v1

   # Supabase Configuration (optional)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Base Configuration
   NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── guides/        # Rights cards API
│   │   ├── recordings/    # Audio recording API
│   │   ├── scripts/       # Script generation API
│   │   └── share/         # Sharing API
│   ├── guides/            # Rights cards pages
│   ├── record/            # Recording page
│   ├── scripts/           # Script generator page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── InfoCard.tsx       # Rights card component
│   ├── RecordButton.tsx   # Recording functionality
│   ├── ScriptGenerator.tsx # AI script generation
│   └── ShareButton.tsx    # Social sharing
├── lib/                   # Utility libraries
│   ├── hooks/             # Custom React hooks
│   ├── constants.ts       # App constants
│   ├── openai.ts          # OpenAI integration
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 🔧 API Endpoints

### Scripts Generation
- `POST /api/scripts/generate` - Generate AI-powered legal scripts
  ```json
  {
    "scenario": "Traffic Stop",
    "state": "California",
    "language": "en"
  }
  ```

### Rights Guides
- `GET /api/guides` - Fetch rights cards
- `GET /api/guides?state=California&language=en` - Filter by state/language

### Recording Management
- `POST /api/recordings` - Save recording metadata
- `GET /api/recordings` - Fetch user recordings

### Sharing
- `POST /api/share` - Create shareable cards
  ```json
  {
    "title": "Traffic Stop Rights",
    "content": "Know your rights during traffic stops",
    "keyPoints": ["Stay calm", "Keep hands visible"],
    "state": "California",
    "language": "en",
    "type": "rights-card"
  }
  ```

## 🎨 Design System

### Colors
- **Background**: `hsl(210, 20%, 95%)`
- **Text**: `hsl(210, 15%, 15%)`
- **Accent**: `hsl(130, 70%, 40%)`
- **Primary**: `hsl(210, 80%, 30%)`
- **Surface**: `hsl(0, 0%, 100%)`

### Components
- **Glass Cards**: Backdrop blur with opacity
- **Interactive Buttons**: Hover states and animations
- **Mobile Navigation**: Touch-friendly interface
- **Responsive Grid**: 12-column fluid layout

## 🔒 Legal Considerations

### Recording Laws
- Recording laws vary by state and jurisdiction
- Some states require consent from all parties
- Users are advised to research local laws
- App includes legal disclaimers and warnings

### Content Accuracy
- AI-generated content is for informational purposes only
- Users should consult with legal professionals
- Content is regularly reviewed and updated
- State-specific variations are considered

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
OPENAI_API_KEY=your_production_openai_key
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_key
```

## 📱 Mobile Features

### PWA Support
- Installable as Progressive Web App
- Offline functionality for core features
- Push notifications for updates

### Touch Optimizations
- Large touch targets (44px minimum)
- Swipe gestures for navigation
- Haptic feedback where supported

## 🔐 Security

### Data Protection
- No sensitive data stored locally
- Recordings are user-controlled
- HTTPS enforced in production
- CSP headers implemented

### Privacy
- No tracking or analytics by default
- User consent for location services
- Clear privacy policy
- GDPR compliant

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- Check the [Issues](https://github.com/vistara-apps/af3781a5-fb59-4c1e-b72f-99025eedd446/issues) page
- Review the documentation
- Contact support team

### Reporting Issues
- Use the issue template
- Include browser and device information
- Provide steps to reproduce
- Include screenshots if applicable

## 🗺 Roadmap

### Phase 1 (Current)
- ✅ Core rights cards
- ✅ AI script generation
- ✅ Audio recording
- ✅ Social sharing

### Phase 2 (Planned)
- [ ] Video recording support
- [ ] Offline mode
- [ ] Push notifications
- [ ] Advanced sharing options

### Phase 3 (Future)
- [ ] Legal professional network
- [ ] Community features
- [ ] Advanced analytics
- [ ] Multi-language expansion

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Base team for blockchain infrastructure
- Farcaster community for social features
- Legal experts for content review
- Open source community for tools and libraries

---

**Disclaimer**: This app provides general legal information and should not be considered legal advice. Users should consult with qualified legal professionals for specific legal matters.

