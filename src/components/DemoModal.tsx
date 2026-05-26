import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  TrendingUp, 
  TrendingDown, 
  Coins, 
  Plus, 
  Package, 
  Bell, 
  RefreshCw, 
  Share2, 
  Instagram, 
  MessageSquare, 
  CheckCircle2, 
  Trash2, 
  ExternalLink,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  ShoppingBag,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDemoSubmitTrial: () => void;
}

interface Transaction {
  id: string;
  desc: string;
  type: 'income' | 'expense';
  amount: number;
  time: string;
  category: string;
}

interface Product {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  price: number;
}

interface SupportTicket {
  id: string;
  customer: string;
  message: string;
  status: 'pending' | 'resolved';
}

export default function DemoModal({ isOpen, onClose, onDemoSubmitTrial }: DemoModalProps) {
  const [activeTab, setActiveTab] = React.useState<'finance' | 'inventory' | 'social' | 'support'>('finance');

  // Interactive Finance States
  const [transactions, setTransactions] = React.useState<Transaction[]>([
    { id: '1', desc: 'Penjualan Kopi Susu', type: 'income', amount: 350000, time: 'Baru saja', category: 'F&B Penjualan' },
    { id: '2', desc: 'Beli Bahan Baku Mentega', type: 'expense', amount: 120000, time: '10 menit lalu', category: 'Operasional' },
    { id: '3', desc: 'Pelunasan Invoice Katering #12', type: 'income', amount: 850000, time: '1 jam lalu', category: 'Katering' },
    { id: '4', desc: 'Sewa Tabung Gas Baru', type: 'expense', amount: 750000, time: 'Gunakan hari ini', category: 'Listrik & Gas' },
  ]);
  const [newDesc, setNewDesc] = React.useState('');
  const [newAmount, setNewAmount] = React.useState('');
  const [newType, setNewType] = React.useState<'income' | 'expense'>('income');
  const [newCategory, setNewCategory] = React.useState('F&B Penjualan');

  // Interactive Inventory States
  const [products, setProducts] = React.useState<Product[]>([
    { id: 'p1', name: 'Biji Kopi Arabica Toraja 1kg', stock: 2, minStock: 5, price: 185000 },
    { id: 'p2', name: 'Susu UHT Full Cream 1L', stock: 12, minStock: 10, price: 21000 },
    { id: 'p3', name: 'Cup Dingin Gelas Plastik 14oz', stock: 48, minStock: 100, price: 450 },
    { id: 'p4', name: 'Sirup Vanilla Premium Monin', stock: 8, minStock: 3, price: 145000 },
  ]);
  const [newProdName, setNewProdName] = React.useState('');
  const [newProdQty, setNewProdQty] = React.useState('');
  const [newProdMin, setNewProdMin] = React.useState('');
  const [newProdPrice, setNewProdPrice] = React.useState('');

  // Interactive Social States
  const [socialCaption, setSocialCaption] = React.useState('KABAR GEMBIRA! Nikmati perpaduan sempurna Biji Arabica Toraja murni dengan krim lembut khusus. Dapatkan potongan 20% khusus Sabtu & Minggu ini! 🔥🥐 #UMKMBangkit #KopiSore');
  const [socialTemplate, setSocialTemplate] = React.useState('modern');
  const [discountPercent, setDiscountPercent] = React.useState('20%');

  // Interactive Support States
  const [tickets, setTickets] = React.useState<SupportTicket[]>([
    { id: 't1', customer: 'Budi Santoso', message: 'Kopi pesanan saya lewat ojek online tumpah di jalan, apakah bisa diganti refund?', status: 'pending' },
    { id: 't2', customer: 'Laras Atmaja', message: 'Apakah kafe Anda menerima pemesanan prasmanan/katering kecil harian isi 40 box?', status: 'pending' },
    { id: 't3', customer: 'Rian Hidayat', message: 'Toko roti Anda sangat higienis, pengiriman cepat & rasa bolunya luar biasa lezat!', status: 'pending' },
  ]);
  const [systemAlerts, setSystemAlerts] = React.useState<string[]>([]);

  // Derived financials
  const totals = React.useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });
    return {
      income,
      expense,
      balance: income - expense
    };
  }, [transactions]);

  // Alert dismiss helper
  const addSystemAlert = (msg: string) => {
    setSystemAlerts(prev => [msg, ...prev]);
    setTimeout(() => {
      setSystemAlerts(prev => prev.slice(0, -1));
    }, 4500);
  };

  // Transaction Handler
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim() || !newAmount) return;
    const amountNum = parseFloat(newAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      desc: newDesc.trim(),
      type: newType,
      amount: amountNum,
      time: 'Baru saja',
      category: newCategory
    };

    setTransactions([newTx, ...transactions]);
    setNewDesc('');
    setNewAmount('');
    addSystemAlert(`Transaksi "${newDesc}" berhasil direkam & dihitung secara real-time!`);
  };

  const handleDeleteTransaction = (id: string, name: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    addSystemAlert(`Transaksi "${name}" telah dihapus.`);
  };

  // Restock handler
  const handleRestock = (id: string, bonus: number = 20) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const afterstk = p.stock + bonus;
        addSystemAlert(`Stok "${p.name}" ditingkatkan sebanyak +${bonus} unit.`);
        return { ...p, stock: afterstk };
      }
      return p;
    }));
  };

  // Add custom product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdQty || !newProdMin || !newProdPrice) return;
    const qty = parseInt(newProdQty);
    const min = parseInt(newProdMin);
    const price = parseInt(newProdPrice);

    if (isNaN(qty) || isNaN(min) || isNaN(price)) return;

    const newP: Product = {
      id: "p_" + Date.now(),
      name: newProdName,
      stock: qty,
      minStock: min,
      price: price
    };

    setProducts([...products, newP]);
    setNewProdName('');
    setNewProdQty('');
    setNewProdMin('');
    setNewProdPrice('');
    addSystemAlert(`Produk "${newP.name}" resmi ditambahkan ke katalog inventaris.`);
  };

  // Set ticket answer
  const handleResolveTicket = (id: string, responseType: string, customerName: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'resolved' as const } : t));
    addSystemAlert(`Tiket ${customerName} diselesaikan dengan respons: "${responseType}"`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      {/* Toast notifications container */}
      <div className="fixed bottom-6 left-6 z-[120] flex flex-col gap-2 max-w-sm pointer-events-none">
        <AnimatePresence>
          {systemAlerts.map((alertMessage, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 text-white border border-blue-500/25 p-3.5 rounded-xl shadow-xl flex items-center gap-3 text-xs w-full pointer-events-auto"
            >
              <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <span className="flex-1 text-slate-200 font-medium leading-normal">{alertMessage}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        className="relative w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[90vh] my-4"
      >
        {/* Top Header */}
        <div className="bg-slate-900 px-8 py-5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <RefreshCw className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold font-display tracking-tight text-lg">SmartBiz Sandbox Live Demo</span>
                <span className="text-[9px] font-black tracking-widest bg-blue-500 text-white px-2 py-0.5 rounded-full">INTERAKTIF</span>
              </div>
              <p className="text-[10px] text-slate-400">Silakan masukkan data uji coba di bawah ini untuk melihat keajaiban kalkulator otomatis kami!</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sidebar & Main Content */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-[260px] bg-slate-50 border-r border-slate-100 p-6 flex flex-col justify-between shrink-0">
            <div className="space-y-1.5 text-left">
              <div className="text-[10px] font-black tracking-wider text-slate-400 mb-4 block uppercase font-mono">PANEL SIMULASI</div>
              
              {[
                { id: 'finance', label: '1. Keuangan & Profit', desc: 'Arus Kas Real-time', icon: <Coins className="w-4 h-4" /> },
                { id: 'inventory', label: '2. Stok & Barang', desc: 'Indikator Stok Cerdas', icon: <Package className="w-4 h-4" /> },
                { id: 'social', label: '3. Promo Sosmed', desc: 'Integrasi Instagram & Poster', icon: <Share2 className="w-4 h-4" /> },
                { id: 'support', label: '4. Layanan Pelanggan', desc: 'Selesaikan Keluhan Tiket', icon: <MessageSquare className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "w-full p-3.5 rounded-xl text-left flex items-start gap-3 transition-all cursor-pointer",
                    activeTab === tab.id 
                      ? "bg-white border-1 border-slate-200 shadow-sm text-blue-600 font-bold" 
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg shrink-0 mt-0.5",
                    activeTab === tab.id ? "bg-blue-50 text-blue-600" : "bg-slate-200/50 text-slate-400"
                  )}>
                    {tab.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold leading-normal">{tab.label}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-medium">{tab.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200 mt-6 space-y-4 text-left">
              <div className="bg-slate-900 text-white rounded-2xl p-4 border border-white/5 space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl" />
                <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-wider">Uji Coba Penuh?</h5>
                <p className="text-[11px] text-slate-300 leading-normal">
                  Suka dengan kemudahannya? Aktifkan Free Trial 14 hari penuh sekarang.
                </p>
                <button
                  onClick={onDemoSubmitTrial}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider transition-colors"
                >
                  Aktifkan Free Trial
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Work Area */}
          <div className="flex-1 p-8 overflow-y-auto bg-slate-50/50 flex flex-col justify-between">
            <div className="w-full max-w-4xl mx-auto space-y-6">
              
              {/* TAB 1: INTERACTIVE FINANCIALS */}
              {activeTab === 'finance' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">SIMULASI REAL-TIME</span>
                    <h2 className="text-2xl font-black text-slate-900 mt-2 font-display">Kalkulator Arus Kas & Analitik Laba-Rugi</h2>
                    <p className="text-slate-500 text-xs mt-1">SmartBiz menghitung pengeluaran dan pemasukan bisnis Anda secara otomatis. Tambahkan transaksi baru di bawah untuk melihat rekapitulasi real-time.</p>
                  </div>

                  {/* Profit Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm text-left">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Pemasukan</span>
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div className="text-xl font-black text-slate-900">
                        Rp {(totals.income).toLocaleString('id-ID')}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 block">Dari {transactions.filter(t => t.type === 'income').length} transaksi</span>
                    </div>

                    <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm text-left">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Pengeluaran</span>
                        <TrendingDown className="w-4 h-4 text-rose-500" />
                      </div>
                      <div className="text-xl font-black text-slate-900 text-rose-600">
                        Rp {(totals.expense).toLocaleString('id-ID')}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 block">Dari {transactions.filter(t => t.type === 'expense').length} transaksi</span>
                    </div>

                    <div className={cn(
                      "p-5 rounded-3xl border shadow-sm text-left transition-all",
                      totals.balance >= 0 ? "bg-emerald-500 text-white border-emerald-500/20" : "bg-rose-500 text-white border-rose-500/20"
                    )}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Margin Bersih (Profit)</span>
                        <Coins className="w-4 h-4" />
                      </div>
                      <div className="text-xl font-black select-all">
                        Rp {(totals.balance).toLocaleString('id-ID')}
                      </div>
                      <span className="text-[9px] opacity-80 mt-1 block">
                        Status Keuangan: <span className="font-bold underline">{totals.balance >= 0 ? "SURPLUS" : "DEFISIT / PANTAU BIAYA"}</span>
                      </span>
                    </div>
                  </div>

                  {/* Transaction entry form & visual list */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Add form */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm lg:col-span-5 text-left space-y-4">
                      <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 border-b border-slate-100 pb-3 uppercase tracking-wider">
                        <Plus className="w-4 h-4 text-blue-600" /> Catat Transaksi Baru
                      </h3>
                      
                      <form onSubmit={handleAddTransaction} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Deskripsi / Keterangan</label>
                          <input 
                            type="text"
                            required
                            placeholder="Contoh: Beli Kopi Mentah Toraja"
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tipe Aliran</label>
                            <select
                              value={newType}
                              onChange={(e: any) => setNewType(e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white outline-none"
                            >
                              <option value="income">1. Pemasukan (+)</option>
                              <option value="expense">2. Pengeluran (-)</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Jumlah (Rp)</label>
                            <input 
                              type="number"
                              required
                              placeholder="150000"
                              value={newAmount}
                              onChange={(e) => setNewAmount(e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-semibold focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Kategori</label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-white outline-none"
                          >
                            <option value="F&B Penjualan">F&B Penjualan</option>
                            <option value="Operasional">Operasional</option>
                            <option value="Sewa Tempat">Sewa Tempat</option>
                            <option value="Dapur & Perlengkapan">Dapur & Perlengkapan</option>
                            <option value="Lain-lain">Lain-lain</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                        >
                          Hitung Otomatis & Rekam
                        </button>
                      </form>
                    </div>

                    {/* Transaction list visualizer */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm lg:col-span-7 text-left">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Buku Kas Harian (Sandbox)</span>
                        <span className="text-[10px] text-slate-400 italic">Total: {transactions.length} baris</span>
                      </div>

                      <div className="divide-y divide-slate-100 max-h-[290px] overflow-y-auto pr-1 space-y-2">
                        {transactions.map((tx) => (
                          <div key={tx.id} className="flex justify-between items-center py-2.5 hover:bg-slate-50/50 rounded-xl px-2 transition-colors">
                            <div className="flex gap-3 items-center">
                              <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                                tx.type === 'income' 
                                  ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                                  : "bg-rose-50 border-rose-100 text-rose-600"
                              )}>
                                {tx.type === 'income' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-900">{tx.desc}</h4>
                                <div className="flex gap-2 items-center text-[9px] text-slate-400 mt-0.5">
                                  <span>{tx.category}</span>
                                  <span>•</span>
                                  <span>{tx.time}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className={cn(
                                "text-xs font-black",
                                tx.type === 'income' ? "text-emerald-600" : "text-rose-600"
                              )}>
                                {tx.type === 'income' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                              </span>
                              <button
                                onClick={() => handleDeleteTransaction(tx.id, tx.desc)}
                                className="p-1 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                                title="Hapus transaksi"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {transactions.length === 0 && (
                          <div className="py-12 text-center text-slate-400 text-xs">
                            Belum ada transaksi di sandbox, silakan buat beberapa!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: INTERACTIVE INVENTORY */}
              {activeTab === 'inventory' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">KONTROL INVENTARIS</span>
                    <h2 className="text-2xl font-black text-slate-900 mt-2 font-display">Sistem Monitor Stok Cerdas (Live Alert)</h2>
                    <p className="text-slate-500 text-xs mt-1">SmartBiz memantau jumlah sisa produk Anda. Jika stok jatuh di bawah batas minimum, status berubah menjadi <span className="text-rose-600 font-bold uppercase text-[10px] bg-rose-50 px-1.5 py-0.5 rounded">HAMPIR HABIS</span> dan sistem akan mengingatkan Anda untuk re-order stock.</p>
                  </div>

                  {/* Stock Grid & Add form */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Add form */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm lg:col-span-4 text-left space-y-4">
                      <h3 className="font-bold text-slate-900 text-xs flex items-center gap-1.5 border-b border-slate-100 pb-3 uppercase tracking-wider">
                        <Plus className="w-4 h-4 text-purple-600" /> Tambah Barang Baru
                      </h3>
                      
                      <form onSubmit={handleAddProduct} className="space-y-3.5">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nama Produk</label>
                          <input 
                            type="text"
                            required
                            placeholder="Contoh: Plastik Klip Seal 10x15"
                            value={newProdName}
                            onChange={(e) => setNewProdName(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-semibold focus:border-purple-500 focus:ring-1 focus:ring-purple-500/15 outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Stok Awal</label>
                            <input 
                              type="number"
                              required
                              placeholder="15"
                              value={newProdQty}
                              onChange={(e) => setNewProdQty(e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-semibold focus:border-purple-500 focus:ring-1 focus:ring-purple-500/15 outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Batas Min (Alert)</label>
                            <input 
                              type="number"
                              required
                              placeholder="5"
                              value={newProdMin}
                              onChange={(e) => setNewProdMin(e.target.value)}
                              className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-semibold focus:border-purple-500 focus:ring-1 focus:ring-purple-500/15 outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Harga Satuan (Rp)</label>
                          <input 
                            type="number"
                            required
                            placeholder="12000"
                            value={newProdPrice}
                            onChange={(e) => setNewProdPrice(e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-semibold focus:border-purple-500 focus:ring-1 focus:ring-purple-500/15 outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                        >
                          Daftarkan Barang
                        </button>
                      </form>
                    </div>

                    {/* Stock listing */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm lg:col-span-8 text-left">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Katalog Monitor Persediaan</span>
                        <span className="text-[10px] text-purple-600 font-bold italic">Bisa kurangi/restock langsung!</span>
                      </div>

                      <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1">
                        {products.map((p) => {
                          const isLowStock = p.stock < p.minStock;
                          return (
                            <div 
                              key={p.id} 
                              className={cn(
                                "p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
                                isLowStock 
                                  ? "bg-rose-50/40 border-rose-100 ring-1 ring-rose-300/10" 
                                  : "bg-white border-slate-100"
                              )}
                            >
                              <div className="space-y-1">
                                <h4 className="font-bold text-slate-900 text-xs">{p.name}</h4>
                                <div className="flex items-center gap-2 text-[9px] text-slate-400 font-medium">
                                  <span>Harga: Rp {p.price.toLocaleString('id-ID')}</span>
                                  <span>•</span>
                                  <span>Batas Alert: {p.minStock} unit</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                {/* Stocks Counter UI */}
                                <div className="flex items-center gap-2">
                                  {/* Quick Dec Button */}
                                  <button
                                    onClick={() => {
                                      if (p.stock > 0) {
                                        setProducts(products.map(itm => itm.id === p.id ? { ...itm, stock: itm.stock - 1 } : itm));
                                      } else {
                                        addSystemAlert(`Stok "${p.name}" sudah nol.`);
                                      }
                                    }}
                                    className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
                                    title="Kurangi stok 1"
                                  >
                                    -
                                  </button>
                                  
                                  <div className="w-12 text-center">
                                    <div className="text-sm font-black text-slate-900">{p.stock}</div>
                                    <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">UNIT</div>
                                  </div>

                                  {/* Quick Inc Button */}
                                  <button
                                    onClick={() => {
                                      setProducts(products.map(itm => itm.id === p.id ? { ...itm, stock: itm.stock + 1 } : itm));
                                    }}
                                    className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold text-sm"
                                    title="Tambah stok 1"
                                  >
                                    +
                                  </button>
                                </div>

                                {/* Status indicators */}
                                <div className="flex items-center gap-2 min-w-[130px] justify-end">
                                  {isLowStock ? (
                                    <div className="text-[9px] font-black uppercase text-rose-600 bg-rose-100 px-2 py-1 rounded-md animate-pulse shrink-0">
                                      HAMPIR HABIS
                                    </div>
                                  ) : (
                                    <div className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md shrink-0">
                                      STOK AMAN
                                    </div>
                                  )}

                                  <button
                                    onClick={() => handleRestock(p.id, 25)}
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white transition-all text-slate-500 font-bold text-[9px] uppercase tracking-wide cursor-pointer shrink-0"
                                  >
                                    Restock +25
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: SMART SOCIAL PROMO POSTER SINKRONISASI */}
              {activeTab === 'social' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">SINKRONISASI ONLINE</span>
                    <h2 className="text-2xl font-black text-slate-900 mt-2 font-display">Simulasi Poster Produk & Poster Generatif</h2>
                    <p className="text-slate-500 text-xs mt-1">SmartBiz dapat langsung menjembatani perubahan katalog produk dengan memformat poster penawaran visual yang siap diunggah ke semua jajaran sosial medial Anda secara serempak.</p>
                  </div>

                  {/* Interactive template visual simulator */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Controls */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm lg:col-span-5 text-left space-y-4">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Kontrol Generator</div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tema Penawaran Poster</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'modern', label: 'Sunset Minimalis' },
                            { id: 'weekend', label: 'Emas Elegan / Premium' },
                            { id: 'dark', label: 'Neon Cyber / Modern' },
                            { id: 'pink', label: 'Strawberry Glam' },
                          ].map((tmpl) => (
                            <button
                              key={tmpl.id}
                              type="button"
                              onClick={() => setSocialTemplate(tmpl.id)}
                              className={cn(
                                "p-2.5 rounded-xl border text-3xs font-bold tracking-tight text-center transition-all cursor-pointer",
                                socialTemplate === tmpl.id 
                                  ? "bg-slate-900 border-slate-900 text-white" 
                                  : "bg-transparent border-slate-200 text-slate-600 hover:bg-slate-50"
                              )}
                            >
                              {tmpl.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Persentase Diskon Promosi</label>
                        <input 
                          type="text"
                          placeholder="Contoh: 20% ATAU Cashback Rp15.000"
                          value={discountPercent}
                          onChange={(e) => setDiscountPercent(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-slate-200 text-xs font-semibold focus:border-pink-500 focus:ring-1 focus:ring-pink-500/10 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Caption Postingan Instagram (Ketik apa saja!)</label>
                        <textarea
                          rows={4}
                          value={socialCaption}
                          onChange={(e) => setSocialCaption(e.target.value)}
                          className="w-full p-2.5 rounded-lg border border-slate-200 text-3xs font-semibold leading-relaxed focus:border-pink-500 focus:ring-1 focus:ring-pink-500/10 outline-none"
                        />
                      </div>

                      <button
                        onClick={() => addSystemAlert("Luar biasa! Feed & caption disinkronisasikan ke Instagram, TikTok, dan X dengan penawaran baru Anda!")}
                        className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-pink-500/10 cursor-pointer"
                      >
                        Otomatis Sinkron Ke Semua Medias
                      </button>
                    </div>

                    {/* Instagram/TikTok Simulator Display */}
                    <div className="bg-slate-900 rounded-3xl p-6 border border-white/5 lg:col-span-7 flex flex-col justify-center items-center">
                      <div className="w-full max-w-[320px] bg-white rounded-[2rem] p-4 text-slate-900 shadow-2xl relative border border-slate-200 flex flex-col justify-between">
                        {/* Insta Header */}
                        <div className="flex items-center gap-2 mb-3 px-1">
                          <div className="w-7 h-7 bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center p-0.5">
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-slate-800 text-[10px] font-bold">
                              SB
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black tracking-tight flex items-center gap-1">smartbiz_shop <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500 shrink-0" /></div>
                            <div className="text-[7px] text-slate-400 font-medium">Bantul, Yogyakarta</div>
                          </div>
                          <div className="text-slate-400 text-xs ml-auto">•••</div>
                        </div>

                        {/* Generated Image Poster Canvas */}
                        <div className={cn(
                          "aspect-square rounded-2xl p-6 text-white relative overflow-hidden flex flex-col justify-between text-left transition-all duration-500",
                          socialTemplate === 'modern' && "bg-gradient-to-tr from-orange-400 to-rose-500",
                          socialTemplate === 'weekend' && "bg-gradient-to-b from-amber-500 via-amber-600 to-yellow-700",
                          socialTemplate === 'dark' && "bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-900",
                          socialTemplate === 'pink' && "bg-gradient-to-tr from-pink-500 via-red-400 to-purple-500"
                        )}>
                          {/* Ambient background lights */}
                          <div className="absolute right-0 top-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />

                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-widest bg-white/25 backdrop-blur-md px-2.5 py-1 rounded-md">
                                DISKON SPESIAL
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold text-white/80 block">KODE PROMO</span>
                              <span className="text-xs font-mono font-black border border-white/30 px-1 py-0.5 rounded bg-white/10">SMARTBIZ</span>
                            </div>
                          </div>

                          <div className="space-y-1.5 z-10">
                            <span className="text-[32px] font-black tracking-tight block leading-none">{discountPercent} OFF</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-white/90">Bila Memesan Lewat Checkout</span>
                          </div>

                          <div className="flex items-center justify-between border-t border-white/20 pt-3 text-[9px]">
                            <span className="font-bold flex items-center gap-1"><Instagram className="w-3.5 h-3.5" /> Post generated by AI</span>
                            <span className="font-mono bg-white text-slate-950 px-2 py-0.5 rounded-full font-black">DIJAMIN PUAS</span>
                          </div>
                        </div>

                        {/* Likes bar and Caption preview */}
                        <div className="mt-3 px-1 space-y-1 text-left">
                          <div className="flex gap-2 text-slate-700">
                            <span>❤️ 1,248 likes</span>
                          </div>
                          <p className="text-[10px] text-slate-800 leading-relaxed font-semibold">
                            <span className="font-black mr-2">smartbiz_shop</span>
                            <span className="text-slate-500 font-medium">{socialCaption}</span>
                          </p>
                          <div className="text-[8px] text-slate-400 uppercase tracking-widest pt-1">1 MENIT YANG LALU</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: LAYANAN DU KUNGAN & CUSTOMER TIKET */}
              {activeTab === 'support' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">KOTAK MASUK TERPADU</span>
                    <h2 className="text-2xl font-black text-slate-900 mt-2 font-display">Triage Tiket & Resolusi Keluhan Konsumen</h2>
                    <p className="text-slate-500 text-xs mt-1">SmartBiz menyatukan chat dari berbagai pesan web dan kurir ke dalam satu panel asisten. Silakan bantu selesaikan tiket keluhan di bawah dengan mengambil tindakan respons cepat.</p>
                  </div>

                  {/* Customer interaction console */}
                  <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm text-left">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-3">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Antrean Tiket Terbuka Pelanggan</span>
                      <div className="flex gap-2 items-center text-[10px] bg-amber-500/10 text-amber-600 font-black px-2.5 py-1 rounded-full border border-amber-500/25">
                        {tickets.filter(t => t.status === 'pending').length} Minta Solusi Segera
                      </div>
                    </div>

                    <div className="space-y-4">
                      {tickets.map((t) => (
                        <div 
                          key={t.id} 
                          className={cn(
                            "p-5 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4",
                            t.status === 'resolved' 
                              ? "bg-slate-50/70 border-slate-200 opacity-60" 
                              : "bg-white border-amber-100 ring-1 ring-amber-400/5 shadow-md shadow-amber-500/5"
                          )}
                        >
                          <div className="space-y-2 flex-1 max-w-lg">
                            <div className="flex items-center gap-2">
                              {/* Avatar circle */}
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                                {t.customer[0]}
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-900 text-xs">{t.customer}</h4>
                                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">SALURAN INDONESIA WHATSAPP</span>
                              </div>
                            </div>
                            <p className="text-slate-600 text-[11px] leading-relaxed font-semibold italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                              "{t.message}"
                            </p>
                          </div>

                          <div className="shrink-0">
                            {t.status === 'resolved' ? (
                              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
                                <CheckCircle2 className="w-4 h-4" /> Masalah Selesai
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">PILIH STRATEGI PENYELESAIAN TIKET:</div>
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => handleResolveTicket(t.id, "Refund / Ganti Baru Gratis", t.customer)}
                                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[9px] font-bold uppercase tracking-wide transition-colors cursor-pointer"
                                  >
                                    1. Kirim Ganti Rugi
                                  </button>
                                  <button
                                    onClick={() => handleResolveTicket(t.id, "Kirim kupon voucher toko 15%", t.customer)}
                                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[9px] font-bold uppercase tracking-wide transition-colors cursor-pointer"
                                  >
                                    2. Beri Diskon Voucher
                                  </button>
                                  <button
                                    onClick={() => handleResolveTicket(t.id, "Penjelasan Menu Katering Prasmanan", t.customer)}
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[9px] font-bold uppercase tracking-wide transition-colors cursor-pointer"
                                  >
                                    3. Kirim Katalog PDF
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {tickets.every(t => t.status === 'resolved') && (
                        <div className="py-6 text-center text-emerald-600 font-bold text-xs bg-emerald-50 rounded-2xl border border-emerald-100 p-4">
                          🎉 Selamat! Seluruh tiket antrean support sandbox Anda kini telah diselesaikan dengan taktik resolusi yang cerdas!
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

            </div>

            <div className="mt-8 text-center pt-6 border-t border-slate-100 max-w-4xl mx-auto flex flex-col sm:row items-center justify-between gap-4 text-xs text-slate-400 font-medium shrink-0">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="text-emerald-500 w-4 h-4 shrink-0" /> Seluruh perubahan rekam data disimpan sementara di dalam Client Sandbox lokal Anda.
              </span>
              <button
                onClick={onDemoSubmitTrial}
                className="py-2.5 px-6 bg-slate-950 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-2 cursor-pointer transition-all shrink-0"
              >
                Inisialisasi Keanggotaan Trial Gratis 14 Hari <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
