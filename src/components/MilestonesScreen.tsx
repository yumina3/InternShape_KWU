/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { Message, Task, SharedResource } from "../types";
import { INITIAL_CHAT, INITIAL_TASKS, INITIAL_RESOURCES } from "../data";
import { 
  CheckCircle, 
  Clock, 
  Lock, 
  Send, 
  UploadCloud, 
  FileText, 
  Paperclip, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  Download
} from "lucide-react";

export function MilestonesScreen() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_CHAT);
  const [resources, setResources] = useState<SharedResource[]>(INITIAL_RESOURCES);
  
  const [typedMessage, setTypedMessage] = useState("");
  const [isMentorTyping, setIsMentorTyping] = useState(false);
  
  // File Upload states
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scrolling ref for chat container
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Simulating sending messaging
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const userMsg: Message = {
      id: `msg_u_${Date.now()}`,
      sender: "user",
      text: typedMessage.trim(),
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    setTypedMessage("");

    // Scroll to bottom
    setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

    // Simulated Mentor Intelligent Typings responses
    setIsMentorTyping(true);
    setTimeout(() => {
      const mentorBank = [
        "Sangat bagus! Pastikan Anda juga memasukkan perkiraan biaya jangka panjang.",
        "Itu pemikiran yang bagus. Coba diskusikan dengan tim Sari Roti besok pada sesi tinjauan sprint.",
        "Kerja keras yang bagus! Saya sudah melihat unggahan Anda di sistem. Nanti akan saya kirimkan umpan balik tertulis.",
        "Coba gunakan pendekatan berbasis model daur ulang untuk mengurangi emisi karbon.",
        "Apakah Anda sudah mengunduh lembar 'Prakiraan_Anggaran.xlsx' di relasi berkas sebelah kanan?"
      ];
      const randomReply = mentorBank[Math.floor(Math.random() * mentorBank.length)];

      const mentorMsg: Message = {
        id: `msg_m_${Date.now()}`,
        sender: "mentor",
        text: randomReply,
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
      };

      setMessages(prev => [...prev, mentorMsg]);
      setIsMentorTyping(false);
      
      setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

    }, 2000);
  };

  // Simulating interactive File Upload tracking
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setUploadProgress(0);

    // Simulate ticking progress bar slowly
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          
          // Dynamically change Milestone 2 task to completed!
          setTasks(currentTasks => currentTasks.map(t => {
            if (t.id === "tsk_2") {
              return { 
                ...t, 
                status: "selesai", 
                submittedAt: "Baru Saja",
                feedback: "Berkas tugas disimpan di server. Menunggu evaluasi kelulusan dari Sarah Jenkins." 
              };
            }
            // Unlock milestone 3 as well!
            if (t.id === "tsk_3") {
              return { ...t, status: "sedang_berjalan", deadline: "12 Nov 2024" };
            }
            return t;
          }));

          // Add file to shared resources
          const newResource: SharedResource = {
            id: `res_${Date.now()}`,
            name: file.name,
            type: "document"
          };
          setResources(prevRes => [...prevRes, newResource]);

          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const triggerSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6" id="milestones_screen">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl font-bold text-text-p md:text-3xl">Milestone Kerja & Bimbingan</h1>
        <p className="text-sm text-text-s">Kelola target pencapaian mingguan Anda, unggah tugas, dan diskusikan langsung bersama mentor.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Left Column: Milestones Timeline + File Upload (Span 2) */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Timeline Block */}
          <div className="rounded border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-bold text-text-p mb-6">Garis Waktu Milestone Proyek</h2>
            
            <div className="relative pl-6 border-l border-border space-y-8">
              {tasks.map((tsk, i) => (
                <div key={tsk.id} className="relative">
                  
                  {/* Indicator Dot Icon mapping based on task status */}
                  <div className={`absolute -left-[31px] top-1 h-5 w-5 rounded-full border-4 border-surface flex items-center justify-center ${
                    tsk.status === "selesai" ? "bg-emerald-500" :
                    tsk.status === "sedang_berjalan" ? "bg-accent animate-pulse" :
                    "bg-border"
                  }`}>
                    {tsk.status === "selesai" && <CheckCircle size={10} className="text-white shrink-0" />}
                  </div>

                  {/* Body Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className={`text-sm font-bold ${tsk.status === "terkunci" ? "text-text-s" : "text-text-p"}`}>
                        {tsk.name}
                      </h4>
                      <p className="text-xs text-text-s mt-1">
                        {tsk.status === "selesai" ? (
                          <span className="text-emerald-500 font-semibold">Diselesaikan pada {tsk.submittedAt}</span>
                        ) : tsk.status === "sedang_berjalan" ? (
                          <span className="text-accent font-medium">Batas Pengumpulan: {tsk.deadline}</span>
                        ) : (
                          <span className="text-text-s flex items-center gap-1">
                            <Lock size={12} />
                            Terkunci (Selesaikan tahap sebelumnya)
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Quick Badge */}
                    <span className={`inline-flex self-start rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      tsk.status === "selesai" ? "bg-emerald-950/20 border border-emerald-800/50 text-emerald-400" :
                      tsk.status === "sedang_berjalan" ? "bg-accent/10 border border-accent/20 text-accent" :
                      "bg-surface-light border border-border text-text-s"
                    }`}>
                      {tsk.status === "selesai" ? "Disetujui" : tsk.status === "sedang_berjalan" ? "Sedang Berjalan" : "Terkunci"}
                    </span>
                  </div>

                  {/* Feedback text from system if any */}
                  {tsk.feedback && (
                    <div className="mt-2.5 rounded bg-emerald-950/15 border border-emerald-800/30 p-3 text-xs text-text-s">
                      <p className="font-semibold text-emerald-400">Umpan Balik Mentor:</p>
                      <p className="mt-1 leading-relaxed ">{tsk.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive File Drag and Drop zone */}
          <div className="rounded border border-dashed border-border bg-surface p-8 text-center">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              id="milestone_file_picker"
              accept=".pdf,.zip,.xlsx,.png,.jpg"
            />
            
            {uploadProgress === null ? (
              <div onClick={triggerSelectFile} className="cursor-pointer group space-y-3">
                <div className="mx-auto h-12 w-12 bg-accent/10 text-accent rounded flex items-center justify-center transition group-hover:bg-accent/20 group-hover:scale-105">
                  <UploadCloud size={24} />
                </div>
                <h3 className="font-display text-sm font-bold text-text-p">
                  Unggah Laporan Hasil Milestone 2
                </h3>
                <p className="text-xs text-text-s max-w-sm mx-auto leading-relaxed">
                  Pilih file PDF, model CAD (.zip), atau dokumen Excel untuk diunggah. Sistem akan otomatis memperbarui pengumpulan tugas Anda secara langsung ke mentor.
                </p>
                <button type="button" className="inline-flex items-center gap-1 rounded bg-accent/10 border border-accent/20 px-3 py-1.5 text-xs font-bold text-accent">
                  Pilih Berkas Tugas
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto h-12 w-12 bg-accent/10 text-accent rounded flex items-center justify-center">
                  <Clock size={24} className="animate-spin" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-p">Mengunggah: <span className="font-semibold text-accent">{uploadedFileName}</span></h4>
                  <p className="text-xs text-text-s mt-1">Harap tunggu, berkas sedang didaftarkan ke API repositori...</p>
                </div>

                {/* Progress bar */}
                <div className="max-w-xs mx-auto text-text-s">
                  <div className="flex justify-between items-center text-xs text-text-s mb-1">
                    <span>Kemajuan</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded bg-surface-light overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-150" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>

                {uploadProgress >= 100 && (
                  <div className="rounded bg-emerald-950/20 border border-emerald-800/50 p-2.5 max-w-xs mx-auto text-xs text-emerald-400 font-bold animate-fade-in">
                    ✔ Selesai! Milestone berhasil diperbarui.
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Chat Room & Shared Files */}
        <div className="space-y-6">
          
          {/* Chat widget card */}
          <div className="rounded border border-border bg-surface overflow-hidden flex flex-col h-[400px]">
            {/* Chat header */}
            <div className="bg-surface-light border-b border-border p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full border border-border bg-accent/15 text-accent font-display font-bold text-xs flex items-center justify-center shrink-0 select-none">
                SJ
              </div>
              <div className="text-left">
                <h3 className="font-display font-semibold text-xs leading-none text-text-p">Bimbingan Dr. Sarah Jenkins</h3>
                <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-accent font-semibold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                  </span>
                  Aktif Online
                </span>
              </div>
            </div>

            {/* Chat scrolls messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-light">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div className={`rounded px-3.5 py-2.5 text-xs ${
                    msg.sender === "user" 
                      ? "bg-accent text-bg rounded-br-none font-medium" 
                      : "bg-surface border border-border text-text-p rounded-bl-none"
                  }`}>
                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-text-s mt-1">{msg.timestamp}</span>
                </div>
              ))}

              {/* Typing indicator */}
              {isMentorTyping && (
                <div className="mr-auto items-start max-w-[80%] flex flex-col">
                  <div className="rounded px-3.5 py-3 bg-surface border border-border text-xs">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                  <span className="text-[9px] text-text-s mt-1">Menulis tanggapan...</span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Chat footer input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-surface flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Diskusikan tugas atau reviu coding..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 rounded border border-border px-3 py-2 text-xs outline-hidden focus:border-accent bg-surface-light text-text-p transition"
              />
              <button 
                type="submit"
                className="rounded bg-accent hover:bg-accent-hover p-2 text-bg transition active:scale-95 cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

          {/* Shared files list card */}
          <div className="rounded border border-border bg-surface p-5">
            <h3 className="font-display text-xs font-bold text-text-p uppercase tracking-wider mb-3">Relasi Berkas Bimbingan</h3>
            <p className="text-xs text-text-s mb-4">Akses berkas acuan, format laporan, dokumen brief, dan rekaman evaluasi</p>

            <div className="space-y-2.5">
              {resources.map(res => (
                <div key={res.id} className="flex items-center justify-between p-2.5 rounded border border-border bg-surface-light hover:bg-white/[0.01] transition text-xs">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-accent" />
                    <span className="font-semibold text-text-p text-xs">{res.name}</span>
                  </div>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); alert(`Mulai mengunduh berkas acuan: ${res.name}`); }}
                    className="rounded hover:bg-surface-light p-1.5 text-text-s hover:text-accent transition"
                    title="Unduh Berkas"
                  >
                    <Download size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
