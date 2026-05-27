/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: "Pengembangan Web" | "Pemasaran Digital" | "Pembuatan Konten" | "Strategi Bisnis" | "Sains Data";
  difficulty: "Pemula" | "Menengah" | "Lanjutan";
  description: string;
  logoUrl: string;
  skillsNeeded: string[];
  mentorName: string;
  mentorAvatar: string;
  duration: number; // in months
  applied?: boolean;
  starred?: boolean;
  status?: "pending" | "accepted" | "rejected";
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  studentsCount: number;
  skills: string[];
  bio: string;
}

export interface MenteeProgress {
  id: string;
  name: string;
  avatarUrl: string;
  projectTitle: string;
  company: string;
  progress: number;
}

export interface Message {
  id: string;
  sender: "user" | "mentor";
  text: string;
  timestamp: string;
}

export interface Task {
  id: string;
  name: string;
  deadline?: string;
  submittedAt?: string;
  status: "selesai" | "sedang_berjalan" | "terkunci";
  feedback?: string;
}

export interface SharedResource {
  id: string;
  name: string;
  type: "document" | "spreadsheet" | "video";
}

export interface CompletedProject {
  id: string;
  title: string;
  category: "Pengembangan Web" | "Pemasaran Digital" | "Pembuatan Konten" | "Strategi Bisnis" | "Sains Data";
  company: string;
  mentorName: string;
  mentorAvatar: string;
  finishedAt: string;
  certificateId: string;
  milestones: {
    title: string;
    description: string;
    status: "completed";
    date: string;
    feedback: string;
  }[];
}

