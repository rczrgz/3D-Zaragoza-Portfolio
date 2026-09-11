import React, { useState } from 'react';
import {
  Globe,
  ShoppingBag,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Compass,
  CheckCircle2,
  Copy,
  Check,
  Tag,
  Sparkles,
  ArrowUpRight,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { projectsData } from '../../data/projects';
import { skillCategoriesData } from '../../data/skills';
import { experienceData, educationData } from '../../data/experience';
import { ProjectCard } from './ProjectCard';
import { soundManager } from '../../utils/sound';

interface ClassicPortfolioProps {
  onBackTo3D: () => void;
}

export const ClassicPortfolio: React.FC<ClassicPortfolioProps> = ({ onBackTo3D }) => {
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('eric.zaragoza27@gmail.com');
    setCopied(true);
    soundManager.playSelect();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // Confetti fallback
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 overflow-y-auto selection:bg-emerald-500 selection:text-white">
      {/* Top Banner Bar */}
      <div className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 py-3 sm:px-8 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-sm text-white shadow">
            EZ
          </div>
          <div>
            <h2 className="font-extrabold text-sm sm:text-base leading-tight">
              Eric Zaragoza
            </h2>
            <p className="text-xs text-emerald-400 font-medium">
              Web Developer &bull; Classic Portfolio View
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playSelect();
            onBackTo3D();
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Switch to 3D World</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        {/* Section 1: Hero & Introduction */}
        <section className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/60 to-slate-950 p-6 sm:p-10 border border-white/10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Web Development &amp; E-Commerce
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Building websites, digital experiences, and practical solutions.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
              I am Eric Zaragoza, a Web Developer specializing in WordPress, WooCommerce, Shopify, JavaScript, TypeScript, PHP, React, and modern web architectures.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
              </button>
              <a
                href="mailto:eric.zaragoza27@gmail.com"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-white/10 transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Send Message</span>
              </a>
              <a
                href="https://github.com/ericzaragoza"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-white/10 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/ericzaragoza"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-white/10 transition-all cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        {/* Section 2: WordPress & Shopify Expertise */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-sky-500/20 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">WordPress &amp; WooCommerce</h3>
                <p className="text-xs text-sky-400 font-medium">Custom Plugins &amp; Architecture</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Comprehensive experience building bespoke WordPress themes, complex membership directories, custom PHP extensions, and optimizing WooCommerce checkouts.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['WordPress', 'WooCommerce', 'PHP', 'Custom Plugins', 'Elementor', 'MySQL', 'SEO'].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-sky-950/60 text-sky-300 border border-sky-800/40 text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-emerald-500/20 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Shopify Development</h3>
                <p className="text-xs text-emerald-400 font-medium">Liquid Themes &amp; E-Commerce</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Designing and coding high-converting Shopify storefronts with custom Liquid sections, responsive product pages, app integrations, and fast page load speeds.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Shopify', 'Liquid', 'HTML5', 'CSS3', 'JavaScript', 'Store Maintenance', 'UX Audits'].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Featured Projects */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                Selected Works
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Featured Projects
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['All', 'WordPress', 'Shopify', 'Frontend', 'Mobile'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isDetailed />
            ))}
          </div>
        </section>

        {/* Section 4: Skills Matrix */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">
              Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Technical Skillset
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCategoriesData.map((category) => (
              <div
                key={category.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3"
              >
                <h3 className="text-sm font-bold text-pink-400 uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>{category.title}</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        skill.highlight
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Experience & Education */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Career Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Professional Experience
              </h2>
            </div>

            <div className="space-y-4 relative border-l-2 border-amber-500/30 pl-4 ml-2">
              {experienceData.map((item) => (
                <div key={item.id} className="relative">
                  <span className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-slate-950" />
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-white">{item.role}</h3>
                      <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full w-fit">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">
                      {item.company} &bull; {item.location}
                    </p>
                    <p className="text-sm text-slate-300">{item.description}</p>
                    <ul className="space-y-1 pt-1">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                Academic Background
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Education</h2>
            </div>

            <div className="p-6 rounded-2xl bg-rose-950/25 border border-rose-800/40 space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-rose-900/40 border border-rose-700/50 text-amber-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                {educationData.degree}
              </h3>
              <p className="text-xs text-rose-200 font-semibold">
                {educationData.institution} &bull; {educationData.period}
              </p>
              {educationData.honors && (
                <div className="text-xs font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 w-fit">
                  🎓 {educationData.honors}
                </div>
              )}
              <p className="text-sm text-slate-300 leading-relaxed">
                {educationData.description}
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Contact */}
        <section className="rounded-3xl bg-gradient-to-r from-teal-900/40 via-emerald-900/30 to-slate-900 p-8 border border-teal-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              Available For Opportunities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Ready to collaborate on your next project?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Whether you need a custom WordPress plugin, a high-converting Shopify store, or modern frontend engineering, let’s connect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="mailto:eric.zaragoza27@gmail.com"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Eric</span>
            </a>
            <button
              onClick={onBackTo3D}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-white/15 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Explore 3D World</span>
            </button>
          </div>
        </section>

        <footer className="text-center text-xs text-slate-500 py-6 border-t border-white/5">
          &copy; {new Date().getFullYear()} Eric Zaragoza &bull; Web Developer Portfolio &bull; Built with React, Three.js &amp; Tailwind CSS
        </footer>
      </div>
    </div>
  );
};
