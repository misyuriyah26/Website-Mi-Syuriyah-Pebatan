'use client';

import React from 'react';
import { ContactMessage } from '@/lib/types';
import { Mail, Trash2, CheckCircle2, MessageCircle, Clock, User } from 'lucide-react';

interface MessagesManagerProps {
  messages: ContactMessage[];
  onSaveMessages: (newMessages: ContactMessage[]) => void;
}

export const MessagesManager: React.FC<MessagesManagerProps> = ({
  messages,
  onSaveMessages,
}) => {
  const handleToggleRead = (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, is_read: !m.is_read } : m));
    onSaveMessages(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      const updated = messages.filter((m) => m.id !== id);
      onSaveMessages(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-emerald-950">Kotak Masuk Pesan Kontak</h2>
          <p className="text-xs text-slate-500">Pesan dan pertanyaan masyarakat dari form website</p>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-5 rounded-2xl border transition-all ${
              msg.is_read
                ? 'bg-white border-slate-200'
                : 'bg-emerald-50/60 border-emerald-300 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-800" />
                <span className="font-bold text-emerald-950 text-sm">{msg.name}</span>
                <span className="text-xs text-slate-500 font-mono">({msg.email_or_phone})</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {new Date(msg.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            <div className="py-3 space-y-1">
              <h4 className="font-bold text-xs text-amber-800 uppercase tracking-wide">
                Subjek: {msg.subject}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {msg.message}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                onClick={() => handleToggleRead(msg.id)}
                className="text-xs font-bold text-slate-600 hover:text-emerald-800 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{msg.is_read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/62${msg.email_or_phone.replace(/[^0-9]/g, '').replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded bg-emerald-100 text-emerald-900 font-bold hover:bg-emerald-200 flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Balas WA
                </a>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="px-3 py-1 rounded bg-red-50 text-red-800 font-bold hover:bg-red-100 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                </button>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">Belum ada pesan kontak masuk.</p>
          </div>
        )}
      </div>
    </div>
  );
};
