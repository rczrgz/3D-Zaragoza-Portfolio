import React from 'react';
import { ExternalLink, Github, CheckCircle2, Tag, Figma } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onSelect?: () => void;
  isDetailed?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  isDetailed = false,
}) => {
  const hasActionLinks = Boolean(project.liveUrl || project.figmaUrl || project.githubUrl);

  return (
    <div
      onClick={onSelect}
      className={`rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between ${
        onSelect ? 'cursor-pointer hover:border-emerald-400/50 hover:bg-slate-800/60' : ''
      } bg-slate-800/40 border-white/10 backdrop-blur-sm`}
    >
      <div>
        {/* Category & Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: project.color }}
          >
            {project.category}
          </span>
          <span className="text-xs text-slate-400 font-medium">Role: {project.role}</span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-lg font-bold text-slate-100 tracking-tight mb-1">
          {project.name}
        </h3>
        <p className="text-xs font-semibold text-emerald-400 mb-2">
          {project.subtitle}
        </p>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Feature Highlights */}
        {project.features && project.features.length > 0 && (
          <div className="mb-4 space-y-1.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Key Capabilities:
            </h4>
            <ul className="space-y-1">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-200 text-xs font-medium border border-white/5"
            >
              <Tag className="w-2.5 h-2.5 text-slate-400" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links - Only shown if verified real URL exists */}
      {hasActionLinks && (
        <div className="flex items-center gap-2 pt-3 border-t border-white/10 mt-2">
          {project.figmaUrl && (
            <a
              href={project.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer hover:shadow-purple-500/20"
            >
              <Figma className="w-4 h-4" />
              <span>View Figma Prototype</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{project.category === 'Shopify' ? 'Visit Store' : 'Live Website'}</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-slate-100 text-xs font-semibold transition-all border border-white/10 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
