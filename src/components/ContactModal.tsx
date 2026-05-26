import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Building2, 
  ExternalLink,
  ShieldCheck,
  Instagram,
  Youtube,
  Twitter
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Kemitraan UMKM',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  const contactOptions = [
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-600" />,
      title: "WhatsApp Center (Bot & Agen)",
      value: "+62 812-3456-7890",
      desc: "Balasan instan dalam 2 menit",
      href: "https://wa.me/6281234567890",
      color: "bg-emerald-50 border-emerald-100 text-emerald-700"
    },
    {
      icon: <Phone className="w-5 h-5 text-blue-600" />,
      title: "Telepon Kantor & Hotline",
      value: "(021) 5098-BIZ-99",
      desc: "Senin - Jumat 08:00 - 18:00 WIB",
      href: "tel:+6221509824995",
      color: "bg-blue-50 border-blue-100 text-blue-700"
    },
    {
      icon: <Mail className="w-5 h-5 text-purple-600" />,
      title: "Dukungan Email Resmi",
      value: "hello@smartbiz.co.id",
      desc: "Untuk proposal bisnis & kerja sama",
      href: "mailto:hello@smartbiz.co.id",
      color: "bg-purple-50 border-purple-100 text-purple-700"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Kemitraan UMKM',
      message: ''
    });
    setIsDone(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row my-8 text-left"
      >
        {/* Left Interactive Contact Form */}
        <div className="flex-1 p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Hubungi Kami
            </span>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!isDone ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-black font-display text-slate-900 tracking-tight">
                    Kirim Pesan Langsung
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Isi formulir di bawah ini dan asisten SmartBiz akan menyalurkan pertanyaan Anda ke tim yang tepat.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 p-0">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Nama Anda</label>
                      <input 
                        type="text"
                        required
                        placeholder="Contoh: Jovanka Audrey"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                      />
                    </div>
                    <div className="space-y-1.5 p-0">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Alamat Email</label>
                      <input 
                        type="email"
                        required
                        placeholder="audrey@cookies.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 p-0">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">No. Telepon / WhatsApp (Opsional)</label>
                      <input 
                        type="tel"
                        placeholder="08123456789"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                      />
                    </div>
                    <div className="space-y-1.5 p-0">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Subjek Pesan</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-bold outline-none bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-sans cursor-pointer"
                      >
                        <option value="Kemitraan UMKM">Kemitraan UMKM & Lisensi</option>
                        <option value="Bantuan Teknis">Bantuan Teknis & Demo</option>
                        <option value="Pertanyaan Penjualan">Pertanyaan Penjualan Enterprise</option>
                        <option value="Lainnya">Lainnya / Masukan Umum</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 p-0">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Isi Pertanyaan / Pesan Anda</label>
                    <textarea 
                      required
                      placeholder="Bagaimana SmartBiz menyinkronkan data stok ke IG shop kami?"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-xl font-bold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>Menyalurkan Pesan...</>
                    ) : (
                      <>
                        Kirim Pesan <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border-4 border-emerald-100 shadow-xl shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-black font-display text-slate-900 leading-tight">Pesan Terkirim!</h2>
                  <p className="text-slate-500 text-xs mt-1">Terima kasih atas pesan Anda, <span className="font-bold text-slate-800">{formData.name}</span>.</p>
                </div>

                <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl w-full max-w-md text-left text-xs font-medium space-y-2">
                  <div className="text-slate-400 uppercase tracking-wider text-[9px] font-bold">Rincian Tiket Masuk:</div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nomor Registrasi:</span>
                    <span className="font-mono text-slate-900 font-bold">#SBTK-{Math.floor(10000 + Math.random() * 90000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subjek Kategori:</span>
                    <span className="text-slate-900 font-bold">{formData.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Komitmen Layanan:</span>
                    <span className="text-blue-600 font-bold">Dalam 2 jam kerja</span>
                  </div>
                </div>

                <p className="text-slate-400 text-xs max-w-sm">Salinan tiket konfirmasi telah kami kirimkan ke alamat email <span className="text-slate-700 font-bold">{formData.email}</span>.</p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs"
                >
                  Ketik Pesan Baru
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Info Column */}
        <div className="w-full md:w-[340px] bg-slate-50 border-1 border-slate-100 p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h3 className="font-black font-display text-slate-900 text-lg">Kontak Langsung</h3>
              <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed font-medium">Bicara dengan spesialis SmartBiz melalui pintu komunikasi instan berikut:</p>
            </div>
            
            <div className="space-y-4">
              {contactOptions.map((opt, idx) => (
                <a
                  key={idx}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-2xl bg-white border border-slate-200/80 transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 group"
                >
                  <div className="flex gap-3">
                    <div className={cn("p-2 rounded-xl shrink-0 self-start border", opt.color)}>
                      {opt.icon}
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                        {opt.title} <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h5>
                      <span className="text-xs font-black text-slate-800 tracking-tight block">{opt.value}</span>
                      <p className="text-[10px] text-slate-400 font-medium">{opt.desc}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Corporate Location Details */}
            <div className="pt-4 border-t border-slate-200/60 text-left space-y-2">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 leading-normal">
                <Building2 className="w-4 h-4 text-slate-500" /> Kantor Pusat & Alamat
              </h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                Menara Cakrawala Lt. 15, Jl. M.H. Thamrin No. 9, RT.2/RW.1, Kel. Kebon Sirih, Kec. Menteng, Kota Jakarta Pusat, DKI Jakarta 10340
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/60 text-[10px] text-slate-400 font-bold space-y-2">
            <div className="flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Layanan Resmi Terdaftar Kominfo
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
