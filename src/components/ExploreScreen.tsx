/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Project } from "../types";
import { INITIAL_PROJECTS } from "../data";
import { 
  Search, 
  MapPin, 
  Clock, 
  Layers, 
  CheckCircle, 
  XCircle,
  Bookmark, 
  BookmarkCheck, 
  Send,
  AlertCircle,
  TrendingUp,
  X,
  Sparkles
} from "lucide-react";

interface ExploreScreenProps {
  projects: Project[];
  onToggleStar: (id: string) => void;
  onApplyProject: (id: string) => void;
}

export function ExploreScreen({ projects, onToggleStar, onApplyProject }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Semua");
  
  // Application Modal state
  const [activeApplyProject, setActiveApplyProject] = useState<Project | null>(null);
  const [statement, setStatement] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [yearsExperience, setYearsExperience] = useState("1");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Filters Categories and Difficulties
  const categories = ["Semua", "Pengembangan Web", "Pemasaran Digital", "Strategi Bisnis", "Sains Data"];
  const difficulties = ["Semua", "Pemula", "Menengah", "Lanjutan"];

  // Filtered projects
  const filteredProjects = projects.filter(proj => {
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.skillsNeeded.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          proj.mentorName.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesCategory = selectedCategory === "Semua" || proj.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "Semua" || proj.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Open apply modal
  const handleOpenApply = (proj: Project) => {
    setActiveApplyProject(proj);
    setStatement("");
    setErrorMessage("");
    setSuccessAnimation(false);
  };

  // Submit apply simulation
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statement.trim()) {
      setErrorMessage("Kalimat motivasi wajib ditulis agar dinilai oleh mentor.");
      return;
    }
    if (!agreeTerms) {
      setErrorMessage("Anda harus menyetujui ketersediaan waktu untuk proyek ini.");
      return;
    }

    setSuccessAnimation(true);
    
    // Simulate API network latency then apply
    setTimeout(() => {
      if (activeApplyProject) {
        onApplyProject(activeApplyProject.id);
      }
      setActiveApplyProject(null);
      setSuccessAnimation(false);
    }, 1500);
  };

  return (
    <div className="space-y-6" id="explore_screen">
      {/* Title Block */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-p md:text-3xl">Papan Eksplorasi Proyek</h1>
          <p className="text-sm text-text-s">Temukan proyek nyata dari UMKM dan industri, hubungkan langsung bimbingan dengan mentor ahli.</p>
        </div>
        <div className="inline-flex self-start rounded bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-semibold text-accent">
          {projects.length} Proyek Tersedia
        </div>
      </div>

      {/* Control Filters Area */}
      <div className="rounded border border-border bg-surface p-5 space-y-4">
        {/* Row 1: Search & Easy Reset */}
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-text-s" />
            <input 
              type="text" 
              placeholder="Cari proyek berdasarkan judul, skill, atau mentor..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-border bg-surface-light text-text-p py-2.5 pl-10 pr-4 text-sm outline-hidden transition focus:border-accent"
            />
          </div>
          {(searchQuery || selectedCategory !== "Semua" || selectedDifficulty !== "Semua") && (
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
                setSelectedDifficulty("Semua");
              }}
              className="rounded bg-surface-light border border-border px-4 py-2.5 text-xs font-semibold text-text-s hover:bg-surface transition"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Row 2: Category Badges Select */}
        <div>
          <span className="block text-xs font-semibold text-text-s uppercase tracking-wider mb-2">Kategori Proyek</span>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded px-3.5 py-1.5 text-xs font-medium cursor-pointer transition ${
                  selectedCategory === cat 
                    ? "bg-accent text-bg border border-accent" 
                    : "bg-surface-light text-text-s border border-border hover:bg-surface hover:text-text-p"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Difficulty Select and Quick Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div>
            <span className="block text-xs font-semibold text-text-s uppercase tracking-wider mb-2">Tingkat Kesulitan</span>
            <div className="flex gap-2">
              {difficulties.map(diff => (
                <button 
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`rounded px-3 py-1.5 text-xs font-medium cursor-pointer transition ${
                    selectedDifficulty === diff 
                      ? "bg-accent text-bg border border-accent" 
                      : "border border-border text-text-s hover:bg-surface-light"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-text-s flex items-center gap-1.5 bg-surface-light p-2.5 rounded border border-border">
            <Sparkles size={14} className="text-accent" />
            <span>Mendaftar proyek akan secara otomatis mengalirkan tugas di halaman <b>Milestone</b></span>
          </div>
        </div>
      </div>

      {/* Projects Grid Display */}
      {filteredProjects.length === 0 ? (
        <div className="rounded border border-dashed border-border bg-surface py-16 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-text-s" />
          <h3 className="mt-4 font-display text-lg font-bold text-text-p">Tidak ada proyek ditemukan</h3>
          <p className="mt-2 text-sm text-text-s max-w-sm mx-auto">
            Coba ganti query pencarian Anda atau perbarui toggle filter kategori yang terpilih di atas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2" id="projects_board">
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id} 
              className="flex flex-col rounded border border-border bg-surface p-6 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-accent/40"
            >
              {/* Header inside Card */}
              <div className="flex items-start justify-between gap-4">
                <div className="h-14 w-14 shrink-0 rounded bg-surface-light border border-border p-2 overflow-hidden flex items-center justify-center">
                  <img 
                    src={proj.logoUrl} 
                    alt={proj.title} 
                    className="h-full w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex gap-2">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    proj.difficulty === "Pemula" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/50" :
                    proj.difficulty === "Menengah" ? "bg-amber-950/40 text-amber-400 border border-amber-800/50" :
                    "bg-rose-950/40 text-rose-400 border border-rose-800/50"
                  }`}>
                    {proj.difficulty}
                  </span>
                  
                  <button 
                    onClick={() => onToggleStar(proj.id)}
                    className="rounded border border-border p-1.5 text-text-s hover:text-accent hover:bg-surface-light transition"
                  >
                    {proj.starred ? (
                      <BookmarkCheck size={18} className="text-accent fill-accent" />
                    ) : (
                      <Bookmark size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-4 flex-1">
                <span className="text-[10px] uppercase font-bold text-accent tracking-wider font-semibold">
                  {proj.category}
                </span>
                <h3 className="font-display mt-1 text-lg font-bold text-text-p leading-tight">
                  {proj.title}
                </h3>
                <p className="mt-2 text-sm text-text-s leading-relaxed line-clamp-3">
                  {proj.description}
                </p>
              </div>

              {/* Requirement Skills row */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {proj.skillsNeeded.map(skill => (
                  <span key={skill} className="rounded bg-surface-light border border-border px-2.5 py-0.5 text-xs font-medium text-text-s">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer inside Card: Mentor info & action */}
              <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src={proj.mentorAvatar} 
                    alt={proj.mentorName} 
                    className="h-8 w-8 rounded-full border border-border bg-surface-light object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <p className="text-[10px] font-semibold text-text-s uppercase leading-none">Mentor Proyek</p>
                    <p className="text-xs font-bold text-text-p mt-0.5 leading-none">{proj.mentorName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-text-s">
                  <Clock size={14} className="text-text-s" />
                  <span>{proj.duration} Bulan</span>
                </div>
              </div>

              <div className="mt-4">
                {proj.applied ? (
                  <div className="space-y-1.5">
                    {proj.status === "accepted" ? (
                      <div className="flex w-full flex-col gap-1 text-center bg-emerald-950/20 border border-emerald-500/40 p-2 rounded">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400">
                          <CheckCircle size={14} />
                          <span>Diterima oleh Mitra</span>
                        </div>
                        <p className="text-[10px] text-text-p/80 font-medium">Lolos seleksi otomatis! Mari mulai bimbingan aktif.</p>
                      </div>
                    ) : proj.status === "rejected" ? (
                      <div className="flex w-full flex-col gap-1 text-center bg-rose-950/20 border border-rose-800/40 p-2 rounded">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-rose-400">
                          <XCircle size={14} />
                          <span>Ditolak oleh Mitra</span>
                        </div>
                        <p className="text-[10px] text-text-s">Coba lamar bimbingan proyek alternatif lainnya!</p>
                      </div>
                    ) : (
                      <div className="flex w-full flex-col gap-1 text-center bg-amber-950/20 border border-amber-500/40 p-2 rounded animate-pulse">
                        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400">
                          <Clock size={14} className="animate-spin" />
                          <span>Menunggu Persetujuan...</span>
                        </div>
                        <p className="text-[10px] text-text-s">Sistem menyaring profil & motivation statement Anda.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => handleOpenApply(proj)}
                    className="w-full text-center rounded bg-accent hover:bg-accent-hover py-2.5 text-sm font-bold text-bg transition active:scale-95 cursor-pointer"
                  >
                    Lamar Proyek Ini
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Wizard Apply Modal */}
      {activeApplyProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded border border-border bg-surface p-6 shadow-2xl transition-all">
            {/* Success animation block overlay */}
            {successAnimation ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded bg-surface/95 z-10 text-center p-6">
                <div className="h-16 w-16 bg-emerald-950/25 rounded border border-emerald-800/50 flex items-center justify-center mb-4">
                  <CheckCircle size={36} className="text-emerald-400 animate-bounce" />
                </div>
                <h3 className="font-display text-xl font-bold text-text-p">Pendaftaran Berhasil Dikirim!</h3>
                <p className="text-sm text-text-s mt-2 max-w-sm">
                  Lamaran Anda untuk <b>"{activeApplyProject.title}"</b> telah tercatat di repositori sistem dan dialirkan langsung ke mentor {activeApplyProject.mentorName}.
                </p>
                <div className="mt-4 h-1 w-24 bg-surface-light rounded overflow-hidden">
                  <div className="h-full bg-accent animate-[pulse_1.5s_infinite] w-full" />
                </div>
              </div>
            ) : null}

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-accent font-semibold tracking-wider">Formulir Verifikasi Lamaran</span>
                <h2 className="font-display text-lg font-bold text-text-p">Mendaftar Proyek Berbimbing</h2>
              </div>
              <button 
                onClick={() => setActiveApplyProject(null)}
                className="rounded p-1 text-text-s hover:bg-surface-light hover:text-text-p transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body Info */}
            <div className="my-4 rounded bg-surface-light p-3.5 border border-border flex items-center gap-3">
              <img 
                src={activeApplyProject.logoUrl} 
                alt="" 
                className="h-10 w-10 shrink-0 rounded border bg-surface-light object-contain p-1"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-sm font-bold text-text-p leading-snug">{activeApplyProject.title}</h4>
                <p className="text-xs text-text-s font-medium">Bimbingan: <span className="text-accent font-semibold">{activeApplyProject.mentorName}</span></p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-s uppercase tracking-widest mb-1.5">Kalimat Motivasi & Kesiapan</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Ceritakan singkat motivasi Anda, pemahaman Anda mengenai pilar proyek ini, dan mengapa Anda adalah kandidat terbaik..."
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  className="w-full rounded border border-border bg-surface-light p-3 text-sm text-text-p outline-hidden transition focus:border-accent"
                ></textarea>
                <span className="text-[10px] text-text-s block mt-1">Saran: Jelaskan kesiapan Anda mengenai: {activeApplyProject.skillsNeeded.join(", ")}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-text-s uppercase tracking-widest mb-1">Email Kontak Sudent</label>
                  <input 
                    type="email" 
                    required
                    placeholder="email@students.unnes.ac.id"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full rounded border border-border bg-surface-light text-text-p px-3 py-2 text-sm outline-hidden transition focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-s uppercase tracking-widest mb-1">Pengalaman Relevan (Semester)</label>
                  <select 
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    className="w-full rounded border border-border bg-surface-light text-text-p px-3 py-2 text-sm outline-hidden transition focus:border-accent bg-surface-light"
                  >
                    <option value="1">Semester 1-2</option>
                    <option value="3">Semester 3-4</option>
                    <option value="5">Semester 5-6</option>
                    <option value="7">Semester 7-8</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <input 
                  type="checkbox" 
                  id="agree_cb"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 sticky top-1 accent-accent"
                />
                <label htmlFor="agree_cb" className="text-xs text-text-s leading-snug">
                  Saya berkomitmen penuh meluangkan minimal 10 jam/minggu untuk mengarahkan proyek bimbingan ini selama <b>{activeApplyProject.duration} bulan</b>.
                </label>
              </div>

              {errorMessage && (
                <div className="rounded bg-amber-950/20 border border-amber-800/50 p-3 text-xs text-amber-500 flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-border pt-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setActiveApplyProject(null)}
                  className="rounded border border-border px-4 py-2.5 text-sm font-semibold text-text-s hover:bg-surface-light transition cursor-pointer"
                >
                  Batalkan
                </button>
                <button 
                  type="submit"
                  className="inline-flex items-center gap-2 rounded bg-accent hover:bg-accent-hover px-4 py-2.5 text-sm font-bold text-bg transition active:scale-95 cursor-pointer"
                >
                  <Send size={14} />
                  <span>Kirim Lamaran ➔</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
