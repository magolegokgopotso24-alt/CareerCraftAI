import { useState } from 'react';
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import type { PageRoute } from '../types';

const navItems: { label: string; route: PageRoute }[] = [
  { label: 'Dashboard', route: 'dashboard' },
  { label: 'Build Resume', route: 'builder' },
  { label: 'AI Assistant', route: 'assistant' },
  { label: 'ATS Optimizer', route: 'ats' },
];

const moreItems: { label: string; route: PageRoute }[] = [
  { label: 'Templates', route: 'templates' },
  { label: 'Prompt Strategy', route: 'prompt-strategy' },
  { label: 'Productivity', route: 'productivity' },
  { label: 'Responsible AI', route: 'responsible-ai' },
  { label: 'About', route: 'about' },
];

export function Logo({ light = false }: { light?: boolean }) {
  const { navigate } = useRouter();
  return (
    <button
      onClick={() => navigate('home')}
      className="flex items-center gap-2.5 group"
      aria-label="CareerCraft AI home"
    >
      <span className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-soft group-hover:bg-brand-700 transition-colors">
        <Sparkles size={18} strokeWidth={2.5} />
      </span>
      <span className={`font-display text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
        CareerCraft <span className={light ? 'text-brand-200' : 'text-brand-600'}>AI</span>
      </span>
    </button>
  );
}

export function Navbar() {
  const { route, navigate } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const go = (r: PageRoute) => {
    navigate(r);
    setMobileOpen(false);
    setMoreOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="section-container h-[72px] flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => go(item.route)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                route === item.route
                  ? 'text-brand-700 bg-brand-50'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((open) => !open)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                moreItems.some((item) => item.route === route)
                  ? 'text-brand-700 bg-brand-50'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              aria-expanded={moreOpen}
            >
              Explore <ChevronDown size={14} className={moreOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-slate-100 shadow-elevated p-1.5 animate-scale-in">
                {moreItems.map((item) => (
                  <button
                    key={item.route}
                    onClick={() => go(item.route)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <span className="badge bg-brand-50 text-brand-700"><Sparkles size={12} /> Demo Mode</span>
          <button onClick={() => go('builder')} className="btn-primary text-sm px-4 py-2">
            Build My Resume <ArrowRight size={15} />
          </button>
        </div>

        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="lg:hidden btn-ghost p-2"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white p-4 animate-slide-in">
          <nav className="flex flex-col gap-1">
            {[...navItems, ...moreItems].map((item) => (
              <button
                key={item.route}
                onClick={() => go(item.route)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium ${route === item.route ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button onClick={() => go('builder')} className="btn-primary w-full mt-3">
            Build My Resume <ArrowRight size={16} />
          </button>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { navigate } = useRouter();
  return (
    <footer className="bg-slate-950 text-slate-400 mt-20">
      <div className="section-container py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Build a stronger resume. Get closer to your next opportunity. AI-powered guidance that keeps you in control.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="badge bg-slate-800 text-slate-300"><Check size={12} /> Human-controlled AI</span>
              <span className="badge bg-slate-800 text-slate-300"><FileText size={12} /> ATS-aware</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <div className="mt-4 space-y-3 text-sm">
              <button onClick={() => navigate('builder')} className="block hover:text-white transition-colors">Build Resume</button>
              <button onClick={() => navigate('assistant')} className="block hover:text-white transition-colors">AI Assistant</button>
              <button onClick={() => navigate('ats')} className="block hover:text-white transition-colors">ATS Optimizer</button>
              <button onClick={() => navigate('templates')} className="block hover:text-white transition-colors">Templates</button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Learn</h3>
            <div className="mt-4 space-y-3 text-sm">
              <button onClick={() => navigate('prompt-strategy')} className="block hover:text-white transition-colors">Prompt Strategy</button>
              <button onClick={() => navigate('responsible-ai')} className="block hover:text-white transition-colors">Responsible AI</button>
              <button onClick={() => navigate('productivity')} className="block hover:text-white transition-colors">Productivity</button>
              <button onClick={() => navigate('about')} className="block hover:text-white transition-colors">About</button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-3 text-xs">
          <span>© 2025 CareerCraft AI. Built for authentic career growth.</span>
          <span className="flex items-center gap-1"><Bot size={13} /> Demo AI Mode — suggestions are not verified facts.</span>
        </div>
      </div>
    </footer>
  );
}

export { BriefcaseBusiness, LayoutDashboard };
