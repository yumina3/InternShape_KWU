/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Project } from "./types";
import { INITIAL_PROJECTS } from "./data";

// Sub-screen components
import { DashboardScreen } from "./components/DashboardScreen";
import { ApplicationStatusScreen } from "./components/ApplicationStatusScreen";
import { ExploreScreen } from "./components/ExploreScreen";
import { MentorScreen } from "./components/MentorScreen";
import { MilestonesScreen } from "./components/MilestonesScreen";
import { CompletedProjectsScreen } from "./components/CompletedProjectsScreen";
import { LogoIcon } from "./components/LogoIcon";

// Icons imports
import { 
  LayoutDashboard,
  ClipboardList,
  Compass, 
  Users2, 
  FileCheck2, 
  Award, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Menu, 
  X, 
  Sparkles,
  PlayCircle
} from "lucide-react";

type ScreenId = "dashboard" | "application_status" | "explore" | "mentors" | "milestones" | "completed_projects";

interface NavigationItem {
  id: ScreenId;
  label: string;
  icon: React.ComponentType<any>;
  stepNumber: number;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard, stepNumber: 1 },
  { id: "application_status", label: "Status Lamaran", icon: ClipboardList, stepNumber: 2 },
  { id: "explore", label: "Project Exploration", icon: Compass, stepNumber: 3 },
  { id: "mentors", label: "Mentor Network", icon: Users2, stepNumber: 4 },
  { id: "milestones", label: "Milestones & Chat", icon: FileCheck2, stepNumber: 5 },
  { id: "completed_projects", label: "Proyek Selesai", icon: Award, stepNumber: 6 }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("dashboard");
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // User details
  const studentEmail = "yunamikanda06@students.unnes.ac.id";
  const studentName = "Yuna Mikanda";

  // Applied count calculator
  const appliedProjectsCount = projects.filter(p => p.applied).length;

  // Toggle favorite / starred
  const handleToggleStar = (id: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, starred: !p.starred };
      }
      return p;
    }));
  };

  // Set project applied state with automatic status determination
  const handleApplyProject = (id: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, applied: true, status: "pending" };
      }
      return p;
    }));

    // System automatically reviews and decides accepted/rejected in 2.5 seconds
    setTimeout(() => {
      setProjects(prev => prev.map(p => {
        if (p.id === id) {
          // 70% accepted, 30% rejected
          const autoAccepted = Math.random() < 0.7;
          return { ...p, status: autoAccepted ? "accepted" : "rejected" };
        }
        return p;
      }));
    }, 2500);
  };

  const handleUpdateProjectStatus = (id: string, status: "pending" | "accepted" | "rejected") => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status };
      }
      return p;
    }));
  };

  const handleNavigateDirectly = (screenId: ScreenId) => {
    setCurrentScreen(screenId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg font-sans text-text-p flex flex-col md:flex-row antialiased">
      
      {/* Sidebar Navigation */}
      <aside 
        id="app_sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-surface p-5 transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0 shadow-lg" : "-translate-x-full"
        }`}
      >
        {/* Header Branding */}
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div className="flex items-center gap-2.5">
            <LogoIcon className="h-9 w-9 shrink-0" />
            <div>
              <span className="font-display font-bold text-text-p tracking-tight text-md">InternShape</span>
              <span className="text-[9px] font-mono font-bold text-accent uppercase tracking-wider block leading-none mt-1">Connect. Learn. Create.</span>
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => setSidebarOpen(false)}
            className="rounded p-1 text-text-s hover:bg-surface-light md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigateDirectly(item.id)}
                className={`w-full text-left px-3.5 py-3 text-xs font-semibold cursor-pointer transition flex items-center gap-3 border-l-2 ${
                  isActive 
                    ? "bg-white/[0.03] text-text-p border-accent" 
                    : "text-text-s border-transparent hover:bg-white/[0.01] hover:text-text-p"
                }`}
              >
                <Icon size={16} className={`shrink-0 ${isActive ? "text-accent" : "text-text-s"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer profile widget using verified email context */}
        <div className="border-t border-border pt-4 mt-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm tracking-wide">
              YM
            </div>
            <div className="text-left overflow-hidden">
              <h4 className="font-bold text-xs text-text-p truncate leading-none">{studentName}</h4>
              <p className="text-[10px] text-text-s font-mono mt-1 select-all truncate" title={studentEmail}>
                {studentEmail}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden min-h-screen">
        
        {/* Mobile Header bar */}
        <header className="bg-surface border-b border-border p-4 flex items-center justify-between md:hidden">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="rounded border border-border p-1.5 text-text-s hover:bg-surface-light"
            >
              <Menu size={18} />
            </button>
            <span className="font-display font-bold text-text-p text-sm">InternShape</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-[10px] font-bold text-accent font-mono uppercase tracking-wider">
              PRO CONNECT
            </span>
          </div>
        </header>

        {/* Horizontal Landing-Style Tabbed Selector Bar at Top */}
        <section 
          id="landing_navigation_bar"
          className="bg-surface border-b border-border px-4 md:px-8 flex items-center justify-between shadow-xs overflow-x-auto scrollbar-none"
        >
          <div className="flex items-center gap-1.5 py-1.5 w-full justify-start md:justify-center">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = currentScreen === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigateDirectly(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-3 text-xs font-bold font-sans tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap rounded ${
                    isActive 
                      ? "text-accent bg-accent/5 font-extrabold" 
                      : "text-text-s hover:text-text-p hover:bg-white/[0.02]"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-accent animate-pulse" : "text-text-s"} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2.5px] bg-gradient-to-r from-accent to-accent-purple rounded-full shadow-[0_1px_8px_var(--color-accent)]" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Content viewport area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          <div className="max-w-7xl mx-auto">
            {/* Screen layout switches mapper */}
            {currentScreen === "dashboard" && (
              <DashboardScreen 
                onNavigateToScreen={(screenId) => handleNavigateDirectly(screenId as ScreenId)} 
                appliedProjectsCount={appliedProjectsCount}
                projects={projects}
                onUpdateProjectStatus={handleUpdateProjectStatus}
              />
            )}

            {currentScreen === "application_status" && (
              <ApplicationStatusScreen 
                projects={projects}
                onNavigateToScreen={(screenId) => handleNavigateDirectly(screenId as ScreenId)}
              />
            )}
            
            {currentScreen === "explore" && (
              <ExploreScreen 
                projects={projects}
                onToggleStar={handleToggleStar}
                onApplyProject={handleApplyProject}
              />
            )}

            {currentScreen === "mentors" && (
              <MentorScreen 
                onSendMessageToMentor={(mentorName) => {
                  setCurrentScreen("milestones");
                }}
              />
            )}

            {currentScreen === "milestones" && (
              <MilestonesScreen />
            )}

            {currentScreen === "completed_projects" && (
              <CompletedProjectsScreen />
            )}
          </div>

        </div>

      </main>

    </div>
  );
}
