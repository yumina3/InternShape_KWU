/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Project } from "../types";
import { 
  ClipboardList, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  ArrowRight, 
  Search, 
  TrendingUp, 
  User, 
  Zap,
  Bookmark,
  Calendar
} from "lucide-react";

interface ApplicationStatusScreenProps {
  projects: Project[];
  onNavigateToScreen: (screenId: string) => void;
}

export function ApplicationStatusScreen({ 
  projects,
  onNavigateToScreen
}: ApplicationStatusScreenProps) {
  const appliedProjects = projects.filter(p => p.applied);
  const acceptedProjects = appliedProjects.filter(p => p.status === "accepted");
  const pendingProjects = appliedProjects.filter(p => p.status === "pending" || !p.status);
  const rejectedProjects = appliedProjects.filter(p => p.status === "rejected");

  return (
    <div className="space-y-6" id="application_status_screen">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded bg-accent/10 border border-accent/20 px-2.5 py-1 text-[10px] font-bold text-accent uppercase tracking-wider mb-2">
            <ClipboardList size={11} />
            <span>Kanal Pelacakan Lamaran</span>
          </div>
          <h1 className="font-display text-xl font-bold tracking-tight text-text-p md:text-2xl">
            Status Lamaran Magang Saya
          </h1>
          <p className="text-xs text-text-s mt-1">
            Pantau rincian proses skrining, verifikasi profil akademik, serta kemajuan persetujuan lamaran terpadu Anda secara berkala.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateToScreen("explore")}
            className="inline-flex items-center gap-1.5 rounded bg-accent px-4 py-2 text-xs font-bold text-bg hover:bg-accent-hover transition active:scale-95 cursor-pointer font-sans"
          >
            Lamar Proyek Lain
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Grid KPI Status Lamaran */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Total Applied */}
        <div className="rounded border border-border bg-surface p-4 text-left">
          <span className="text-[10px] font-bold text-text-s uppercase tracking-wider">Total Dilamar</span>
          <h3 className="mt-1 font-display text-2xl font-bold text-text-p">{appliedProjects.length} Proyek</h3>
          <p className="mt-1 text-[10px] text-text-s truncate">Semua ajuan yang terkirim</p>
        </div>

        {/* Accepted status */}
        <div className="rounded border border-border bg-surface p-4 text-left border-l-4 border-l-emerald-500">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Disetujui</span>
          <h3 className="mt-1 font-display text-2xl font-bold text-emerald-400">{acceptedProjects.length} Proyek</h3>
          <p className="mt-1 text-[10px] text-text-s truncate">Siap mulai bimbingan aktif</p>
        </div>

        {/* Pending status */}
        <div className="rounded border border-border bg-surface p-4 text-left border-l-4 border-l-amber-500">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Menunggu</span>
          <h3 className="mt-1 font-display text-2xl font-bold text-amber-400">{pendingProjects.length} Antrean</h3>
          <p className="mt-1 text-[10px] text-text-s truncate">Sedang dievaluasi AI & mitra</p>
        </div>

        {/* Rejected status */}
        <div className="rounded border border-border bg-surface p-4 text-left border-l-4 border-l-rose-500">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Ditolak</span>
          <h3 className="mt-1 font-display text-2xl font-bold text-rose-400">{rejectedProjects.length} Proyek</h3>
          <p className="mt-1 text-[10px] text-text-s truncate">Evaluasi tidak terpenuhi</p>
        </div>
      </div>

      {/* List / Card Grid of applications */}
      {appliedProjects.length === 0 ? (
        <div className="rounded border border-dashed border-border py-12 text-center bg-surface p-8 max-w-xl mx-auto mt-6">
          <Bookmark className="mx-auto h-12 w-12 text-text-s/70 animate-bounce" />
          <h3 className="mt-4 text-md font-bold text-text-p">Belum Ada Lamaran Aktif</h3>
          <p className="mt-2 text-xs text-text-s leading-relaxed">
            Anda belum mendaftar ke proyek magang apa pun pada periode ini. Silakan kunjungi menu <b>Project Exploration</b> untuk mengevaluasi ketersediaan lowongan dan mengirimkan motivation statement terbaik Anda.
          </p>
          <div className="mt-6">
            <button 
              onClick={() => onNavigateToScreen("explore")}
              className="inline-flex items-center gap-2 rounded bg-accent px-5 py-2.5 text-xs font-bold text-bg hover:bg-accent-hover transition active:scale-95 cursor-pointer font-sans"
            >
              Jelajahi Papan Proyek Magang
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-p tracking-wide uppercase font-mono">Daftar Pengajuan Aktif ({appliedProjects.length})</span>
            <span className="text-[11px] text-text-s italic">Sistem peninjau berjalan secara otomatis & real-time</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {appliedProjects.map((proj) => {
              const status = proj.status || "pending";
              return (
                <div 
                  key={proj.id}
                  className={`rounded border p-5 transition duration-200 bg-surface ${
                    status === "accepted" ? "border-accent/40 shadow-[0_2px_14px_rgba(0,180,151,0.06)]" :
                    status === "rejected" ? "border-rose-950/30 opacity-90" :
                    "border-border"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 rounded bg-surface border border-border p-2 flex items-center justify-center overflow-hidden">
                        <img 
                          src={proj.logoUrl} 
                          alt="" 
                          className="h-full w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] uppercase font-bold text-accent bg-accent/5 px-2 py-0.5 rounded border border-accent/10">
                            {proj.category}
                          </span>
                          <span className="text-[10px] text-text-s font-medium font-mono">ID: PROJ-{proj.id}</span>
                        </div>
                        <h3 className="font-display font-bold text-md text-text-p mt-1">
                          {proj.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                      {status === "pending" && (
                        <div className="inline-flex items-center gap-1.5 rounded bg-amber-950/40 border border-amber-600/50 px-3 py-1 text-xs font-bold text-amber-400 uppercase">
                          <Clock size={12} className="animate-spin text-amber-400" />
                          <span>MENGUNGGU PERSETUJUAN</span>
                        </div>
                      )}
                      {status === "accepted" && (
                        <div className="inline-flex items-center gap-1.5 rounded bg-emerald-950/40 border border-emerald-500/50 px-3 py-1 text-xs font-bold text-emerald-400 uppercase">
                          <CheckCircle size={12} className="text-emerald-400" />
                          <span>DITERIMA OLEH MITRA</span>
                        </div>
                      )}
                      {status === "rejected" && (
                        <div className="inline-flex items-center gap-1.5 rounded bg-rose-950/40 border border-rose-600/50 px-3 py-1 text-xs font-bold text-rose-400 uppercase">
                          <XCircle size={12} className="text-rose-400" />
                          <span>DITOLAK OLEH MITRA</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Horizontal visual stepper showing actual process workflow */}
                  <div className="py-6 max-w-3xl mx-auto">
                    <div className="flex items-center justify-between relative">
                      {/* Grey baseline */}
                      <div className="absolute left-3 right-3 top-2.5 h-0.5 bg-border -z-0" />
                      
                      {/* Blue/Accent progress line representing real-time execution */}
                      <div 
                        className="absolute left-3 top-2.5 h-0.5 bg-accent transition-all duration-700 -z-0" 
                        style={{ 
                          width: status === "pending" ? "66%" : "100%" 
                        }} 
                      />

                      {/* Step 1: Submit Application */}
                      <div className="flex flex-col items-center relative z-10 text-center w-1/4">
                        <div className="h-6 w-6 rounded-full bg-accent border border-accent text-bg font-bold text-[10px] flex items-center justify-center shadow-xs">
                          ✓
                        </div>
                        <span className="text-[10px] font-bold text-text-p mt-1.5">Kirim Lamaran</span>
                        <span className="text-[8px] text-text-s font-medium mt-0.5">Selesai dikirim</span>
                      </div>

                      {/* Step 2: Verification */}
                      <div className="flex flex-col items-center relative z-10 text-center w-1/4">
                        <div className="h-6 w-6 rounded-full bg-accent border border-accent text-bg font-bold text-[10px] flex items-center justify-center shadow-xs">
                          ✓
                        </div>
                        <span className="text-[10px] font-bold text-text-p mt-1.5">Verifikasi Berkas</span>
                        <span className="text-[8px] text-text-s font-medium mt-0.5">Kelengkapan ok</span>
                      </div>

                      {/* Step 3: Matchmaking Screening */}
                      <div className="flex flex-col items-center relative z-10 text-center w-1/4">
                        <div className={`h-6 w-6 rounded-full border text-[10px] flex items-center justify-center font-bold font-sans shadow-xs transition-all duration-300 ${
                          status === "pending" 
                            ? "bg-amber-500/10 text-amber-400 border-amber-500 animate-pulse font-extrabold" 
                            : "bg-accent border-accent text-bg"
                        }`}>
                          {status === "pending" ? "3" : "✓"}
                        </div>
                        <span className={`text-[10px] font-bold mt-1.5 ${status === "pending" ? "text-amber-400" : "text-text-p"}`}>
                          Pencocokan Profil
                        </span>
                        <span className="text-[8px] text-text-s font-medium mt-0.5">
                          {status === "pending" ? "Pengecekan AI" : "Selesai ditata"}
                        </span>
                      </div>

                      {/* Step 4: Decision */}
                      <div className="flex flex-col items-center relative z-10 text-center w-1/4">
                        <div className={`h-6 w-6 rounded-full border text-[10px] flex items-center justify-center font-bold shadow-xs transition-all duration-300 ${
                          status === "pending" ? "bg-surface border-border text-text-s" :
                          status === "accepted" ? "bg-emerald-500 border-emerald-600 text-bg" :
                          "bg-rose-500 border-rose-600 text-bg"
                        }`}>
                          {status === "pending" ? "4" : status === "accepted" ? "✓" : "✗"}
                        </div>
                        <span className={`text-[10px] font-bold mt-1.5 ${
                          status === "pending" ? "text-text-s" :
                          status === "accepted" ? "text-emerald-400" : "text-rose-400"
                        }`}>
                          Hasil Akhir
                        </span>
                        <span className="text-[8px] text-text-s font-medium mt-0.5">
                          {status === "pending" ? "Menunggu" : status === "accepted" ? "Diterima" : "Ditolak"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom context block with dynamic feedback message */}
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-light/45 border border-border/50 rounded-lg p-3 px-4 text-xs">
                    <div className="flex items-center gap-2 text-text-s">
                      <img 
                        src={proj.mentorAvatar} 
                        alt="" 
                        className="h-6 w-6 rounded-full object-cover shrink-0 border border-border"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <span className="text-[10px] text-text-s block leading-none">Mentor Pembimbing</span>
                        <span className="text-text-p font-bold text-xs mt-1 block">{proj.mentorName}</span>
                      </div>
                    </div>

                    <div className="text-left sm:text-right max-w-md">
                      <p className="text-[11px] font-medium text-text-p leading-normal">
                        {status === "pending" && "Berkas motivation statement & transkrip akademik Anda sedang diperiksa sistem penilai mandiri industri."}
                        {status === "accepted" && "Selamat! Profil Anda cocok dengan kriteria mitra. Mulai bimbingan aktif dengan mentor sekarang."}
                        {status === "rejected" && "Profil Anda belum cocok dengan kriteria mitra untuk proyek ini. Silakan cari proyek magang lain."}
                      </p>
                    </div>

                    <div className="shrink-0 self-end sm:self-center">
                      {status === "accepted" ? (
                        <button 
                          onClick={() => onNavigateToScreen("milestones")}
                          className="inline-flex items-center gap-1 rounded bg-accent px-3.5 py-1.5 text-xs font-bold text-bg hover:bg-accent-hover transition active:scale-95 cursor-pointer font-sans"
                        >
                          Mulai Bimbingan ➔
                        </button>
                      ) : (
                        <button
                          disabled
                          className="inline-flex items-center gap-1 rounded bg-surface border border-border px-3.5 py-1.5 text-xs font-bold text-text-s cursor-not-allowed font-sans"
                        >
                          Status Terkunci
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Informative Help Box for Pending State */}
                  {status === "pending" && (
                    <div className="mt-3 bg-amber-500/5 border border-amber-500/20 rounded-md p-2.5 text-[11px] text-amber-200/90 leading-relaxed">
                      <b>Keterangan Simulasi</b>: Sistem kami melakukan tinjauan otomatis secara langsung. Mohon tunggu sekitar 2.5 detik jika Anda baru saja mendaftar; halaman ini akan diperbarui ketika status evaluasi resmi dari perusahaan terbit!
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Helpful Tips Card */}
      <div className="rounded border border-border bg-surface p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-left">
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-text-p flex items-center gap-1.5">
            <Zap size={14} className="text-accent" />
            Butuh Bantuan Selama Proses Seleksi Magang?
          </h4>
          <p className="text-xs text-text-s">
            Hubungi penanggung jawab program atau koordinator akademik Universitas Negeri Semarang untuk bimbingan manual jika berkas Anda tertolak terus-menerus.
          </p>
        </div>
        <button 
          onClick={() => onNavigateToScreen("mentors")}
          className="rounded border border-border hover:border-accent hover:text-accent bg-transparent px-3.5 py-2 text-xs font-semibold text-text-p transition shrink-0 cursor-pointer font-sans"
        >
          Hubungi Mentor PIC
        </button>
      </div>

    </div>
  );
}
