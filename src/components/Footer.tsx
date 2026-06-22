import React from 'react';
import { Cpu } from 'lucide-react';
import { DeveloperProfile } from '../types';

interface FooterProps {
  profile: DeveloperProfile;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/95 py-8 text-center text-xs text-slate-500 space-y-3 px-4">
      <div className="flex items-center justify-center space-x-2 text-indigo-400 text-sm">
        <Cpu className="w-4 h-4" />
        <span className="font-display font-medium text-white">{profile.name} — Developer Portfolio Website</span>
      </div>
      <p className="max-w-md mx-auto leading-relaxed font-sans">
        Pioneering premium interactive applications, custom web interfaces, and high-performance frontend layout engines. Built using React, Tailwind CSS, TypeScript, and Node.js.
      </p>
      <div className="text-[10px] text-slate-600 font-mono">
        {profile.location} • {profile.email} • © 2026 {profile.name}
      </div>
    </footer>
  );
}
