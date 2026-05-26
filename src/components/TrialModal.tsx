import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Home,
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  User, 
  Mail, 
  Smartphone, 
  Lock, 
  TrendingUp, 
  ShieldCheck, 
  Loader2, 
  Clock, 
  Store,
  Compass,
  Briefcase
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrialActivated: (businessName: string, category: string) => void;
}

export default function TrialModal({ isOpen, onClose, onTrialActivated }: TrialModalProps) {
  const [step, setStep] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [setupCheckpoints, setSetupCheckpoints] = React.useState<string[]>([]);
  const [currentCheckpointIndex, setCurrentCheckpointIndex] = React.useState(0);

  const [formData, setFormData] = React.useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    businessCategory: 'F&B',
    businessScale: 'Mikro (1-5 Karyawan)',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const categories = [
    { id: 'F&B', label: 'Kuliner / Cafe / F&B', icon: <Store className="w-5 h-5 text-amber-500" />, desc: 'Manajemen resep menu, stok bahan baku, penjualan kasir harian.' },
    { id: 'Retail', label: 'Ritel / Toko Sembako', icon: <Briefcase className="w-5 h-5 text-blue-500" />, desc: 'Scan barcode produk otomatis, peringatan stok menipis, diskon multi-item.' },
    { id: 'Fashion', label: 'Fashion / Pakaian / Aksesoris', icon: <Sparkles className="w-5 h-5 text-pink-500" />, desc: 'Manajemen variasi warna & ukuran, integrasi katalog foto sosial media.' },
    { id: 'Services', label: 'Jasa / Jasa Digital / Laundry', icon: <Compass className="w-5 h-5 text-purple-500" />, desc: 'Penjadwalan janji temu, kuitansi digital otomatis, pelacakan upah tim.' },
  ];

  const checkpointsList = [
    "Menyiapkan database lokal aman SHA-256...",
    "Membuat sambungan dasbor real-time...",
    "Membekali asisten AI dengan parameter bisnis Anda...",
    "Menghubungkan gerbang invoice digital uji coba...",
    "Finishing: Mengaktivasi lisensi 14 hari gratis..."
  ];

  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsLoading(false);
      setErrors({});
      setCurrentCheckpointIndex(0);
      setSetupCheckpoints([]);
    }
  }, [isOpen]);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Nama lengkap Anda wajib diisi";
    if (!formData.businessName.trim()) errs.businessName = "Nama bisnis Anda wajib diisi";
    
    if (!formData.email.trim()) {
      errs.email = "Alamat email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Format email tidak valid";
    }
    
    if (!formData.phone.trim()) {
      errs.phone = "Nomor WhatsApp wajib diisi";
    } else if (formData.phone.replace(/\D/g, '').length < 9) {
      errs.phone = "Nomor WhatsApp minimal 9 digit";
    }
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    }
  };

  const triggerSetupSimulation = () => {
    setIsLoading(true);
    setStep(3);
    setSetupCheckpoints([]);
    setCurrentCheckpointIndex(0);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < checkpointsList.length) {
        setSetupCheckpoints(prev => [...prev, checkpointsList[currentIndex]]);
        setCurrentCheckpointIndex(currentIndex);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsLoading(false);
        setStep(4); // Success step
      }
    }, 1200);
  };

  const handleCompleteActivation = () => {
    onTrialActivated(formData.businessName, formData.businessCategory);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row my-8"
      >
        {/* Left Interactive Panel */}
        <div className="flex-1 p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {step === 4 ? "Selesai" : `Langkah ${step} dari 3`}
            </span>
            {step < 3 && (
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Step indicator bar */}
          {step <= 3 && (
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={cn(
                    "h-1.5 rounded-full flex-1 transition-all duration-300",
                    step === s ? "bg-blue-600 w-full" : step > s ? "bg-emerald-500" : "bg-slate-100"
                  )} 
                />
              ))}
            </div>
          )}

          {/* Stepped Views */}
          <div className="min-h-[340px]">
            {/* STEP 1: PERSONAL & BUSINESS DETAILS */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-black font-display text-slate-900 tracking-tight flex items-center gap-2">
                    <Sparkles className="text-blue-600 w-6 h-6 shrink-0" />
                    Mulai Uji Coba Gratis 14 Hari
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Aktifkan semua fitur operasional SmartBiz premium secara gratis tanpa membutuhkan kartu kredit.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" /> Nama Lengkap Anda
                    </label>
                    <input 
                      type="text"
                      placeholder="Contoh: Jovanka Audrey"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={cn(
                        "w-full p-4 rounded-xl border text-sm font-medium outline-none transition-all",
                        errors.fullName ? "border-red-500 bg-red-50/20" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      )}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs font-bold">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" /> Nama Bisnis / UMKM
                    </label>
                    <input 
                      type="text"
                      placeholder="Contoh: Sweet Crumbs Bakery"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className={cn(
                        "w-full p-4 rounded-xl border text-sm font-medium outline-none transition-all",
                        errors.businessName ? "border-red-500 bg-red-50/20" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      )}
                    />
                    {errors.businessName && <p className="text-red-500 text-xs font-bold">{errors.businessName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Aktif
                    </label>
                    <input 
                      type="email"
                      placeholder="audrey@cookies.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={cn(
                        "w-full p-4 rounded-xl border text-sm font-medium outline-none transition-all",
                        errors.email ? "border-red-500 bg-red-50/20" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      )}
                    />
                    {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-slate-400" /> No. WhatsApp
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">+62</span>
                      <input 
                        type="tel"
                        placeholder="8123456789"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        className={cn(
                          "w-full p-4 pl-14 rounded-xl border text-sm font-medium outline-none transition-all",
                          errors.phone ? "border-red-500 bg-red-50/20" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                        )}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Skala Jumlah Karyawan</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Mikro (1-5)", "Sederhana (6-20)", "Menengah (21+)"].map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        onClick={() => setFormData({ ...formData, businessScale: scale })}
                        className={cn(
                          "p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer",
                          formData.businessScale === scale 
                            ? "bg-slate-900 border-slate-900 text-white shadow" 
                            : "bg-transparent border-slate-200 text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        {scale}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: CATEGORY SELECTION */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 text-left"
              >
                <div>
                  <h2 className="text-2xl font-black font-display text-slate-900 mb-1">Pilih Bidang Bisnis Anda</h2>
                  <p className="text-slate-500 text-sm">Ini membantu asisten kecerdasan kami mengompilasi dasbor dan stok default yang paling presisi untuk operasi Anda.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, businessCategory: cat.id })}
                      className={cn(
                        "p-5 rounded-2xl border text-left flex gap-4 transition-all hover:bg-slate-50/40 cursor-pointer",
                        formData.businessCategory === cat.id 
                          ? "bg-blue-50/40 border-blue-600 ring-2 ring-blue-500/10" 
                          : "bg-white border-slate-200"
                      )}
                    >
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 shrink-0 self-start">
                        {cat.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          {cat.label}
                          {formData.businessCategory === cat.id && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">{cat.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: DATABASE GENERATION INTERACTIVE SCREEN */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center space-y-6"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl border-4 border-slate-100 flex items-center justify-center text-blue-600 shadow-lg relative bg-white">
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 -m-3 border border-blue-400/20 rounded-[1.75rem] animate-ping opacity-30" />
                </div>

                <div className="max-w-md">
                  <h3 className="text-xl font-bold font-display text-slate-900 mb-2">Instalasi Ruang Kerja Anda</h3>
                  <p className="text-slate-400 text-xs">Sedang memproses konfigurasi dasar untuk <span className="font-bold text-slate-800">{formData.businessName}</span>...</p>
                </div>

                {/* Progress Checkpoints list */}
                <div className="w-full max-w-sm bg-slate-50 rounded-2xl p-4 border border-slate-200/60 text-left space-y-3">
                  {checkpointsList.map((checkpoint, index) => {
                    const isPassed = index < currentCheckpointIndex;
                    const isCurrent = index === currentCheckpointIndex;
                    return (
                      <div key={index} className="flex items-center gap-2.5 text-xs font-medium">
                        <div className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0 border",
                          isPassed ? "bg-emerald-500 border-emerald-500 text-white" : isCurrent ? "border-blue-600 bg-white" : "border-slate-300 bg-transparent"
                        )}>
                          {isPassed ? (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          ) : isCurrent ? (
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping" />
                          ) : null}
                        </div>
                        <span className={cn(
                          isPassed ? "text-slate-400 line-through" : isCurrent ? "text-slate-900 font-bold" : "text-slate-300"
                        )}>
                          {checkpoint}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS ACTIVE TRIAL CARD CARD */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border-4 border-emerald-100 shadow-xl shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-black font-display text-slate-900 leading-tight">Uji Coba Gratis Aktif!</h2>
                  <p className="text-slate-500 text-xs mt-1">Kami telah membuatkan instansi sandbox operasional 14 hari khusus.</p>
                </div>

                {/* Trial Member Visual Card */}
                <div className="relative w-full max-w-sm bg-gradient-to-tr from-slate-900 to-slate-800 rounded-3xl p-6 text-white text-left overflow-hidden shadow-2xl shadow-blue-900/15">
                  <div className="absolute right-0 top-0 -mr-6 -mt-6 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                  
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider bg-blue-500 text-white px-2.5 py-1 rounded-md">SmartBiz Sandbox</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 font-bold">
                      <Clock className="w-3.5 h-3.5 text-blue-400 animate-spin" /> 14 Hari Tersisa
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">NAMA PERUSAHAAN</span>
                      <span className="text-lg font-black tracking-tight">{formData.businessName || "Sweet Crumbs Bakery"}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[8px] text-slate-500 block">ADMINISTRATOR</span>
                        <span className="text-xs font-bold truncate block">{formData.fullName || "Admin User"}</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-500 block">KATEGORI DASHBOARD</span>
                        <span className="text-xs font-bold uppercase">{formData.businessCategory}</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-700 w-full my-4 opacity-40" />
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Lisensi Valid</span>
                    <span>No. ID: SBOX-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-medium max-w-sm">
                  Selamat berjelajah! Anda sekarang bisa memasukkan stok riil barumu, laporan keuangan mini, serta merekam penjualan secara langsung.
                </div>
              </motion.div>
            )}
          </div>

          {/* Buttons Navigation panel */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-100 mt-8">
            {/* Left aligned button(s) */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {step === 1 && (
                <button
                  onClick={onClose}
                  className="py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-all font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                >
                  <Home className="w-4 h-4" /> Kembali ke Beranda
                </button>
              )}
              {step > 1 && step < 3 && (
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-all font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Kembali
                  </button>
                  <button
                    onClick={onClose}
                    className="text-xs text-slate-400 hover:text-slate-600 font-bold transition-all underline decoration-dotted underline-offset-4 cursor-pointer"
                  >
                    Kembali ke Beranda
                  </button>
                </div>
              )}
              {step === 4 && (
                <button
                  onClick={onClose}
                  className="py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-all font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer w-full justify-center"
                >
                  <Home className="w-4 h-4" /> Kembali ke Beranda
                </button>
              )}
            </div>

            {/* Right aligned button(s) */}
            <div className="w-full sm:w-auto">
              {step === 1 && (
                <button
                  onClick={handleNextStep}
                  className="py-3.5 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all w-full justify-center animate-pulse"
                >
                  Lanjutkan <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {step === 2 && (
                <button
                  onClick={triggerSetupSimulation}
                  className="py-3.5 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all w-full justify-center"
                >
                  Aktifkan Trial Sekarang <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                </button>
              )}

              {step === 4 && (
                <button
                  onClick={handleCompleteActivation}
                  className="py-3.5 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs sm:text-sm transition-all text-center w-full justify-center flex items-center gap-2"
                >
                  Masuk ke Dasbor Sandbox Gratis <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Info Column */}
        {step < 4 && (
          <div className="w-full md:w-[320px] bg-slate-50 border-1 border-slate-100 p-8 flex flex-col justify-between text-left">
            <div className="space-y-6">
              <h3 className="font-black font-display text-slate-900 text-lg">Mengapa Memilih SmartBiz?</h3>
              
              <ul className="space-y-4">
                {[
                  { title: "Tanpa Risiko Bank", desc: "Tidak memerlukan rincian kartu kredit untuk mendaftar." },
                  { title: "Dukungan Migrasi", desc: "Kami bantu impor data inventory Excel lama Anda." },
                  { title: "E-Wallet Instant", desc: "Dukungan pembayaran QRIS untuk mempermudah penjualan." },
                  { title: "Tautan Medsos Otomatis", desc: "Unggah stok terupdate ke IG/TikTok dengan satu klik." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-200/60 text-[10px] text-slate-400 font-bold space-y-2">
              <div className="flex items-center gap-1.5 justify-center">
                <Lock className="w-3.5 h-3.5 text-blue-600" /> Secure SSL 256-bit Encryption
              </div>
              <div className="text-center">Keamanan data bisnis Anda dilindungi oleh enkripsi penuh.</div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
