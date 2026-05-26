import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Package, 
  Headset, 
  Info, 
  Instagram, 
  Youtube, 
  Twitter, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  Plus,
  MessageSquare,
  TrendingUp,
  LayoutDashboard,
  Share2,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import OrderModal from './components/OrderModal';
import TrialModal from './components/TrialModal';
import DemoModal from './components/DemoModal';
import ContactModal from './components/ContactModal';

// Components
const Navbar = ({ onStart, onContact, activePlan }: { onStart: () => void; onContact: () => void; activePlan: string | null }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "glass-morphism shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className={cn("text-xl font-bold font-display tracking-tight flex items-center gap-2", scrolled ? "text-slate-900" : "text-white")}>
            SmartBiz
            {activePlan && (
              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                {activePlan} Premium
              </span>
            )}
          </span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8">
            {['Layanan', 'Paket', 'Sosial', 'Tentang'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={cn("text-sm font-medium transition-colors hover:text-blue-500", scrolled ? "text-slate-600" : "text-slate-200")}
              >
                {item}
              </a>
            ))}
            <button
              onClick={onContact}
              className={cn("text-sm font-medium transition-colors hover:text-blue-500 cursor-pointer border-0 bg-transparent text-left font-sans outline-none", scrolled ? "text-slate-600" : "text-slate-200")}
            >
              Kontak
            </button>
          </div>

          <button
            onClick={onContact}
            className={cn("md:hidden text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors uppercase cursor-pointer", scrolled ? "text-slate-700 border-slate-300 hover:bg-slate-100" : "text-white hover:bg-white/10")}
          >
            Kontak
          </button>
          
          {activePlan ? (
            <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-bold shadow-md shadow-emerald-500/15">
              <CheckCircle2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Akun</span> Aktif
            </div>
          ) : (
            <button 
              onClick={onStart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer shadow-md shadow-blue-600/20"
            >
              Mulai Uji Coba
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onStart, onViewDemo, activePlan }: { onStart: () => void; onViewDemo: () => void; activePlan: string | null }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Fallback pattern background if image fails to load or for better contrast */}
      <div className="absolute inset-0 bg-slate-900/40 z-10" />
      <img
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069"
        alt="SmartBiz Office"
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
            Memberdayakan UMKM di Seluruh Dunia
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white font-display mb-6 leading-tight">
            Solusi Cerdas untuk <br />
            <span className="text-blue-400">Mengembangkan Bisnis Anda</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            {activePlan ? (
              <span className="text-emerald-400 font-bold block mb-4 bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/25 max-w-lg mx-auto">
                🎉 Selamat! Anda saat ini berada dalam Keanggotaan Premium {activePlan}! Dasbor premium Anda kini sepenuhnya diaktifkan.
              </span>
            ) : (
              "Platform lengkap untuk manajemen keuangan, kontrol stok, dan layanan pelanggan premium yang dirancang khusus untuk bisnis yang berkembang."
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {activePlan ? (
              <a 
                href="#paket"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Lihat Detail Langganan
              </a>
            ) : (
              <>
                <button 
                  onClick={onStart}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Mulai Uji Coba Gratis <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={onViewDemo}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold backdrop-blur-md transition-all cursor-pointer"
                >
                  Lihat Demo
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Manajemen Keuangan",
      desc: "Pelacakan arus kas waktu nyata, penagihan otomatis, dan pelaporan keuangan siap pajak untuk UMKM.",
      icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Stok & Inventaris",
      desc: "Peringatan stok cerdas, manajemen multi-gudang, dan analitik restok prediktif untuk mencegah kerugian.",
      icon: <Package className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-50",
    },
    {
      title: "Dukungan Pelanggan",
      desc: "Portal dukungan khusus dan sistem tiket otomatis untuk memastikan pelanggan Anda selalu didengar.",
      icon: <Headset className="w-6 h-6 text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      title: "Pusat Informasi UMKM",
      desc: "Tetap terupdate dengan peraturan pemerintah, tren pasar, dan hibah bisnis yang relevan untuk UMKM.",
      icon: <Info className="w-6 h-6 text-amber-500" />,
      color: "bg-amber-50",
    },
  ];

  return (
    <section id="layanan" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-900 mb-4">
          Semua yang Anda Butuhkan untuk Sukses
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Kami telah menyederhanakan alat bisnis yang kompleks menjadi paket yang simpel dan kuat yang sesuai dengan kebutuhan bisnis kecil dan menengah.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", s.color)}>
              {s.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const DashboardPreview = () => {
  return (
    <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden text-left">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <LayoutDashboard className="w-3 h-3" /> Pusat Kontrol
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
              Kelola Bisnis Anda <br />
              <span className="text-blue-400">Dari Satu Layar Tunggal</span>
            </h2>
            <p className="text-slate-400 text-lg">
              SmartBiz mengintegrasikan catatan keuangan dan inventaris Anda ke dalam dasbor waktu nyata. Temukan tren sebelum terjadi dan ambil keputusan berbasis data.
            </p>
            <div className="space-y-4">
              {[
                { title: "Pelaporan Keuangan", desc: "Laporan Laba & Rugi otomatis dengan ekspor siap pajak." },
                { title: "Peramalan Inventaris", desc: "Model AI prediktif untuk mengoptimalkan level stok Anda." },
                { title: "Ruang Kerja Kolaboratif", desc: "Tugaskan tugas dan sinkronkan peran di seluruh tim Anda." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 glass-morphism rounded-3xl p-6 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Mock Dashboard UI */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs font-mono text-slate-500">smartbiz_admin_v2.4</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="text-xs text-slate-400 mb-1">Total Pendapatan</div>
                <div className="text-2xl font-bold">$12,840.00</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-2 h-2" /> +14.2% dari bulan lalu
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="text-xs text-slate-400 mb-1">Stok Aktif</div>
                <div className="text-2xl font-bold">2,481</div>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-bold">Frekuensi Penjualan Bulanan</div>
                <div className="text-[10px] bg-blue-600 px-2 py-0.5 rounded text-white">LIVE</div>
              </div>
              <div className="flex items-end gap-1.5 h-32">
                {[40, 60, 35, 90, 65, 80, 45, 75, 55, 95, 100, 70].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-blue-600 to-sky-400 rounded-t-sm"
                  />
                ))}
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MusicIcon = (props: any) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const SocialIntegration = () => {
  const [activePlatform, setActivePlatform] = React.useState('Instagram');
  
  const platforms = [
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, handle: '@smartbiz_shop', color: 'bg-pink-500' },
    { name: 'TikTok', icon: <MusicIcon className="w-5 h-5" />, handle: '@smartbiz_live', color: 'bg-slate-900' },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, handle: 'SmartBiz TV', color: 'bg-red-600' },
    { name: 'X', icon: <Twitter className="w-5 h-5" />, handle: '@smartbiz_now', color: 'bg-blue-400' }
  ];

  return (
    <section id="sosial" className="py-24 px-6 bg-slate-50 text-left">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-20">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
            <Share2 className="w-3 h-3" /> Sinkronisasi Multi-Saluran
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-900 leading-tight mb-6">
            Unggah Sekali, <br />
            <span className="text-blue-600">Sinkronkan Di Mana Saja</span>
          </h2>
          <p className="text-slate-600 text-lg mb-10">
            Otomatiskan peluncuran produk Anda. Saat Anda memperbarui stok di SmartBiz, kami secara otomatis menyinkronkan poster dan deskripsi terbaru ke semua platform sosial Anda.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {platforms.map((p) => (
              <button
                key={p.name}
                onClick={() => setActivePlatform(p.name)}
                className={cn(
                  "p-4 rounded-2xl flex flex-col items-center gap-2 transition-all border cursor-pointer",
                  activePlatform === p.name 
                    ? "bg-white border-blue-200 shadow-xl shadow-blue-500/5 ring-2 ring-blue-500/20" 
                    : "bg-slate-100/50 border-transparent hover:bg-white hover:border-slate-200"
                )}
              >
                <div className={cn("p-2 rounded-xl text-white", p.color)}>
                  {p.icon}
                </div>
                <span className="text-xs font-bold text-slate-900">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="relative">
            <div className="absolute -inset-10 bg-blue-400/10 blur-3xl rounded-full" />
            <motion.div 
              key={activePlatform}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white rounded-[2.5rem] p-4 shadow-2xl border border-slate-200 max-w-[320px] mx-auto"
            >
              <div className="flex items-center justify-between mb-4 px-2 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200" />
                  <div>
                    <div className="text-[10px] font-bold text-slate-900">SmartBiz Solutions</div>
                    <div className="text-[8px] text-slate-400 italic">Disponsori</div>
                  </div>
                </div>
                <div className="text-slate-400">•••</div>
              </div>
              
              <div className="aspect-[4/5] bg-slate-100 rounded-2xl mb-4 overflow-hidden relative text-left">
                <img 
                  src={`https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800`}
                  className="w-full h-full object-cover"
                  alt="Product Preview"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                   <div className="text-white text-sm font-bold">Stok Pintar V2</div>
                   <div className="text-white/80 text-[10px]">Tersedia kembali untuk Anda.</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 px-2 mb-4">
                <div className="w-4 h-4 rounded-full border border-slate-200" />
                <div className="w-4 h-4 rounded-full border border-slate-200" />
                <div className="w-4 h-4 rounded-full border border-slate-200 ml-auto" />
              </div>
              
              <div className="bg-blue-600 text-white text-center py-2 rounded-lg text-xs font-bold">
                Pelajari Lebih Lanjut
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SupportPortal = () => {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden text-left">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-600 text-xs font-bold uppercase tracking-wider mb-6">
            <Headset className="w-3 h-3" /> Inteligensi Pelanggan
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-900 leading-tight mb-6">
            Sistem Dukungan <br />
            <span className="text-purple-600">Berpusat pada Manusia</span>
          </h2>
          <p className="text-slate-600 text-lg mb-10">
            Mengelola pelanggan tidak seharusnya menjadi beban. Sistem tiket cerdas kami dan Pusat Informasi UMKM menjaga Anda dan klien Anda tetap terinformasi 24/7.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
               <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                 <MessageSquare className="w-6 h-6 text-purple-600" />
               </div>
               <div>
                 <h4 className="font-bold text-slate-900 mb-1">Kotak Masuk Terpadu</h4>
                 <p className="text-slate-500 text-sm">Konsolidasikan pesan dari WhatsApp, Instagram, dan chat web ke dalam satu tempat.</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                 <Info className="w-6 h-6 text-amber-600" />
               </div>
               <div>
                 <h4 className="font-bold text-slate-900 mb-1">Pelacak Regulasi</h4>
                 <p className="text-slate-500 text-sm">Secara otomatis memberi tahu Anda tentang hukum pajak baru atau peluang hibah UMKM.</p>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
           <div className="relative">
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200"
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <div className="font-bold text-slate-900">Tiket Aktif</div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { user: "Sarah J.", status: "Tertunda", time: "2m yang lalu", text: "Kapan biji kopi akan tersedia kembali?" },
                    { user: "Mike T.", status: "Eskalasi", time: "15m yang lalu", text: "Masalah dengan gerbang pembayaran di profil saya." }
                  ].map((ticket, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-slate-400 text-xs shadow-sm">
                        {ticket.user[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-slate-900">{ticket.user}</span>
                          <span className="text-[10px] text-slate-400">{ticket.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{ticket.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ 
  onSelectPlan,
  activePlan 
}: { 
  onSelectPlan: (plan: { name: string; price: string; billingCycle: 'monthly' | 'annually' }) => void;
  activePlan: string | null;
}) => {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annually'>('monthly');

  const tiers = [
    {
      name: "Pemula",
      price: billingCycle === 'monthly' ? "199" : "159",
      desc: "Solusi paket hemat untuk UMKM baru yang ingin tertib administrasi.",
      features: [
        "1 Akun Pengguna",
        "Laporan Arus Kas Dasar",
        "Manajemen 50 Produk",
        "Peringatan Stok Rendah",
        "Dukungan Komunitas (Forum)",
        "Akses Mobile App Basic"
      ],
      isPopular: false,
      buttonText: "Mulai Gratis",
    },
    {
      name: "Profesional",
      price: billingCycle === 'monthly' ? "499" : "399",
      desc: "Pilihan favorit untuk bisnis berkembang dengan tim yang solid.",
      features: [
        "5 Akun Pengguna",
        "Analisa Laba Rugi Real-time",
        "Manajemen Produk Tak Terbatas",
        "Auto-Sinkron Media Sosial",
        "Dukungan Prioritas 24/7",
        "Rekonsiliasi Bank Otomatis",
        "Manajemen Multi-Lokasi (2)"
      ],
      isPopular: true,
      buttonText: "Pilih Profesional",
    },
    {
      name: "Enterprise",
      price: billingCycle === 'monthly' ? "999" : "799",
      desc: "Paket lengkap tanpa batas untuk skala waralaba dan distribusi luas.",
      features: [
        "Pengguna Tak Terbatas",
        "Integrasi ERP & API Custom",
        "Dedicated Account Manager",
        "Pelatihan On-site Kustom",
        "Audit Keamanan Bulanan",
        "Cloud Storage Tak Terbatas",
        "White-label Dashboard"
      ],
      isPopular: false,
      buttonText: "Hubungi Penjualan",
    },
  ];

  return (
    <section id="paket" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-blue-600 font-bold text-sm tracking-widest uppercase mb-4 block">Pilihan Paket Kami</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-900 mb-6">
            Investasi Cerdas untuk <span className="text-blue-600 font-extrabold">Masa Depan</span> Bisnis
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-10">
            Transparansi penuh tanpa biaya tersembunyi. Pilih paket yang paling sesuai dengan kebutuhan operasional harian Anda saat ini.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={cn("text-sm font-medium", billingCycle === 'monthly' ? "text-slate-900" : "text-slate-400")}>Bulanan</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')}
              className="relative w-14 h-7 bg-slate-200 rounded-full p-1 transition-colors hover:bg-slate-300 cursor-pointer"
            >
              <div className={cn(
                "absolute top-1 left-1 w-5 h-5 bg-blue-600 rounded-full transition-transform duration-300 shadow-sm",
                billingCycle === 'annually' ? "translate-x-7" : "translate-x-0"
              )} />
            </button>
            <span className={cn("text-sm font-medium", billingCycle === 'annually' ? "text-slate-900" : "text-slate-400")}>
              Tahunan <span className="text-emerald-500 text-[10px] font-bold ml-1 bg-emerald-100 px-1.5 py-0.5 rounded-full">Hemat 20%</span>
            </span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, i) => {
          const isCurrentActive = activePlan === tier.name;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative p-10 rounded-[2.5rem] transition-all flex flex-col group",
                tier.isPopular 
                  ? "bg-slate-900 text-white shadow-2xl shadow-blue-900/20 md:-translate-y-4 ring-4 ring-blue-500/10" 
                  : "bg-white border border-slate-200 text-slate-900 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50",
                isCurrentActive && "ring-4 ring-emerald-500/35"
              )}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                  Pilihan Terbaik
                </div>
              )}
              {isCurrentActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                  Paket Anda
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3 font-display">{tier.name}</h3>
                <p className={cn("text-sm leading-relaxed", tier.isPopular ? "text-slate-400" : "text-slate-500")}>
                  {tier.desc}
                </p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-xs font-bold self-start mt-2">Rp</span>
                <span className="text-5xl font-black tracking-tight">{tier.price}</span>
                <span className="text-sm font-bold">rb</span>
                <span className={cn("text-xs font-medium ml-1", tier.isPopular ? "text-slate-500" : "text-slate-400")}>
                  /{billingCycle === 'monthly' ? 'bulan' : 'thn'}
                </span>
              </div>

              <div className="h-px w-full bg-slate-100 mb-8 opacity-20" />

              <ul className="space-y-4 mb-12 flex-grow">
                {tier.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm font-medium">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                      tier.isPopular ? "bg-blue-500/20 text-blue-400" : "bg-emerald-50 text-emerald-500"
                    )}>
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <span className={tier.isPopular ? "text-slate-300" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onSelectPlan({ name: tier.name, price: tier.price, billingCycle })}
                className={cn(
                  "w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 shadow-lg cursor-pointer",
                  isCurrentActive
                    ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/30"
                    : tier.isPopular 
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30" 
                      : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20"
                )}
              >
                {isCurrentActive ? "Perbarui detail" : tier.buttonText}
              </button>
              
              {!tier.isPopular && (
                <div className="mt-6 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Batalkan Kapan Saja</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-16 max-w-4xl mx-auto p-8 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Butuh Paket Khusus?</h4>
            <p className="text-sm text-slate-600">Kami menawarkan solusi kustom untuk korporasi dengan ratusan cabang.</p>
          </div>
        </div>
        <button 
          onClick={() => onSelectPlan({ name: "Enterprise", price: billingCycle === 'monthly' ? "999" : "799", billingCycle })}
          className="px-8 py-3 bg-white border border-blue-200 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-sm cursor-pointer"
        >
          Konsultasi Sekarang
        </button>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="tentang" className="py-24 px-6 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" 
            alt="About SmartBiz" 
            className="rounded-3xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Misi Kami</h2>
          <p className="text-slate-400 text-lg mb-6">
            SmartBiz didirikan atas keyakinan sederhana: bahwa bisnis kecil adalah tulang punggung ekonomi. Kami bertujuan untuk mendemokratisasi teknologi kelas perusahaan, menjadikannya dapat diakses oleh setiap UMKM tanpa memandang anggaran mereka.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-1">10rb+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">UMKM Aktif</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">Dukungan Ahli</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onContact }: { onContact: () => void }) => {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2 text-left">
          <div className="flex items-center gap-2 mb-6 text-left justify-start">
            <Zap className="text-blue-500 w-6 h-6" />
            <span className="text-2xl font-bold font-display">SmartBiz</span>
          </div>
          <p className="text-slate-400 max-w-sm mb-6 text-left">
            Didedikasikan untuk memberdayakan ekonomi lokal dengan menyediakan alat tingkat perusahaan kepada UMKM dengan harga yang terjangkau.
          </p>
          <div className="space-y-2 text-xs text-slate-400 text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-400">Hotline:</span> (021) 5098-BIZ-99
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-400">WhatsApp:</span> +62 812-3456-7890
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-400">Email:</span> hello@smartbiz.co.id
            </div>
          </div>
        </div>
        
        <div className="text-left">
          <h4 className="font-bold mb-6 italic text-blue-400">Produk</h4>
          <ul className="space-y-4 text-sm text-slate-400 text-left list-none pl-0">
            <li><a href="#" className="hover:text-white transition-colors">Suite Keuangan</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Master Inventaris</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Portal Dukungan</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Integrasi API</a></li>
          </ul>
        </div>
        
        <div className="text-left">
          <h4 className="font-bold mb-6 italic text-blue-400">Perusahaan</h4>
          <ul className="space-y-4 text-sm text-slate-400 text-left list-none pl-0">
            <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
            <li><button onClick={onContact} className="hover:text-white transition-colors bg-transparent border-0 font-sans outline-none cursor-pointer p-0 text-left">Hubungi Chat & Support</button></li>
            <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Ketentuan Layanan</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-12 border-t border-slate-800 flex flex-col md:row items-center justify-between gap-6">
        <div className="text-xs text-slate-500 font-mono">
          © {new Date().getFullYear()} SmartBiz Solutions. Seluruh hak cipta dilindungi undang-undang.
        </div>
        <div className="flex gap-6">
          <Instagram className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer" />
          <Youtube className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer" />
          <Twitter className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [selectedPlan, setSelectedPlan] = React.useState<{
    name: string;
    price: string;
    billingCycle: 'monthly' | 'annually';
  } | null>(null);

  const [activePlan, setActivePlan] = React.useState<string | null>(null);
  const [showToast, setShowToast] = React.useState(false);
  const [toastContent, setToastContent] = React.useState<{ title: string; desc: string }>({
    title: 'Pembayaran Sukses!',
    desc: 'Pemesanan Anda diterima. Paket Premium kini aktif.'
  });

  const [showTrialModal, setShowTrialModal] = React.useState(false);
  const [showDemoModal, setShowDemoModal] = React.useState(false);
  const [showContactModal, setShowContactModal] = React.useState(false);

  const handleStart = () => {
    setSelectedPlan({
      name: 'Profesional',
      price: '399',
      billingCycle: 'annually'
    });
  };

  const handleOpenTrial = () => {
    setShowTrialModal(true);
  };

  const handleOpenDemo = () => {
    setShowDemoModal(true);
  };

  const handleTrialActivated = (businessName: string, category: string) => {
    setActivePlan(`Trial (${category})`);
    setToastContent({
      title: 'Uji Coba Gratis Aktif!',
      desc: `Selamat! Lisensi Sandbox 14 hari aktif untuk "${businessName}".`
    });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 6000);
  };

  const handlePaymentSuccess = (planName: string) => {
    setActivePlan(planName);
    setToastContent({
      title: 'Pembayaran Sukses!',
      desc: `Pemesanan Anda diterima. Paket ${planName} Premium kini aktif.`
    });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[150] bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-emerald-500/30 flex items-center gap-4 max-w-md w-11/12"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">{toastContent.title}</h4>
              <p className="text-xs text-slate-400">{toastContent.desc}</p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-white ml-auto text-xs font-bold cursor-pointer"
            >
              Tutup
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar onStart={handleOpenTrial} onContact={() => setShowContactModal(true)} activePlan={activePlan} />
      <main>
        <Hero onStart={handleOpenTrial} onViewDemo={handleOpenDemo} activePlan={activePlan} />
        <Services />
        <DashboardPreview />
        <SocialIntegration />
        <SupportPortal />
        <Pricing onSelectPlan={setSelectedPlan} activePlan={activePlan} />
        <About />
      </main>
      <Footer onContact={() => setShowContactModal(true)} />
      <button 
        onClick={() => setShowContactModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50 group cursor-pointer"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat / Hubungi Kami
        </span>
      </button>

      {/* Checkout Order & Payment Modal */}
      {selectedPlan && (
        <OrderModal 
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          selectedPlan={selectedPlan}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Trial Onboarding Modal */}
      {showTrialModal && (
        <TrialModal 
          isOpen={showTrialModal}
          onClose={() => setShowTrialModal(false)}
          onTrialActivated={handleTrialActivated}
        />
      )}

      {/* Interactive Demo Sandbox Modal */}
      {showDemoModal && (
        <DemoModal 
          isOpen={showDemoModal}
          onClose={() => setShowDemoModal(false)}
          onDemoSubmitTrial={() => {
            setShowDemoModal(false);
            setShowTrialModal(true);
          }}
        />
      )}

      {/* Contact Support Info Modal */}
      {showContactModal && (
        <ContactModal 
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
}
