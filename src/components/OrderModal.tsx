import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CreditCard, 
  QrCode, 
  Building2, 
  Copy, 
  Check, 
  Loader2, 
  Lock, 
  CheckCircle2, 
  Shield, 
  Info,
  Smartphone,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    name: string;
    price: string;
    billingCycle: 'monthly' | 'annually';
  } | null;
  onPaymentSuccess: (planName: string, billingCycle: 'monthly' | 'annually') => void;
}

export default function OrderModal({ isOpen, onClose, selectedPlan, onPaymentSuccess }: OrderModalProps) {
  const [step, setStep] = React.useState(1);
  const [copied, setCopied] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  
  // Form State
  const [formData, setFormData] = React.useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    businessCategory: 'retail',
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // Payment State
  const [paymentMethod, setPaymentMethod] = React.useState<'qris' | 'va' | 'cc'>('qris');
  const [selectedBank, setSelectedBank] = React.useState<'bca' | 'mandiri' | 'bni'>('bca');
  
  // CC State
  const [ccNumber, setCcNumber] = React.useState('');
  const [ccName, setCcName] = React.useState('');
  const [ccExpiry, setCcExpiry] = React.useState('');
  const [ccCvv, setCcCvv] = React.useState('');
  const [ccFocus, setCcFocus] = React.useState<'number' | 'name' | 'expiry' | 'cvv' | null>(null);

  // Generated Mock Data
  const [orderId] = React.useState(() => `SB-${Math.floor(100000 + Math.random() * 900000)}`);
  const [virtualAccount] = React.useState(() => {
    const bankPrefix = selectedBank === 'bca' ? '88301' : selectedBank === 'mandiri' ? '88002' : '88553';
    return `${bankPrefix}08${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  });

  // Reset steps & data when plan changes or modal reopens
  React.useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsProcessing(false);
      setErrors({});
    }
  }, [isOpen, selectedPlan]);

  if (!isOpen || !selectedPlan) return null;

  // Pricing calculations
  const isAnnual = selectedPlan.billingCycle === 'annually';
  const priceInt = parseInt(selectedPlan.price, 10) * 1000; // e.g., 199 -> 199000
  const monthlyLabel = priceInt.toLocaleString('id-ID');
  
  // Total
  const subTotal = isAnnual ? priceInt * 12 : priceInt;
  const vat = Math.floor(subTotal * 0.11); // 11% PPN
  const totalPayment = subTotal + vat;

  // Validation
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Nama lengkap wajib diisi";
    if (!formData.businessName.trim()) newErrors.businessName = "Nama bisnis wajib diisi";
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor WhatsApp wajib diisi";
    } else if (formData.phone.length < 9) {
      newErrors.phone = "Nomor WhatsApp minimal 9 digit";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCopyVA = () => {
    navigator.clipboard.writeText(virtualAccount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
      onPaymentSuccess(selectedPlan.name, selectedPlan.billingCycle);
    }, 2000);
  };

  const handleCcNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCcNumber(formatted);
  };

  const handleCcExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    if (value.length > 2) {
      setCcExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
      setCcExpiry(value);
    }
  };

  const formattedTotal = totalPayment.toLocaleString('id-ID');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row my-8"
      >
        {/* Left Side: Steps Panel */}
        <div className="flex-1 p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Langkah {step} dari 4
              </span>
            </div>
            {step < 4 && (
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Stepper Wizard (visual guide) */}
          {step < 4 && (
            <div className="flex items-center gap-2 mb-10 w-full">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors shrink-0",
                    step === s 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                      : step > s 
                        ? "bg-emerald-500 text-white" 
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                  )}>
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={cn(
                      "h-1 w-full rounded-full transition-colors",
                      step > s ? "bg-emerald-500" : "bg-slate-100"
                    )} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Stepped Views Container */}
          <div className="min-h-[360px]">
            {/* STEP 1: INFORMASI BISNIS */}
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-black font-display text-slate-900 mb-1">Informasi Bisnis Anda</h2>
                  <p className="text-slate-500 text-sm">Silakan isi formulir di bawah ini untuk memulai aktivasi instan.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Nama Lengkap Pemilik</label>
                      <input 
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={cn(
                          "w-full p-4 rounded-xl border text-sm font-medium transition-all outline-none",
                          errors.fullName ? "border-red-500 bg-red-50/20 focus:ring-1 focus:ring-red-500" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                        )}
                      />
                      {errors.fullName && <p className="text-red-500 text-xs font-bold mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Nama Bisnis / UMKM</label>
                      <input 
                        type="text"
                        placeholder="Contoh: Kopi Sederhana"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className={cn(
                          "w-full p-4 rounded-xl border text-sm font-medium transition-all outline-none",
                          errors.businessName ? "border-red-500 bg-red-50/20 focus:ring-1 focus:ring-red-500" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                        )}
                      />
                      {errors.businessName && <p className="text-red-500 text-xs font-bold mt-1">{errors.businessName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Email Bisnis</label>
                      <input 
                        type="email"
                        placeholder="budi@kopisederhana.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={cn(
                          "w-full p-4 rounded-xl border text-sm font-medium transition-all outline-none",
                          errors.email ? "border-red-500 bg-red-50/20 focus:ring-1 focus:ring-red-500" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                        )}
                      />
                      {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">No. WhatsApp / Kontak</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">+62</span>
                        <input 
                          type="tel"
                          placeholder="81234567890"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                          className={cn(
                            "w-full p-4 pl-14 rounded-xl border text-sm font-medium transition-all outline-none",
                            errors.phone ? "border-red-500 bg-red-50/20 focus:ring-1 focus:ring-red-500" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                          )}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Kategori Bisnis</label>
                    <select
                      value={formData.businessCategory}
                      onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                      className="w-full p-4 rounded-xl border border-slate-200 text-sm font-medium bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none"
                    >
                      <option value="retail">Ritel / Toko Kelontong</option>
                      <option value="f&b">Kuliner & Cafe (F&B)</option>
                      <option value="service">Jasa / Konsultan</option>
                      <option value="manufacture">Manufaktur / Kerajinan</option>
                      <option value="other">Bidang Lainnya</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: METODE PEMBAYARAN */}
            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-black font-display text-slate-900 mb-1">Pilih Metode Pembayaran</h2>
                  <p className="text-slate-500 text-sm">Semua pembayaran aman dan langsung dikonfirmasi otomatis.</p>
                </div>

                <div className="space-y-3">
                  {/* QRIS Card */}
                  <button 
                    onClick={() => setPaymentMethod('qris')}
                    className={cn(
                      "w-full p-5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer",
                      paymentMethod === 'qris' 
                        ? "bg-blue-50/30 border-blue-600 ring-2 ring-blue-500/10" 
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                        paymentMethod === 'qris' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
                      )}>
                        <QrCode className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">QRIS / E-Wallet</h4>
                        <p className="text-xs text-slate-400 mt-0.5">GoPay, OVO, ShopeePay, DANA, LinkAja (Instan)</p>
                      </div>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                      paymentMethod === 'qris' ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                    )}>
                      {paymentMethod === 'qris' && <Check className="w-3 h-3" />}
                    </div>
                  </button>

                  {/* Virtual Account Card */}
                  <button 
                    onClick={() => setPaymentMethod('va')}
                    className={cn(
                      "w-full p-5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer",
                      paymentMethod === 'va' 
                        ? "bg-blue-50/30 border-blue-600 ring-2 ring-blue-500/10" 
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                        paymentMethod === 'va' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
                      )}>
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Virtual Account (Transfer Bank)</h4>
                        <p className="text-xs text-slate-400 mt-0.5">BCA, Mandiri, BNI, BRI (Konfirmasi Otomatis)</p>
                      </div>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                      paymentMethod === 'va' ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                    )}>
                      {paymentMethod === 'va' && <Check className="w-3 h-3" />}
                    </div>
                  </button>

                  {/* Credit Card Card */}
                  <button 
                    onClick={() => setPaymentMethod('cc')}
                    className={cn(
                      "w-full p-5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer",
                      paymentMethod === 'cc' 
                        ? "bg-blue-50/30 border-blue-600 ring-2 ring-blue-500/10" 
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                        paymentMethod === 'cc' ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
                      )}>
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Kartu Kredit / Visa / Mastercard</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Pembayaran multi-grup terenkripsi SHA-256</p>
                      </div>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center shrink-0",
                      paymentMethod === 'cc' ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
                    )}>
                      {paymentMethod === 'cc' && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                </div>

                {paymentMethod === 'va' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-3 gap-3"
                  >
                    {(['bca', 'mandiri', 'bni'] as const).map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={cn(
                          "py-3 rounded-lg border text-xs font-black uppercase text-center transition-all cursor-pointer",
                          selectedBank === bank 
                            ? "bg-white border-blue-600 text-blue-600 shadow-sm" 
                            : "bg-transparent border-slate-200 text-slate-500 hover:bg-slate-100"
                        )}
                      >
                        {bank}
                      </button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* STEP 3: PROSES DETAIL PEMBAYARAN */}
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-black font-display text-slate-900 mb-1">
                    {paymentMethod === 'qris' ? 'Scan & Selesaikan Pembayaran' : paymentMethod === 'va' ? 'Kirim ke Virtual Account' : 'Detail Kartu Kredit'}
                  </h2>
                  <p className="text-slate-500 text-sm">Review detail Anda sebelum mengaktifkan dasbor premium kami.</p>
                </div>

                {/* QRIS Interactive UI */}
                {paymentMethod === 'qris' && (
                  <div className="flex flex-col sm:flex-row items-center gap-8 bg-slate-50 border border-slate-200/60 p-6 rounded-3xl">
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-md flex flex-col items-center">
                      {/* Built custom vector grid QR simulation to avoid absolute external link dependencies */}
                      <div className="w-40 h-40 bg-slate-100 rounded-lg flex flex-col items-center justify-center p-3 text-slate-700 relative overflow-hidden">
                        <div className="grid grid-cols-4 gap-2 w-full h-full opacity-80">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={cn(
                                "rounded-sm",
                                (i % 2 === 0 || i === 0 || i === 3 || i === 12 || i === 15) ? "bg-slate-900" : "bg-slate-200"
                              )} 
                            />
                          ))}
                        </div>
                        {/* Overlay custom Badge logo */}
                        <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-xl shadow border border-slate-100 flex items-center justify-center">
                          <span className="text-[9px] font-black text-blue-600">QRIS</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-400 mt-2">NMID: ID10294721495</span>
                    </div>

                    <div className="flex-1 space-y-4 text-center sm:text-left">
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">SCAN UNTUK BAYAR</div>
                        <div className="text-3xl font-black text-slate-900">Rp {formattedTotal}</div>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-2 bg-blue-50 border border-blue-100 text-blue-700 p-2 px-3 rounded-lg max-w-max text-xs font-semibold">
                        <Smartphone className="w-4 h-4" /> Buka GoPay, ShopeePay, OVO, LinkAja atau M-Banking
                      </div>
                      <div className="text-slate-400 text-xs">
                        Silakan klik tombol di bawah untuk menyimulasikan pembayaran berhasil.
                      </div>
                    </div>
                  </div>
                )}

                {/* VA Interactive UI */}
                {paymentMethod === 'va' && (
                  <div className="space-y-4 bg-slate-50 border border-slate-200/60 p-6 rounded-3xl text-left">
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">NAMA BANK</div>
                      <div className="text-lg font-black uppercase text-slate-900">{selectedBank} Virtual Account</div>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">NOMOR VIRTUAL ACCOUNT</div>
                        <div className="text-lg font-mono font-black text-slate-900 tracking-wider">
                          {virtualAccount.slice(0, 5)} {virtualAccount.slice(5, 9)} {virtualAccount.slice(9, 13)} {virtualAccount.slice(13)}
                        </div>
                      </div>
                      <button 
                        onClick={handleCopyVA}
                        className="p-2 border border-slate-200 hover:border-blue-500 rounded-lg text-slate-500 hover:text-blue-500 active:scale-95 transition-all bg-slate-50 flex items-center gap-1 text-xs font-bold"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-500" />
                            <span className="text-emerald-500">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">NAMA REKENING MOCK</div>
                      <div className="text-xs font-bold text-slate-700">SMARTBIZ SOLUSI UMKM - {formData.businessName || "BISNIS ANDA"}</div>
                    </div>

                    <div className="pt-2">
                      <div className="text-xs text-slate-500 mb-2">Instruksi Transfer Singkat:</div>
                      <ol className="text-[11px] text-slate-400 space-y-1 list-decimal pl-4 font-medium">
                        <li>Buka aplikasi Mobile Banking pilihan Anda.</li>
                        <li>Pilih Menu: Bayar &rarr; <span className="text-slate-600 font-bold">Transfer Virtual Account</span>.</li>
                        <li>Masukkan nomor VA di atas sebagai tujuan transfer.</li>
                        <li>Konfirmasi jumlah bayar dan selesaikan transaksi.</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* CC Interactive UI */}
                {paymentMethod === 'cc' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Animated Credit Card Visual */}
                    <div className="relative aspect-[1.58/1] bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between overflow-hidden group">
                      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-all" />
                      
                      {/* Top Row: Chip & Brand */}
                      <div className="flex justify-between items-center">
                        <div className="w-10 h-8 bg-amber-400/20 rounded-md border border-amber-400/40 relative overflow-hidden flex items-center justify-center">
                          <div className="grid grid-cols-3 gap-1 w-full h-full p-1 opacity-70">
                            {Array.from({ length: 9 }).map((_, id) => <div key={id} className="border-[0.5px] border-amber-400/40 rounded-sm" />)}
                          </div>
                        </div>
                        <div className="text-right">
                          <Zap className="w-5 h-5 text-blue-400 ml-auto" />
                          <span className="text-[8px] uppercase tracking-widest font-bold font-mono">SmartBiz Platinum</span>
                        </div>
                      </div>

                      {/* Middle Card Number */}
                      <div>
                        {ccFocus === 'cvv' ? (
                          <div className="text-right pr-4">
                            <span className="text-[10px] text-slate-500 block uppercase mb-1">CVV SECURE CODE</span>
                            <span className="font-mono text-lg tracking-widest font-bold">***</span>
                          </div>
                        ) : (
                          <div className="font-mono text-lg sm:text-xl font-bold tracking-widest text-center">
                            {ccNumber || "•••• •••• •••• ••••"}
                          </div>
                        )}
                      </div>

                      {/* Bottom row: Name & Expiry */}
                      <div className="flex justify-between items-end">
                        <div className="text-left">
                          <span className="text-[8px] text-slate-500 block">CARD HOLDER</span>
                          <span className="font-mono text-sm font-bold uppercase max-w-[150px] truncate block">{ccName || "NAMA PEMILIK"}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] text-slate-500 block">EXPIRES</span>
                          <span className="font-mono text-sm font-bold">{ccExpiry || "BB/TT"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Form Cards details */}
                    <div className="space-y-3 text-left text-xs font-bold text-slate-600">
                      <div>
                        <label className="block mb-1">NAMA DI KARTU</label>
                        <input 
                          type="text"
                          placeholder="BUDI SANTOSO"
                          value={ccName}
                          onFocus={() => setCcFocus('name')}
                          onBlur={() => setCcFocus(null)}
                          onChange={(e) => setCcName(e.target.value)}
                          className="w-full p-3 rounded-lg border border-slate-200 font-medium outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-1">NOMOR KARTU KREDIT</label>
                        <input 
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          value={ccNumber}
                          onFocus={() => setCcFocus('number')}
                          onBlur={() => setCcFocus(null)}
                          onChange={handleCcNumberChange}
                          className="w-full p-3 rounded-lg border border-slate-200 font-mono font-medium outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block mb-1">MASA BERLAKU</label>
                          <input 
                            type="text"
                            placeholder="MM/YY"
                            value={ccExpiry}
                            onFocus={() => setCcFocus('expiry')}
                            onBlur={() => setCcFocus(null)}
                            onChange={handleCcExpiryChange}
                            className="w-full p-3 rounded-lg border border-slate-200 font-mono font-medium outline-none focus:border-blue-500 text-center"
                          />
                        </div>
                        <div>
                          <label className="block mb-1">CVV</label>
                          <input 
                            type="password"
                            maxLength={3}
                            placeholder="123"
                            value={ccCvv}
                            onFocus={() => setCcFocus('cvv')}
                            onBlur={() => setCcFocus(null)}
                            onChange={(e) => setCcCvv(e.target.value.replace(/\D/g, ''))}
                            className="w-full p-3 rounded-lg border border-slate-200 font-mono font-medium outline-none focus:border-blue-500 text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 4: SUCCESS RECEIPT */}
            {step === 4 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border-4 border-emerald-100 shadow-xl shadow-emerald-500/10 animate-pulse">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div>
                  <h2 className="text-2xl md:text-3xl font-black font-display text-slate-900">Pembayaran Berhasil!</h2>
                  <p className="text-slate-500 text-sm mt-1">Akun Premium Anda aktif secara otomatis dalam paket <span className="text-blue-600 font-bold">{selectedPlan.name}</span>.</p>
                </div>

                {/* Receipt Card */}
                <div className="w-full bg-slate-50 border border-slate-100 p-6 rounded-2xl text-left space-y-3 font-medium text-xs max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-400">ID Pesanan:</span>
                    <span className="font-mono font-bold text-slate-800">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nama Bisnis:</span>
                    <span className="font-bold text-slate-800">{formData.businessName || "Kopi Sederhana"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Metode Bayar:</span>
                    <span className="font-bold uppercase text-slate-800">{paymentMethod === 'qris' ? 'QRIS Instant' : paymentMethod === 'va' ? `Transfer VA (${selectedBank})` : 'Credit Card'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Durasi Paket:</span>
                    <span className="font-bold text-slate-800">{selectedPlan.billingCycle === 'annually' ? '1 Tahun (Hemat 20%)' : '1 Bulan'}</span>
                  </div>
                  <div className="h-px w-full bg-slate-200/60 my-2" />
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-900">Total Terbayar:</span>
                    <span className="font-black text-blue-600">Rp {formattedTotal}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 p-2 px-3 rounded-full border border-slate-100">
                  <Shield className="w-3" /> Lisensi Premium Diaktivasi Otomatis
                </div>
              </motion.div>
            )}
          </div>

          {/* Stepper Buttons panel Footer */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
            {step > 1 && step < 4 ? (
              <button 
                onClick={handlePrevStep}
                disabled={isProcessing}
                className="py-3 px-6 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-all font-bold text-sm flex items-center gap-2 cursor-pointer disabled:opacity-55"
              >
                <ChevronLeft className="w-4 h-4" /> Kembali
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button 
                onClick={handleNextStep}
                className="py-3.5 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 font-bold text-sm flex items-center gap-2 cursor-pointer transition-all"
              >
                Lanjutkan <ChevronRight className="w-4 h-4" />
              </button>
            ) : step === 3 ? (
              <button 
                onClick={handleSimulatePayment}
                disabled={isProcessing || (paymentMethod === 'cc' && (!ccNumber || ccNumber.length < 16 || !ccName || !ccExpiry))}
                className="py-4 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-white/80" />
                    <span>Konfirmasi Pembayaran</span>
                  </>
                )}
              </button>
            ) : (
              <button 
                onClick={onClose}
                className="py-4 px-10 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all text-center w-full"
              >
                Masuk ke Dasbor Premium
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Sidebar Order Bill overview */}
        {step < 4 && (
          <div className="w-full md:w-[350px] bg-slate-50 border-l border-slate-100 p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-black font-display text-slate-900 text-lg">Rincian Pemesanan</h3>
              
              <div className="p-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm space-y-4">
                <div>
                  <div className="text-[10px] font-black tracking-wider uppercase text-blue-600">SmartBiz Plan</div>
                  <h4 className="text-xl font-black text-slate-900 mt-1">{selectedPlan.name}</h4>
                  <p className="text-xs text-slate-400 italic mt-0.5">Siklus: {isAnnual ? 'Tahunan' : 'Bulanan'}</p>
                </div>

                <div className="h-px bg-slate-100 w-full" />

                <ul className="space-y-2 text-xs text-slate-500 font-medium">
                  {selectedPlan.name === 'Pemula' && (
                    <>
                      <li>• 1 Akun Pengguna penuh</li>
                      <li>• Laporan Arus Kas Dasbor</li>
                      <li>• Manajemen hingga 50 produk</li>
                    </>
                  )}
                  {selectedPlan.name === 'Profesional' && (
                    <>
                      <li>• 5 Akun Pengguna</li>
                      <li>• Analisa Laba Rugi real-time</li>
                      <li>• Sinkronisasi Sosial Media</li>
                    </>
                  )}
                  {selectedPlan.name === 'Enterprise' && (
                    <>
                      <li>• Pengguna tak terbatas</li>
                      <li>• Integrasi ERP penuh & API</li>
                      <li>• Dedicated Account Manager</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Subtotal Bill Details */}
              <div className="space-y-2 text-xs font-semibold text-slate-500">
                <div className="flex justify-between">
                  <span>Harga ({isAnnual ? '12 Bulan' : '1 Bulan'})</span>
                  <span className="font-mono text-slate-700">
                    Rp {subTotal.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Ppn (PPN 11%)</span>
                  <span className="font-mono text-slate-700">Rp {vat.toLocaleString('id-ID')}</span>
                </div>
                {isAnnual && (
                  <div className="flex justify-between text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                    <span>Diskon Tahunan (20%)</span>
                    <span>Sudah Termasuk</span>
                  </div>
                )}
                <div className="h-px bg-slate-200 w-full my-2" />
                <div className="flex justify-between text-slate-900 text-sm font-black">
                  <span>Total Bayar</span>
                  <span className="font-mono text-blue-600">
                    Rp {formattedTotal}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/60 text-[10px] text-slate-400 font-bold space-y-2">
              <div className="flex items-center gap-1.5 justify-center">
                <Shield className="w-3.5 h-3.5 text-blue-600" /> Secure SSL 256-bit Encryption
              </div>
              <div className="text-center">Pembayaran diproses secara instan melalui sistem SmartBiz Gateway.</div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
