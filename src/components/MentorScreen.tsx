/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mentor } from "../types";
import { INITIAL_MENTORS } from "../data";
import { 
  Search, 
  Star, 
  MapPin, 
  Briefcase, 
  Award, 
  Mail, 
  Calendar,
  Layers,
  X,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles
} from "lucide-react";

interface MentorScreenProps {
  onSendMessageToMentor?: (mentorName: string) => void;
}

export function MentorScreen({ onSendMessageToMentor }: MentorScreenProps) {
  const [mentors, setMentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string>("Semua");

  // Booking scheduler state
  const [activeBookingMentor, setActiveBookingMentor] = useState<Mentor | null>(null);
  const [scheduledSessions, setScheduledSessions] = useState([
    { id: 1, mentorName: "Dr. Sarah Jenkins", date: "28 Mei 2026", time: "14:00 - 15:00", topic: "Reviu CAD Prototipe", status: "Dikonfirmasi" }
  ]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00 - 11:00");
  const [bookingTopic, setBookingTopic] = useState("Reviu Arsitektur Perangkat Lunak");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Message alert state
  const [messageNotification, setMessageNotification] = useState<string | null>(null);

  // Extract all unique skills across all mentors for quick filtering
  const allSkills = ["Semua", ...Array.from(new Set(mentors.flatMap(m => m.skills)))];

  // Filter mentors
  const filteredMentors = mentors.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkill = selectedSkill === "Semua" || m.skills.includes(selectedSkill);
    
    return matchesSearch && matchesSkill;
  });

  // Handle direct send message
  const handleInitiateChat = (mentor: Mentor) => {
    if (onSendMessageToMentor) {
      onSendMessageToMentor(mentor.name);
    } else {
      setMessageNotification(`Mengalihkan ruang chat Anda ke ${mentor.name}. Hubungi rincian tugas di halaman Milestone.`);
      setTimeout(() => setMessageNotification(null), 4000);
    }
  };

  // Handle finalize booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate) return;

    const newSession = {
      id: Date.now(),
      mentorName: activeBookingMentor?.name || "Mentor",
      date: new Date(bookingDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      time: bookingTime,
      topic: bookingTopic,
      status: "Dikonfirmasi"
    };

    setScheduledSessions(prev => [...prev, newSession]);
    setBookingSuccess(true);

    setTimeout(() => {
      setActiveBookingMentor(null);
      setBookingSuccess(false);
      setBookingDate("");
      setBookingNotes("");
    }, 1500);
  };

  return (
    <div className="space-y-6" id="mentor_screen">
      {/* Title block */}
      <div>
        <h1 className="font-display text-2xl font-bold text-text-p md:text-3xl">Jaringan Mentor Ahli</h1>
        <p className="text-sm text-text-s">Berkonsultasi dan belajar langsung dari jajaran profesional terkemuka global.</p>
      </div>

      {messageNotification && (
        <div className="rounded bg-emerald-950/20 border border-emerald-800/30 p-4 text-sm text-emerald-400 animate-fade-in flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-400 animate-bounce" />
          <span>{messageNotification}</span>
        </div>
      )}

      {/* Main split: left: mentors, right: schedule logs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        
        {/* Left side filters + mentors list */}
        <div className="space-y-6 lg:col-span-3">
          {/* Filters Bar card */}
          <div className="rounded border border-border bg-surface p-5 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-text-s" />
              <input 
                type="text" 
                placeholder="Cari mentor berdasarkan nama, perusahaan, peran..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border border-border bg-surface-light text-text-p py-2.5 pl-10 pr-4 text-sm outline-hidden transition focus:border-accent"
              />
            </div>

            {/* Quick Skill filter chips */}
            <div>
              <span className="block text-xs font-semibold text-text-s uppercase tracking-wider mb-2">Filter Keahlian Khusus</span>
              <div className="flex flex-wrap gap-2">
                {allSkills.map(skill => (
                  <button 
                    key={skill}
                    onClick={() => setSelectedSkill(skill)}
                    className={`rounded-xs px-3 py-1.5 text-xs font-medium cursor-pointer transition ${
                      selectedSkill === skill 
                        ? "bg-accent text-bg border border-accent" 
                        : "bg-surface-light text-text-s border border-border hover:bg-surface hover:text-text-p"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mentors Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredMentors.map(m => (
              <div key={m.id} className="flex flex-col rounded border border-border bg-surface p-6 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-accent/40">
                
                {/* Avatar and Main Info row */}
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded border border-border bg-accent/10 text-accent font-display font-bold text-lg flex items-center justify-center shrink-0 select-none">
                    {m.name.split(" ").filter(Boolean).map(n => n[0]).slice(0, 2).join("").toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-text-p text-md leading-tight">{m.name}</h3>
                    <p className="text-xs text-text-s font-medium mt-0.5">{m.role}</p>
                    
                    {/* Company info badge */}
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                      <Briefcase size={10} />
                      <span>{m.company}</span>
                    </div>
                  </div>
                </div>

                {/* Rating and count row */}
                <div className="mt-4 flex items-center gap-3 bg-surface-light p-2.5 rounded border border-border text-xs">
                  <div className="flex items-center gap-1 text-accent font-bold">
                    <Star size={14} className="fill-accent text-accent" />
                    <span>{m.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-border">|</span>
                  <div className="text-text-s">
                    Membimbing <span className="font-bold text-text-p">{m.studentsCount}</span> Siswa
                  </div>
                </div>

                {/* Bio text */}
                <p className="mt-3 text-xs text-text-s leading-relaxed flex-1">
                  {m.bio}
                </p>

                {/* Skills chips inside mentor */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.skills.map(s => (
                    <span key={s} className="rounded bg-surface-light border border-border px-2 py-0.5 text-[10px] font-semibold text-text-s">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleInitiateChat(m)}
                    className="inline-flex items-center justify-center gap-1.5 rounded border border-border hover:bg-surface-light py-2 text-xs font-semibold text-text-s transition"
                  >
                    <Mail size={13} />
                    <span>Hubungi Chat</span>
                  </button>
                  <button 
                    onClick={() => setActiveBookingMentor(m)}
                    className="inline-flex items-center justify-center gap-1.5 rounded bg-accent hover:bg-accent-hover py-2 text-xs font-bold text-bg transition active:scale-95 cursor-pointer"
                  >
                    <Calendar size={13} />
                    <span>Jadwalkan Sesi</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side schedule monitoring card */}
        <div className="space-y-6">
          <div className="rounded border border-border bg-surface p-5">
            <h2 className="font-display text-sm font-bold text-text-p uppercase tracking-wider mb-3">Live Jadwal Konsultasi</h2>
            <p className="text-xs text-text-s mb-4">Daftar agenda bimbingan virtual terbimbing yang sedang berjalan</p>

            <div className="space-y-3">
              {scheduledSessions.map(session => (
                <div key={session.id} className="rounded border border-border bg-surface-light p-3 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text-p">{session.mentorName}</span>
                    <span className="rounded bg-emerald-950/20 border border-emerald-800/50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">
                      {session.status}
                    </span>
                  </div>
                  <p className="italic text-text-s">{session.topic}</p>
                  <div className="flex justify-between items-center text-[10px] text-text-s font-semibold">
                    <span className="font-medium">{session.date}</span>
                    <span>{session.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border text-center">
              <span className="text-[10px] text-text-s block">Jadwal virtual disinkronkan langsung dengan Google Calendar API.</span>
            </div>
          </div>

          <div className="rounded border border-emerald-800/35 bg-emerald-950/25 p-5 text-xs text-emerald-400 space-y-2">
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles size={14} className="text-emerald-400" />
              <span>Sesi Tanya-Jawab Terbuka</span>
            </div>
            <p className="leading-relaxed text-text-s">
              Setiap hari Jumat pukul 14:00, seluruh mentor mengadakan reviu kode terbuka bersama. Pastikan draf tugas Milestone Anda sudah diunggah untuk direviu secara kolektif!
            </p>
          </div>
        </div>

      </div>

      {/* Booking Dialogue Scheduler Modal */}
      {activeBookingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded border border-border bg-surface p-6 shadow-2xl">
            
            {/* Success Booking state */}
            {bookingSuccess ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded bg-surface/95 z-10 text-center p-6">
                <div className="h-14 w-14 bg-emerald-950/25 rounded border border-emerald-800/50 flex items-center justify-center mb-3">
                  <CheckCircle size={32} className="text-emerald-400 animate-bounce" />
                </div>
                <h3 className="font-display text-lg font-bold text-text-p">Konsultasi Terjadwal!</h3>
                <p className="text-xs text-text-s mt-2 max-w-xs leading-relaxed">
                  Bimbingan virtual terjadwal bersama <b>{activeBookingMentor.name}</b> berhasil terdaftar. Rincian tautan ruang konferensi virtual dikirimkan ke kotak pesan Anda.
                </p>
              </div>
            ) : null}

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-accent font-semibold tracking-wider">Registrator Bimbingan Virtual</span>
                <h2 className="font-display text-md font-bold text-text-p">Jadwalkan Konsultasi</h2>
              </div>
              <button 
                onClick={() => setActiveBookingMentor(null)}
                className="rounded p-1 text-text-s hover:bg-surface-light hover:text-text-p transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Mentor info snippet */}
            <div className="my-4 flex items-center gap-3 rounded bg-surface-light p-3 border border-border">
              <div className="h-10 w-10 rounded-full border border-border bg-accent/15 text-accent font-display font-bold text-sm flex items-center justify-center shrink-0 select-none">
                {activeBookingMentor.name.split(" ").filter(Boolean).map(n => n[0]).slice(0, 2).join("").toUpperCase()}
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-text-p leading-none">{activeBookingMentor.name}</h4>
                <p className="text-xs text-text-s mt-1 leading-none">{activeBookingMentor.role} di {activeBookingMentor.company}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-s uppercase tracking-widest mb-1">Pilih Tanggal Sesi</label>
                <input 
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full rounded border border-border px-3 py-2 text-sm outline-hidden transition focus:border-accent bg-surface-light text-text-p"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-text-s uppercase tracking-widest mb-1">Slot Waktu</label>
                  <select 
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full rounded border border-border px-3 py-2 text-sm outline-hidden transition focus:border-accent bg-surface-light text-text-p"
                  >
                    <option value="09:00 - 10:00">09:00 - 10:00</option>
                    <option value="10:00 - 11:00">10:00 - 11:00</option>
                    <option value="13:00 - 14:00">13:00 - 14:00</option>
                    <option value="14:00 - 15:00">14:00 - 15:00</option>
                    <option value="15:30 - 16:30">15:30 - 16:30</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-s uppercase tracking-widest mb-1">Topik Utama</label>
                  <select 
                    value={bookingTopic}
                    onChange={(e) => setBookingTopic(e.target.value)}
                    className="w-full rounded border border-border px-3 py-2 text-sm outline-hidden transition focus:border-accent bg-surface-light text-text-p"
                  >
                    <option value="Reviu Arsitektur Perangkat Lunak">Reviu Arsitektur</option>
                    <option value="Reviu CAD Prototipe">Reviu CAD Prototipe</option>
                    <option value="Konsultasi Model Bisnis & Finansial">Model Bisnis & Finansial</option>
                    <option value="Review Kampanye Pemasaran Digital">Review Kampanye Pemasaran</option>
                    <option value="Bimbingan Karir & Kepemimpinan">Bimbingan Karir</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-s uppercase tracking-widest mb-1">Catatan Tambahan untuk Mentor (Opsional)</label>
                <textarea 
                  rows={2}
                  placeholder="Misalnya, 'Saya memiliki kendala pada performa API routing di framework saya...'"
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  className="w-full rounded border border-border px-3 py-2 text-sm outline-hidden transition focus:border-accent bg-surface-light text-text-p"
                />
              </div>

              {/* Actions Footer inside modal */}
              <div className="flex items-center justify-end gap-3 border-t border-border pt-4 mt-6">
                <button 
                  type="button"
                  onClick={() => setActiveBookingMentor(null)}
                  className="rounded border border-border px-4 py-2.5 text-xs font-bold text-text-s hover:bg-surface-light transition cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="rounded bg-accent hover:bg-accent-hover px-4 py-2.5 text-xs font-bold text-bg transition active:scale-95 cursor-pointer"
                >
                  Konfirmasi Jadwalkan ➔
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
