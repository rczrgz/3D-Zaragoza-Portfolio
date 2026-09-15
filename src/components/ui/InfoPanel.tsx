import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X,
  RotateCcw,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  Globe,
  ShoppingBag,
  FolderGit2,
  Cpu,
  Briefcase,
  GraduationCap,
  Radio,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { DISTRICTS } from '../../data/districts';
import { projectsData } from '../../data/projects';
import { skillCategoriesData } from '../../data/skills';
import { experienceData, educationData } from '../../data/experience';
import { DistrictId, Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { soundManager } from '../../utils/sound';

interface InfoPanelProps {
  districtId: DistrictId;
  activeProject: Project | null;
  onClose: () => void;
  onSelectDistrict: (id: DistrictId) => void;
  onSelectProject: (project: Project | null) => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
  districtId,
  activeProject,
  onClose,
  onSelectDistrict,
  onSelectProject,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [projectFilter, setProjectFilter] = useState<string>('All');

  const district = DISTRICTS[districtId] || DISTRICTS.home;

  const whnProject = projectsData.find((p) => p.id === 'wonderhome-naturals') || projectsData[0];
  const picpaProject = projectsData.find((p) => p.id === 'picpa-ireland') || projectsData[1];
  const loveToDreamProject = projectsData.find((p) => p.id === 'lovetodream') || projectsData[2];
  const kidsAndBabyProject = projectsData.find((p) => p.id === 'kids-and-baby') || projectsData[3];
  const mamasAndPapasProject = projectsData.find((p) => p.id === 'mamas-and-papas') || projectsData[4];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('eric.zaragoza27@gmail.com');
    setCopiedEmail(true);
    soundManager.playSelect();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // Confetti fallback
    }
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const filteredProjects =
    projectFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === projectFilter);

  return (
    <AnimatePresence>
      {/* Click-away backdrop overlay that closes the modal */}
      <motion.div
        key="info-panel-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          e.stopPropagation();
          soundManager.playClose();
          onClose();
        }}
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[140] pointer-events-auto cursor-pointer"
      />

      <motion.div
        key="info-panel-content"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="fixed inset-y-0 right-0 w-full sm:w-[560px] md:w-[640px] z-[150] pt-16 sm:pt-4 p-3 sm:p-6 pointer-events-none flex flex-col justify-end sm:justify-center"
      >
        <div className="pointer-events-auto max-h-[88vh] flex flex-col bg-slate-900/95 text-slate-100 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl shadow-black/80 overflow-hidden relative z-[150]">
          {/* Panel Top Header Bar */}
          <div
            className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${district.color}28 0%, rgba(15, 23, 42, 0.95) 100%)`,
            }}
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-40"
              style={{ backgroundColor: district.color }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: district.color }}
                />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {district.subtitle}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {activeProject ? activeProject.name : district.title}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-emerald-400 mt-0.5">
                {activeProject ? activeProject.subtitle : district.tagline}
              </p>
            </div>

            {/* Action Buttons: Prominent X Close Button */}
            <div className="flex items-center gap-1.5 relative z-50 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.playClose();
                  onClose();
                }}
                className="w-10 h-10 rounded-2xl bg-white/15 hover:bg-rose-600 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
                title="Close (Shortcut: Esc)"
                aria-label="Close"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Panel Scrollable Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-sm text-slate-300">
            {/* Case: Specific Project Drilldown */}
            {activeProject ? (
              <div className="space-y-5">
                <button
                  onClick={() => onSelectProject(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  <span>Back to all projects</span>
                </button>
                <ProjectCard project={activeProject} isDetailed />
              </div>
            ) : null}

            {/* Case 1: WordPress District */}
            {!activeProject && districtId === 'wordpress' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">WordPress &amp; WooCommerce Development</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    I build, customize, and maintain robust WordPress portals and WooCommerce e-commerce platforms. From bespoke PHP plugins and membership directories to high-converting swaddle and baby apparel stores with localized payment gateways.
                  </p>
                </div>

                <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/10">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Technologies &amp; Core Services
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      'WordPress Theme Architecture',
                      'WooCommerce E-Commerce',
                      'Custom PHP Plugins Development',
                      'Elementor Pro Engineering',
                      'Membership Portals & CPD Sync',
                      'Payment Gateways (GCash, Maya)',
                      'Speed & Core Web Vitals',
                      'Ongoing Security & Maintenance',
                    ].map((tech) => (
                      <div key={tech} className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Featured WordPress Client Work
                  </h4>
                  <div className="space-y-4">
                    <ProjectCard
                      project={whnProject}
                      onSelect={() => onSelectProject(whnProject)}
                    />
                    <ProjectCard
                      project={picpaProject}
                      onSelect={() => onSelectProject(picpaProject)}
                    />
                    <ProjectCard
                      project={loveToDreamProject}
                      onSelect={() => onSelectProject(loveToDreamProject)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      soundManager.playSelect();
                      onSelectDistrict('projects');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-lg cursor-pointer"
                  >
                    <FolderGit2 className="w-4 h-4" />
                    <span>View All Projects</span>
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClose();
                      onClose();
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-white/10 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Case 2: Shopify District */}
            {!activeProject && districtId === 'shopify' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">Shopify E-Commerce Development</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Engineering conversion-focused Shopify experiences for leading baby and nursery brands. From bespoke Liquid template sections and dynamic cart drawer upsells to localized Philippine payment gateways and high-speed catalog performance.
                  </p>
                </div>

                <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/10">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Shopify Expertise &amp; Deliverables
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      'Custom Shopify Liquid Themes',
                      'Kids & Baby Storefronts',
                      'Luxury Lifestyle Branding',
                      'Dynamic AJAX Cart Drawers',
                      'Multi-Attribute Catalog Filters',
                      'Speed Audits & Mobile Tuning',
                      'Payment & Shipping Integrations',
                      'Store Maintenance & Retainers',
                    ].map((tech) => (
                      <div key={tech} className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Featured Shopify Client Stores
                  </h4>
                  <div className="space-y-4">
                    <ProjectCard
                      project={kidsAndBabyProject}
                      onSelect={() => onSelectProject(kidsAndBabyProject)}
                    />
                    <ProjectCard
                      project={mamasAndPapasProject}
                      onSelect={() => onSelectProject(mamasAndPapasProject)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      soundManager.playSelect();
                      onSelectDistrict('projects');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-lg cursor-pointer"
                  >
                    <FolderGit2 className="w-4 h-4" />
                    <span>View Projects</span>
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playClose();
                      onClose();
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-white/10 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Case 3: Projects District */}
            {!activeProject && districtId === 'projects' && (
              <div className="space-y-5">
                {/* Category Filters */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['All', 'WordPress', 'Shopify', 'Frontend', 'Mobile'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProjectFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        projectFilter === cat
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Projects List */}
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onSelect={() => onSelectProject(project)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Case 4: Experience Monument */}
            {!activeProject && districtId === 'experience' && (
              <div className="space-y-6">
                <p className="text-sm text-slate-300 leading-relaxed">
                  A track record of engineering scalable websites, custom client plugins, and robust digital solutions. 
                </p>

                <div className="space-y-4 relative border-l-2 border-amber-500/30 pl-4 ml-2">
                  {experienceData.map((item) => (
                    <div key={item.id} className="relative group">
                      {/* Timeline Node */}
                      <span className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-slate-900" />

                      <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/10 hover:border-amber-500/40 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4 className="text-base font-bold text-white">{item.role}</h4>
                          <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full w-fit">
                            {item.period}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium mb-3">
                          {item.company} &bull; {item.location} &bull; {item.type}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                          {item.description}
                        </p>

                        <ul className="space-y-1 mb-3">
                          {item.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1">
                          {item.technologies.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-medium bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded-md"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Case 5: Education Academy */}
            {!activeProject && districtId === 'education' && (
              <div className="space-y-5">
                <div className="bg-rose-950/40 border border-rose-800/50 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4 text-amber-400" />
                      <span>Academic Background</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      PUP Maroon &amp; Gold
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white mb-1">
                    {educationData.degree}
                  </h3>
                  <p className="text-xs font-semibold text-rose-200 mb-2">
                    {educationData.institution} &bull; {educationData.period}
                  </p>
                  {educationData.honors && (
                    <span className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                      🎓 {educationData.honors}
                    </span>
                  )}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {educationData.description}
                  </p>
                </div>

                <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/10">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                    Academic Highlights &amp; Specializations
                  </h4>
                  <ul className="space-y-2">
                    {educationData.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Case 6: Skills Hub */}
            {!activeProject && districtId === 'skills' && (
              <div className="space-y-5">
                <p className="text-sm text-slate-300 leading-relaxed">
                  My technical skillset structured across Frontend, Backend, CMS / E-Commerce, Mobile development, Databases, and SEO.
                </p>

                <div className="space-y-4">
                  {skillCategoriesData.map((cat) => (
                    <div
                      key={cat.id}
                      className="bg-slate-800/50 rounded-2xl p-4 border border-white/10"
                    >
                      <h4 className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>{cat.title}</span>
                      </h4>

                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((s) => (
                          <span
                            key={s.name}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                              s.highlight
                                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                                : 'bg-slate-700/50 text-slate-300 border border-white/5'
                            }`}
                          >
                            <span>{s.name}</span>
                            <span className="text-[10px] opacity-60 font-mono">
                              ({s.level})
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Case 7: Contact Beacon */}
            {!activeProject && districtId === 'contact' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white mb-2">
                    Get in Touch with Eric Zaragoza
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    I am available for freelance contracts, full-time engineering roles, and custom WordPress / Shopify storefront builds. Feel free to connect directly via email or social networks.
                  </p>
                </div>

                {/* Email Direct Channel Card */}
                <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold">Direct Email</div>
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=eric.zaragoza27@gmail.com&su=Inquiry%20from%20Portfolio&body=Hi%20Eric,%0A%0AI%20explored%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-white hover:text-teal-300 transition-colors inline-flex items-center gap-1.5"
                        title="Open in Gmail (eric.zaragoza27@gmail.com)"
                      >
                        <span>eric.zaragoza27@gmail.com</span>
                        <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Social & Code Profiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="https://github.com/rczrgz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 text-white border border-white/10 hover:border-slate-500 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Github className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Open Source &amp; Repos</div>
                      <div className="text-sm font-bold flex items-center gap-1">
                        github.com/rczrgz
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/eric-zaragoza-7408a6252/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 text-white border border-white/10 hover:border-blue-500/40 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Professional Network</div>
                      <div className="text-sm font-bold flex items-center gap-1">
                        Eric Zaragoza LinkedIn
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  </a>
                </div>

                {/* Quick Message Helper Box */}
                <div className="bg-slate-800/50 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Start a Project Conversation
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Need a custom WordPress theme, high-converting Shopify storefront, or full-stack web application? Send an inquiry directly to <strong className="text-teal-300">eric.zaragoza27@gmail.com</strong>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=eric.zaragoza27@gmail.com&su=Inquiry%20for%20Eric%20Zaragoza&body=Hi%20Eric,%0A%0AI%20explored%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-900/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Gmail</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>

                    <a
                      href="mailto:eric.zaragoza27@gmail.com?subject=Inquiry%20for%20Eric%20Zaragoza&body=Hi%20Eric,%0D%0A%0D%0AI%20explored%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project."
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      title="Open with your default system email client"
                    >
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span>Default Mail App</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panel Bottom Footer Bar */}
          <div className="p-4 bg-slate-950/60 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => {
                soundManager.playSelect();
                onClose();
              }}
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to World Overview</span>
            </button>
            <span className="font-mono text-[11px] text-slate-500">
              Press Esc or R to reset
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
