/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CompletedProject } from "../types";
import { INITIAL_COMPLETED_PROJECTS } from "../data";
import { 
  Award, 
  Calendar, 
  User, 
  CheckCircle, 
  ChevronRight, 
  Download, 
  ExternalLink,
  Milestone,
  FileCheck,
  Building,
  ArrowRight,
  Sparkles,
  QrCode,
  Printer,
  X
} from "lucide-react";

export function CompletedProjectsScreen() {
  const [selectedProject, setSelectedProject] = useState<CompletedProject>(INITIAL_COMPLETED_PROJECTS[0]);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6" id="completed_projects_screen">
      {/* Header Block */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-p md:text-3xl">Portal Kelulusan & Sertifikat</h1>
          <p className="text-sm text-text-s">Selamat! Lihat pencapaian sertifikat magang digital resmi Anda dan tinjau seluruh riwayat umpan balik dari mentor bimbingan.</p>
        </div>
        <div className="inline-flex self-start rounded bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 text-xs font-semibold text-emerald-400">
          {INITIAL_COMPLETED_PROJECTS.length} Magang Sukses
        </div>
      </div>

      {/* Grid Layout: Left list of Completed, Right detail with Milestones Timeline & Certificate preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: List of Completed Projects (4 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-bold font-mono text-text-s uppercase tracking-wider">
            Daftar Magang Terselesaikan
          </h2>

          <div className="space-y-3">
            {INITIAL_COMPLETED_PROJECTS.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`w-full text-left p-4 rounded border transition duration-200 cursor-pointer flex flex-col justify-between h-minus-logo gap-3 ${
                    isSelected 
                      ? "bg-accent/10 border-accent text-text-p shadow-sm" 
                      : "bg-surface border-border text-text-s hover:bg-surface-light hover:text-text-p"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-surface/80 border border-border/80 text-accent">
                        {proj.category}
                      </span>
                      <span className="text-[10px] text-text-s font-mono flex items-center gap-1">
                        <Calendar size={12} />
                        {proj.finishedAt}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-text-p mt-2.5 leading-snug">
                      {proj.title}
                    </h3>
                  </div>

                  <div className="border-t border-border/30 pt-3 flex items-center justify-between mt-1 text-xs">
                    <div className="flex items-center gap-2">
                      <img 
                        src={proj.mentorAvatar} 
                        alt="" 
                        className="h-5 w-5 rounded-full object-cover shrink-0" 
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-text-s text-[11px]">Mentor: <b className="text-text-p font-medium">{proj.mentorName}</b></span>
                    </div>
                    <ChevronRight size={14} className={isSelected ? "text-accent" : "text-text-s"} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick FAQ info widget to look super helpful & human */}
          <div className="rounded border border-border bg-surface-light/40 p-4 space-y-2">
            <h4 className="text-xs font-bold text-text-p flex items-center gap-1.5">
              <Sparkles size={13} className="text-accent" />
              Bagaimana keabsahan sertifikat ini?
            </h4>
            <p className="text-xs text-text-s leading-relaxed">
              Sertifikat diterbitkan melalui platform **InternShape Pro** dengan validasi langsung dari entitas mitra dan mentor industri yang bersangkutan. Setiap berkas memuat kode verifikasi enkripsi unik.
            </p>
          </div>
        </div>

        {/* Right column: Target Project milstone details & real certificate preview layout (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded border border-border bg-surface p-6 shadow-xs">
            
            {/* Detail Summary Title Block */}
            <div className="border-b border-border pb-4 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest block mb-0.5">
                  Mitra: {selectedProject.company}
                </span>
                <h2 className="text-lg font-bold text-text-p leading-tight font-display">
                  {selectedProject.title}
                </h2>
              </div>
              
              <button
                onClick={() => setShowCertificateModal(true)}
                className="inline-flex items-center gap-1.5 rounded bg-accent px-4 py-2 text-xs font-bold text-bg hover:bg-accent-hover transition active:scale-95 shrink-0 self-start md:self-center cursor-pointer"
              >
                <Award size={14} />
                <span>Lihat Sertifikat</span>
              </button>
            </div>

            {/* Quick stats for this completed program */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
              <div className="rounded bg-surface-light/50 border border-border p-3">
                <span className="text-[10px] uppercase font-mono font-bold text-text-s block">ID Sertifikat</span>
                <span className="text-xs font-bold text-text-p font-mono block mt-1">{selectedProject.certificateId}</span>
              </div>
              <div className="rounded bg-surface-light/50 border border-border p-3">
                <span className="text-[10px] uppercase font-mono font-bold text-text-s block">PIC Evaluator</span>
                <span className="text-xs font-bold text-text-p block mt-1">{selectedProject.mentorName}</span>
              </div>
              <div className="rounded bg-surface-light/50 border border-border p-3">
                <span className="text-[10px] uppercase font-mono font-bold text-text-s block">Tanggal Kelulusan</span>
                <span className="text-xs font-bold text-text-p block mt-1">{selectedProject.finishedAt}</span>
              </div>
            </div>

            {/* Vertikal History Milestones */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold font-mono text-text-s uppercase tracking-wider flex items-center gap-2">
                <Milestone size={14} className="text-accent" />
                RIWAYAT MILESTONE & EVALUASI
              </h3>

              <div className="relative border-l-2 border-border pl-5 sm:pl-7 ml-3.5 space-y-6 pt-2 pb-2">
                {selectedProject.milestones.map((ms, index) => (
                  <div key={index} className="relative group">
                    {/* Circle bullet indication status */}
                    <span className="absolute -left-[30.5px] sm:-left-[38.5px] top-1 h-5 w-5 rounded-full bg-emerald-950 border-2 border-accent flex items-center justify-center text-accent">
                      <CheckCircle size={11} strokeWidth={3} />
                    </span>

                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <h4 className="font-bold text-sm text-text-p leading-tight">
                          {ms.title}
                        </h4>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 px-2 py-0.5 rounded shrink-0 self-start sm:self-center">
                          {ms.date}
                        </span>
                      </div>
                      
                      <p className="text-xs text-text-s leading-relaxed">
                        {ms.description}
                      </p>

                      {/* Mentor Feedback segment */}
                      <div className="mt-2.5 rounded bg-surface-light border border-border/80 p-3 text-xs italic text-text-p border-l-4 border-l-accent flex gap-2.5 items-start">
                        <img 
                          src={selectedProject.mentorAvatar} 
                          alt="" 
                          className="h-5 w-5 rounded-full object-cover shrink-0 mt-0.5" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-mono text-[9px] uppercase font-bold text-text-s not-italic">Catatan Mentor {selectedProject.mentorName}:</p>
                          <p className="mt-1 text-[11px] leading-relaxed text-text-p/90">"{ms.feedback}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Embedded interactive digital certificate layout modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl bg-surface border-2 border-border rounded-lg shadow-2xl p-6 md:p-8 space-y-6">
            
            {/* Modal Exit row */}
            <div className="flex items-center justify-between border-b border-border pb-3 no-print">
              <h3 className="text-sm font-bold font-mono tracking-widest text-accent uppercase flex items-center gap-1.5">
                <Award size={15} /> Pratinjau Sertifikat Kelusan Digital
              </h3>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrintCertificate}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded border border-border bg-surface-light text-text-s hover:text-text-p hover:border-text-s transition cursor-pointer"
                  title="Unduh / Cetak Sertifikat"
                >
                  <Printer size={13} />
                  <span>Cetak / PDF</span>
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="p-1 rounded hover:bg-surface-light border border-border text-text-s transition cursor-pointer"
                  title="Tutup Pratinjau"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Core Certificate Canvas view with gorgeous, high-contrast, professional, warm-styled design */}
            <div 
              id="certificate-print-sheet"
              className="relative border-8 border-double border-accent/70 bg-gradient-to-br from-[#0c121e] to-[#05080d] p-8 md:p-14 text-center text-text-p space-y-6 overflow-hidden shadow-inner selection:bg-accent selection:text-bg"
            >
              {/* Luxury gold/teal glowing corner decals */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-accent opacity-30" />
              <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-accent opacity-30" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-accent opacity-30" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-accent opacity-30" />
              
              {/* Back logo background watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none scale-150">
                <Award size={400} />
              </div>

              {/* Certificate Header Branding */}
              <div className="space-y-1.5 relative z-10">
                <div className="flex justify-center mb-4">
                  <Award className="h-14 w-14 text-accent animate-pulse" />
                </div>
                <p className="text-xl font-bold font-display tracking-widest text-accent uppercase">
                  INTERNSHAPE PRO
                </p>
                <p className="text-[10px] font-mono tracking-widest text-text-s uppercase">
                  PROGRAM PENGEMBANGAN INTEGRASI MAHASISWA & UMKM SE-INDONESIA
                </p>
              </div>

              {/* Central Title */}
              <div className="space-y-4 pt-4 relative z-10">
                <h2 className="text-2xl md:text-4xl font-display font-medium text-text-p tracking-normal italic">
                  Sertifikat Kelulusan Magang
                </h2>
                <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
                <p className="text-xs text-text-s not-italic mt-2 font-mono uppercase tracking-widest">
                  DIBERIKAN KEPADA REKAN MAHASISWA TERBAIK:
                </p>
              </div>

              {/* Student Name Display */}
              <div className="pt-2 relative z-10">
                <h3 className="text-3xl md:text-5xl font-display font-bold text-text-p tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-text-p via-[#00ffda] to-accent drop-shadow-sm leading-tight">
                  Yuna Mikanda
                </h3>
                <p className="text-xs text-text-s font-mono mt-1">
                  NIM/Email: yunamikanda06@students.unnes.ac.id | Universitas Negeri Semarang
                </p>
              </div>

              {/* Content Description */}
              <div className="max-w-2xl mx-auto pt-2 space-y-2 relative z-10">
                <p className="text-sm md:text-md text-text-p/90 leading-relaxed font-sans">
                  Atas dedikasi, integritas, dan kompetensi luar biasa yang ditunjukkan selama menyelesaikan program magang mandiri kolaboratif InternShape Pro di bawah bimbingan mentor industri berdurasi penuh selama program:
                </p>
                <p className="text-sm md:text-lg font-bold text-accent font-sans mt-2">
                  "{selectedProject.title}"
                </p>
                <p className="text-xs text-text-s font-mono uppercase tracking-wider">
                  Diselenggarakan bersama mitra kerja: <b>{selectedProject.company}</b>
                </p>
              </div>

              {/* Signatures & Verification code footers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/40 relative z-10 text-left">
                
                {/* Sign 1: Platform CEO */}
                <div className="space-y-2 text-center md:text-left self-end">
                  <span className="font-mono text-[#00ffda] text-[10px] uppercase font-bold block">VERIFIED BY</span>
                  <div className="h-10 flex items-center justify-center md:justify-start font-display italic text-[#e0f2fe] text-md">
                    InternShape Academic Hub
                  </div>
                  <div className="border-t border-border pt-1.5">
                    <p className="text-xs font-bold text-text-p">Direksi Eksekutif InternShape</p>
                    <p className="text-[10px] text-text-s">Kelulusan Digital Nasional</p>
                  </div>
                </div>

                {/* QR Code and verification placeholder */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="h-16 w-16 bg-white p-1 rounded-sm shadow-md flex items-center justify-center">
                    <QrCode size={56} className="text-bg" />
                  </div>
                  <span className="text-[9px] font-mono text-text-s block text-center uppercase tracking-wider">
                    KODE VERIFIKASI: <br /><b>{selectedProject.certificateId}</b>
                  </span>
                </div>

                {/* Sign 2: Project Mentor */}
                <div className="space-y-2 text-center md:text-right self-end">
                  <span className="font-mono text-[#00ffda] text-[10px] uppercase font-bold block">E-SIGNED BY</span>
                  <div className="h-10 flex items-center justify-center md:justify-end font-display italic text-[#c5a059] text-md">
                    {selectedProject.mentorName}
                  </div>
                  <div className="border-t border-border pt-1.5">
                    <p className="text-xs font-bold text-text-p">{selectedProject.mentorName}</p>
                    <p className="text-[10px] text-text-s">PIC Mentor & Staff Ahli {selectedProject.company}</p>
                  </div>
                </div>

              </div>

              {/* Graduation Stamp Badge */}
              <div className="pt-2 text-[10px] text-text-s font-mono text-center">
                Diterbitkan secara sah pada tanggal {selectedProject.finishedAt} melalui pangkalan data terakreditasi InternShape.
              </div>

            </div>

            {/* Instruction footnote info */}
            <div className="text-center text-xs text-text-s leading-relaxed no-print border-t border-border pt-4">
              Tips: Anda dapat mencetak sertifikat digital resmi ini secara langsung ke printer fisik atau menyimpannya sebagai file **PDF** beresolusi penuh menggunakan menu cetak sistem browser Anda.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
