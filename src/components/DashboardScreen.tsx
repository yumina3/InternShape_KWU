/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Project } from "../types";
import { INITIAL_COMPLETED_PROJECTS } from "../data";
import { 
  Calendar, 
  CheckCircle2, 
  ArrowUpRight, 
  Zap, 
  TrendingUp,
  Award,
  Bookmark,
  Sparkles,
  CheckCircle,
  XCircle,
  UserCheck,
  GraduationCap,
  Bell,
  Clock,
  ExternalLink,
  ClipboardList
} from "lucide-react";

interface DashboardScreenProps {
  onNavigateToScreen: (screenId: string) => void;
  appliedProjectsCount: number;
  projects: Project[];
  onUpdateProjectStatus: (id: string, status: "pending" | "accepted" | "rejected") => void;
}

export function DashboardScreen({ 
  onNavigateToScreen, 
  appliedProjectsCount,
  projects,
  onUpdateProjectStatus
}: DashboardScreenProps) {
  const [activities, setActivities] = useState([
    { id: 1, user: "Sistem InternShape", action: "menerbitkan Sertifikat Kelulusan Resmi Digital untuk", project: "Inovasi Desain Kemasan Jamu UNNES", time: "Baru saja" },
    { id: 2, user: "Dr. Sarah Wijaya", action: "menandatangani lembar kelulusan milisestone", project: "Peta Distribusi UMKM Semarang", time: "1 jam lalu" },
    { id: 3, user: "Sistem Evaluasi", action: "menyelesaikan review verifikasi profil akademik untuk", project: "Yuna Mikanda (UNNES)", time: "3 jam lalu" },
    { id: 4, user: "Prof. Maya Indah", action: "memberikan feedback sempurna 100/100 pada", project: "Analisis Pasar Jamu Tradisional", time: "Kemarin" }
  ]);
  
  const [activityPulse, setActivityPulse] = useState(false);

  useEffect(() => {
    // Dynamic stream simulation
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setActivityPulse(true);
        setTimeout(() => setActivityPulse(false), 800);
        
        const randomLogs = [
          { user: "Sistem Otomatis", action: "memverifikasi pengajuan studi motivasi baru untuk", project: "Papan Eksplorasi Proyek" },
          { user: "Dinas Koperasi Semarang", action: "menyetujui rincian laporan spasial akhir untuk", project: "Peta Distribusi UMKM Semarang" },
          { user: "Prof. Maya Indah", action: "memeriksa draf desain instagram untuk", project: "Inovasi Desain Jamu UNNES" }
        ];
        const selected = randomLogs[Math.floor(Math.random() * randomLogs.length)];
        
        setActivities(prev => [
          {
            id: Date.now(),
            user: selected.user,
            action: selected.action,
            project: selected.project,
            time: "Baru saja"
          },
          ...prev.slice(0, 3)
        ]);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const appliedProjects = projects.filter(p => p.applied);
  const acceptedProjects = appliedProjects.filter(p => p.status === "accepted");
  const pendingProjects = appliedProjects.filter(p => p.status === "pending" || !p.status);

  // Overall program score
  const studentEmail = "yunamikanda06@students.unnes.ac.id";
  const studentName = "Yuna Mikanda";

  return (
    <div className="space-y-6" id="dashboard_screen">
      {/* Intro Header Card - Warm, student-focused design */}
      <div className="relative overflow-hidden rounded border border-border bg-surface p-6 md:p-8 text-text-p shadow-xs">
        <div className="absolute right-0 bottom-0 opacity-5 translate-x-12 translate-y-12">
          <GraduationCap size={240} className="text-text-p" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent backdrop-blur-xs">
            <Zap size={12} className="animate-pulse" />
            <span>Portal Magang Mahasiswa Terpadu</span>
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Selamat Datang, {studentName}
          </h1>
          <p className="mt-2 text-md text-text-s leading-relaxed">
            Dapatkan pengalaman magang berharga dari proyek nyata pangkalan mitra industri dan UMKM. 
            Lamar proyek mandiri pilihan Anda, dapatkan bimbingan mentor akademis ahli, dan raih sertifikat kompetensi resmi Anda.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button 
              id="dash_btn_explore"
              onClick={() => onNavigateToScreen("explore")}
              className="inline-flex items-center gap-2 rounded bg-accent px-4 py-2 text-xs font-bold text-bg shadow-sm transition hover:bg-accent-hover active:scale-95 cursor-pointer font-sans"
            >
              Eksplor Proyek Magang
              <ArrowUpRight size={14} />
            </button>
            <button 
              id="dash_btn_certificates"
              onClick={() => onNavigateToScreen("completed_projects")}
              className="inline-flex items-center gap-2 rounded border border-border bg-transparent px-4 py-2 text-xs font-bold text-text-p transition hover:bg-surface-light hover:text-white cursor-pointer font-sans"
            >
              Buka Berkas Sertifikat Kelulusan
            </button>
          </div>
        </div>
      </div>

      {/* Grid KPI Stats - Highly Student-centric metrics carefully separating current and complete programs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Progress Magang Saat Ini (Ongoing/Bimbingan) */}
        <div className="rounded border border-border bg-surface p-5 transition hover:translate-y-[-2px] hover:border-accent/40" id="kpi_current_progress">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-s uppercase tracking-wider">Progress Magang Saat Ini</span>
            <div className="rounded bg-accent/10 p-2 text-accent">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-4">
            {acceptedProjects.length > 0 ? (
              <>
                <h3 className="font-display text-2xl font-bold text-text-p">65% Sedang Berjalan</h3>
                <div className="mt-2 h-1.5 w-full rounded bg-surface-light overflow-hidden">
                  <div 
                    className="h-full bg-accent transition-all duration-500" 
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <div className="mt-3 text-xs text-text-s">
                  Fase bimbingan aktif dengan <span className="font-bold text-accent">{acceptedProjects[0]?.mentorName}</span>
                </div>
              </>
            ) : pendingProjects.length > 0 ? (
              <>
                <h3 className="font-display text-2xl font-bold text-amber-400">Dalam Peninjauan</h3>
                <div className="mt-2 h-1.5 w-full rounded bg-surface-light overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-500 animate-pulse" 
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <div className="mt-3 text-xs text-text-s">
                  Sistem otomatis sedang mencocokkan profil akademik Anda
                </div>
              </>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold text-text-s">Belum Ada Proyek Aktif</h3>
                <div className="mt-2 h-1.5 w-full rounded bg-surface-light overflow-hidden">
                  <div className="h-full bg-border" style={{ width: "0%" }}></div>
                </div>
                <div className="mt-3 text-xs text-accent cursor-pointer" onClick={() => onNavigateToScreen("explore")}>
                  Pilih proyek bimbingan di ekslorasi ➔
                </div>
              </>
            )}
          </div>
        </div>

        {/* Card 2: Magang Terselesaikan (History Kelulusan) */}
        <div className="rounded border border-border bg-surface p-5 transition hover:translate-y-[-2px] hover:border-accent/40" id="kpi_completed_history">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-s uppercase tracking-wider">Magang Terselesaikan</span>
            <div className="rounded bg-accent/10 p-2 text-accent">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-text-p">{INITIAL_COMPLETED_PROJECTS.length} Program Selesai</h3>
            <div className="mt-2 h-1.5 w-full rounded bg-surface-light overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500" 
                style={{ width: "100%" }}
              ></div>
            </div>
            <div className="mt-3 text-xs text-emerald-400 font-semibold uppercase tracking-wider">
              Lulus Uji 100% Terverifikasi
            </div>
          </div>
        </div>

        {/* Card 3: Sertifikat Resmi Diraih */}
        <div className="rounded border border-border bg-surface p-5 transition hover:translate-y-[-2px] hover:border-accent/40" id="kpi_certificates_count">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-s uppercase tracking-wider">Sertifikat Diraih</span>
            <div className="rounded bg-accent/10 p-2 text-accent">
              <Award size={18} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-display text-2xl font-bold text-text-p">{INITIAL_COMPLETED_PROJECTS.length} Lembar Dokumen</h3>
            <p className="mt-1 text-xs text-accent">Diterbitkan oleh Mitra Industri</p>
          </div>
          <div className="mt-3 text-xs text-accent">
            <span className="font-semibold cursor-pointer" onClick={() => onNavigateToScreen("completed_projects")}>
              Cetak Sertifikat Kelulusan ➔
            </span>
          </div>
        </div>

        {/* Card 4: Akun Mahasiswa Terverifikasi */}
        <div className="rounded border border-border bg-surface p-5 transition hover:translate-y-[-2px] hover:border-accent/40" id="kpi_student_account">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-s uppercase tracking-wider">Data Akademik Mahasiswa</span>
            <div className="rounded bg-accent/10 p-2 text-accent">
              <UserCheck size={18} />
            </div>
          </div>
          <div className="mt-3 text-left">
            <h3 className="text-sm font-bold text-text-p truncate">{studentName}</h3>
            <p className="text-[10px] text-text-s mt-1 select-all truncate">{studentEmail}</p>
            <p className="text-[10px] text-accent font-bold mt-1 uppercase tracking-wider">Universitas Negeri Semarang</p>
          </div>
        </div>
      </div>

      {/* Quick Status Lamaran Tracker Widget */}
      <div className="rounded border border-border bg-surface p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4" id="mini_status_tracker">
        <div className="flex items-center gap-3">
          <div className="rounded bg-accent/10 p-2.5 text-accent shrink-0">
            <ClipboardList size={22} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-text-p flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Status Peninjauan Lamaran Magang Saya
            </h3>
            <p className="text-xs text-text-s mt-1 leading-relaxed">
              {appliedProjects.length > 0 
                ? `Terdeteksi ${appliedProjects.length} lamaran aktif (${pendingProjects.length} sedang dalam antrean evaluasi AI, ${acceptedProjects.length} lolos seleksi bimbingan).`
                : "Belum ada berkas pendaftaran terkirim. Kunjungi Project Exploration untuk mendaftar."}
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigateToScreen("application_status")}
          className="rounded bg-accent/5 hover:bg-accent/10 border border-accent/20 px-4 py-2 text-xs font-bold text-accent transition shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <span>Pantau Status Seleksi</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Left column: Student Completed Projects & Digital Credentials */}
        <div className="rounded border border-border bg-surface p-6 shadow-xs lg:col-span-2">
          <div className="mb-4 flex items-center justify-between font-display border-b border-border pb-3">
            <div>
              <h2 className="text-md font-bold text-text-p font-mono tracking-wide">MAGANG SELESAI & KREDENSIAL DIGITAL SAYA</h2>
              <p className="text-xs text-text-s mt-1">Gunakan tautan cepat sertifikat resmi di bawah untuk dibagikan di LinkedIn atau CV Anda.</p>
            </div>
            <span className="rounded bg-surface-light border border-border px-2.5 py-1 text-xs font-mono text-text-s font-semibold">
              {INITIAL_COMPLETED_PROJECTS.length} Lulus
            </span>
          </div>
 
          <div className="divide-y divide-border">
            {INITIAL_COMPLETED_PROJECTS.map(proj => (
              <div key={proj.id} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded bg-accent/10 border border-accent/20 flex items-center justify-center p-1 text-accent">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-p text-sm leading-tight">{proj.title}</h4>
                    <p className="text-xs text-text-s font-medium mt-1">
                      Mitra: <b className="text-text-p">{proj.company}</b> • Mentor PIC: {proj.mentorName}
                    </p>
                    <p className="text-[10px] text-accent font-mono mt-1">ID Kredensial: {proj.certificateId}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button 
                    onClick={() => onNavigateToScreen("completed_projects")}
                    className="rounded border border-border hover:border-accent bg-surface-light px-3.5 py-2 text-xs font-bold text-text-p transition flex items-center gap-1.5 cursor-pointer font-sans"
                    title="Buka sertifikat resmi untuk mencetak"
                  >
                    <span>Sertifikat</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Student notifications / Stream of activities logs */}
        <div className="rounded border border-border bg-surface p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between font-display border-b border-border pb-3">
            <div>
              <h2 className="text-md font-bold text-text-p font-mono tracking-wide">Pemberitahuan</h2>
              <p className="text-xs text-text-s mt-1">Arus log aktivitas akademik & bimbingan</p>
            </div>
            {activityPulse && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
            )}
          </div>

          <div className="relative pl-3 border-l border-border/80 space-y-4">
            {activities.map((act) => (
              <div key={act.id} className="relative group">
                {/* Dot marker */}
                <div className="absolute -left-[17.5px] top-1.5 h-2 w-2 rounded-full border border-surface bg-accent" />
                <span className="block text-[8px] font-mono text-text-s uppercase tracking-wider">{act.time}</span>
                <p className="mt-1 text-xs text-text-p leading-snug">
                  <span className="font-semibold text-text-p">{act.user}</span> {act.action}
                </p>
                <p className="mt-1 text-[11px] text-accent font-medium font-sans">
                  "{act.project}"
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center pt-3 border-t border-border/30">
            <button 
              onClick={() => onNavigateToScreen("milestones")}
              className="text-xs font-bold text-accent hover:text-accent-hover transition font-mono tracking-wide cursor-pointer"
            >
              Buka Chat Mentor ➔
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
