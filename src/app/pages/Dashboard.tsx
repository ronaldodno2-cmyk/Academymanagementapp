import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { motion } from "motion/react";

const monthlyData = [
  { name: 'Set', receita: 4000, despesa: 2400 },
  { name: 'Out', receita: 3000, despesa: 1398 },
  { name: 'Nov', receita: 2000, despesa: 9800 },
  { name: 'Dez', receita: 2780, despesa: 3908 },
  { name: 'Jan', receita: 1890, despesa: 4800 },
  { name: 'Fev', receita: 2390, despesa: 3800 },
];

const expenseData = [
  { name: 'Aluguel', value: 3500, color: '#FF8C00' },
  { name: 'Equipamentos', value: 2000, color: '#FFA500' },
  { name: 'Staff', value: 5000, color: '#FFD700' },
  { name: 'Marketing', value: 1500, color: '#8B4513' },
];

export function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
          <p className="text-gray-400 mt-1">Bem-vindo de volta, aqui está o resumo da sua academia.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition-all text-sm font-medium">
            Exportar Relatório
          </button>
          <button className="bg-orange-500 text-black px-4 py-2 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-sm font-bold">
            Novo Aluno
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total de Alunos', value: '1,284', change: '+12.5%', icon: Users, positive: true },
          { label: 'Receita Mensal', value: 'R$ 45.200', change: '+8.2%', icon: DollarSign, positive: true },
          { label: 'Despesas', value: 'R$ 12.800', change: '-2.4%', icon: TrendingDown, positive: false },
          { label: 'Produtos Vendidos', value: '452', change: '+18%', icon: Package, positive: true },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-[#111111] p-6 rounded-2xl border border-white/5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-[#111111] p-6 rounded-2xl border border-white/5"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Comparativo Financeiro</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs outline-none focus:ring-1 focus:ring-orange-500">
              <option>Últimos 6 meses</option>
              <option>Último ano</option>
            </select>
          </div>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF8C00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF8C00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="receita" stroke="#FF8C00" strokeWidth={3} fillOpacity={1} fill="url(#colorReceita)" />
                <Area type="monotone" dataKey="despesa" stroke="#ffffff" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Expenses Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#111111] p-6 rounded-2xl border border-white/5"
        >
          <h3 className="font-bold text-lg mb-8">Distribuição de Despesas</h3>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-4 bg-orange-500/5 rounded-xl border border-orange-500/10">
            <div className="flex items-center gap-2 text-orange-500 mb-1">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-bold">Insight</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Suas despesas com Staff aumentaram 5% em relação ao mês anterior. Considere otimizar as escalas de horários.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity / Inadimplencia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Alunos Inadimplentes</h3>
            <button className="text-orange-500 text-xs font-bold hover:underline">Ver Todos</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Ricardo Santos', date: 'Vencimento: 10/02', value: 'R$ 120,00', avatar: 'RS' },
              { name: 'Juliana Lima', date: 'Vencimento: 12/02', value: 'R$ 120,00', avatar: 'JL' },
              { name: 'Marcos Pereira', date: 'Vencimento: 15/02', value: 'R$ 150,00', avatar: 'MP' },
            ].map((student, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold text-sm">
                    {student.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-red-400">{student.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{student.value}</p>
                  <button className="text-[10px] text-orange-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                    Cobrar no WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111111] p-6 rounded-2xl border border-white/5">
          <h3 className="font-bold text-lg mb-6">Produtos em Baixa</h3>
          <div className="space-y-4">
            {[
              { name: 'Whey Protein Isolado (Chocolate)', stock: 3, goal: 15, price: 'R$ 189,90' },
              { name: 'Creatina Monohidratada 300g', stock: 1, goal: 10, price: 'R$ 89,90' },
              { name: 'Pré-Treino C4 Beta Pump', stock: 2, goal: 8, price: 'R$ 145,00' },
            ].map((product, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.price}</p>
                  </div>
                  <div className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-[10px] font-bold">
                    ESTOQUE BAIXO
                  </div>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full" 
                    style={{ width: `${(product.stock / product.goal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-gray-400">Restam {product.stock} unidades</span>
                  <span className="text-[10px] text-gray-400">Meta: {product.goal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
