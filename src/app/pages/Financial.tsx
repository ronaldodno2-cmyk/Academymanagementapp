import { useState } from "react";
import { 
  Plus, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Filter, 
  Download,
  Calendar,
  DollarSign,
  PieChart as PieChartIcon,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  X,
  FileText,
  Tag
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from "motion/react";

const financialData = [
  { month: 'Jul', receita: 32000, despesa: 18000 },
  { month: 'Ago', receita: 35000, despesa: 20000 },
  { month: 'Set', receita: 38000, despesa: 19000 },
  { month: 'Out', receita: 41000, despesa: 22000 },
  { month: 'Nov', receita: 40000, despesa: 21000 },
  { month: 'Dez', receita: 45000, despesa: 24000 },
];

const initialTransactions = [
  { id: 1, type: 'in', category: 'Mensalidade', desc: 'Ana Oliveira', amount: 120, date: '19/02/2026' },
  { id: 2, type: 'out', category: 'Aluguel', desc: 'Imobiliária Central', amount: 3500, date: '15/02/2026' },
  { id: 3, type: 'in', category: 'Loja', desc: 'Venda de Whey Protein', amount: 189, date: '19/02/2026' },
  { id: 4, type: 'out', category: 'Energia', desc: 'Enel Distribuição', amount: 1240, date: '10/02/2026' },
  { id: 5, type: 'in', category: 'Matrícula', desc: 'Carlos Eduardo', amount: 50, date: '18/02/2026' },
];

export function Financial() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [newTransaction, setNewTransaction] = useState({
    desc: '',
    amount: '',
    category: 'Outros Gastos',
    type: 'out'
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTransaction.desc || !newTransaction.amount) return;

    const transaction = {
      id: Date.now(),
      type: newTransaction.type as 'in' | 'out',
      category: newTransaction.category,
      desc: newTransaction.desc,
      amount: parseFloat(newTransaction.amount),
      date: new Date().toLocaleDateString('pt-BR')
    };

    setTransactions([transaction, ...transactions]);
    setIsModalOpen(false);
    setNewTransaction({ desc: '', amount: '', category: 'Outros Gastos', type: 'out' });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Controle Financeiro</h1>
          <p className="text-gray-400">Gerenciamento completo de entradas, saídas e previsões.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all text-sm font-medium">
            <Download className="h-4 w-4" /> Relatórios
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 text-black px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-sm font-bold"
          >
            <Plus className="h-4 w-4" /> Nova Transação
          </button>
        </div>
      </div>

      {/* Modal para Adicionar Gastos/Entradas */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#111111] border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Nova Transação</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddTransaction} className="space-y-6">
                <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                  <button 
                    type="button"
                    onClick={() => setNewTransaction({...newTransaction, type: 'in'})}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${newTransaction.type === 'in' ? 'bg-green-500 text-black' : 'text-gray-500'}`}
                  >
                    ENTRADA
                  </button>
                  <button 
                    type="button"
                    onClick={() => setNewTransaction({...newTransaction, type: 'out'})}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${newTransaction.type === 'out' ? 'bg-red-500 text-white' : 'text-gray-500'}`}
                  >
                    SAÍDA (GASTO)
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Descrição</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                      <input 
                        required
                        placeholder="Ex: Manutenção de Equipamentos"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                        value={newTransaction.desc}
                        onChange={(e) => setNewTransaction({...newTransaction, desc: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Valor (R$)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                        <input 
                          required
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                          value={newTransaction.amount}
                          onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Categoria</label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                        <select 
                          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-orange-500 outline-none appearance-none"
                          value={newTransaction.category}
                          onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                        >
                          <option value="Outros Gastos">Outros Gastos</option>
                          <option value="Manutenção">Manutenção</option>
                          <option value="Energia">Energia</option>
                          <option value="Aluguel">Aluguel</option>
                          <option value="Limpeza">Limpeza</option>
                          <option value="Marketing">Marketing</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-orange-500 text-black py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                >
                  Registrar Transação
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Month Navigator */}
      <div className="flex items-center justify-between bg-[#111111] p-4 rounded-2xl border border-white/5">
        <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-orange-500" />
          <span className="font-bold text-lg">Fevereiro 2026</span>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm font-medium">Total de Entradas</p>
            <ArrowUpCircle className="h-5 w-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">R$ 47.120,00</h3>
          <p className="text-green-500 text-xs mt-2 font-bold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +12% em relação ao mês anterior
          </p>
        </div>

        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm font-medium">Total de Saídas</p>
            <ArrowDownCircle className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">R$ 24.500,00</h3>
          <p className="text-red-500 text-xs mt-2 font-bold flex items-center gap-1">
            <TrendingDown className="h-3 w-3" /> +4% em relação ao mês anterior
          </p>
        </div>

        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm font-medium">Saldo Líquido</p>
            <DollarSign className="h-5 w-5 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-orange-500">R$ 22.620,00</h3>
          <div className="mt-2 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-[52%]"></div>
          </div>
          <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-wider">Margem de Lucro: 52%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5">
          <h3 className="font-bold text-lg mb-8">Comparativo Anual</h3>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="receita" fill="#FF8C00" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="despesa" fill="#333333" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Últimas Movimentações</h3>
            <button className="text-orange-500 text-xs font-bold hover:underline flex items-center gap-1">
              Ver Tudo <ChevronRight className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-4">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${t.type === 'in' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {t.type === 'in' ? <ArrowUpCircle className="h-5 w-5" /> : <ArrowDownCircle className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t.desc}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{t.category} • {t.date}</p>
                  </div>
                </div>
                <div className={`font-bold ${t.type === 'in' ? 'text-green-500' : 'text-white'}`}>
                  {t.type === 'in' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
