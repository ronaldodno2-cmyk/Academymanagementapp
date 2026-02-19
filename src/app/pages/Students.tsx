import { useState } from "react";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Camera, 
  Phone, 
  Calendar, 
  UserPlus, 
  CreditCard,
  AlertTriangle,
  X,
  ArrowLeft,
  ArrowRight,
  Save,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  phone: string;
  plan: string;
  dueDate: string;
  status: 'active' | 'inactive' | 'late';
  photo?: string;
}

const initialStudents: Student[] = [
  { id: '1', name: 'Ana Oliveira', phone: '11988887777', plan: 'Mensal', dueDate: '15/02/2026', status: 'late' },
  { id: '2', name: 'Bruno Gomes', phone: '11977776666', plan: 'Semestral', dueDate: '10/03/2026', status: 'active' },
  { id: '3', name: 'Carla Dias', phone: '11966665555', plan: 'Anual', dueDate: '05/03/2026', status: 'active' },
  { id: '4', name: 'Diego Souza', phone: '11955554444', plan: 'Mensal', dueDate: '20/01/2026', status: 'late' },
];

export function Students() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newStudent, setNewStudent] = useState({
    name: '',
    phone: '',
    plan: 'Mensal',
    dueDate: '',
  });

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for late payment logic (mock alert)
    const today = new Date();
    const inputDate = new Date(newStudent.dueDate);
    const isLate = inputDate < today;

    if (isLate) {
      toast.error("Alerta de Inadimplência!", {
        description: "A data de vencimento informada já passou. O aluno será cadastrado como inadimplente.",
        duration: 5000,
      });
    }

    const student: Student = {
      id: Math.random().toString(36).substr(2, 9),
      name: newStudent.name,
      phone: newStudent.phone,
      plan: newStudent.plan,
      dueDate: newStudent.dueDate.split('-').reverse().join('/'),
      status: isLate ? 'late' : 'active',
    };

    setStudents([student, ...students]);
    setModalOpen(false);
    setNewStudent({ name: '', phone: '', plan: 'Mensal', dueDate: '' });
    toast.success("Aluno cadastrado com sucesso!");
  };

  const handleWhatsAppBilling = (student: Student) => {
    const message = `Olá ${student.name}, vimos que sua mensalidade venceu em ${student.dueDate}. Podemos ajudar com o pagamento?`;
    const url = `https://wa.me/55${student.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Alunos</h1>
          <p className="text-gray-400">Gerencie matrículas, mensalidades e treinos.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-orange-500 text-black px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-sm font-bold flex items-center gap-2"
        >
          <UserPlus className="h-5 w-5" />
          Novo Aluno
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#111111] border border-white/5 p-4 rounded-2xl flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou CPF..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
          />
        </div>
        <select className="bg-black border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500">
          <option>Todos os Status</option>
          <option>Ativos</option>
          <option>Inativos</option>
          <option>Inadimplentes</option>
        </select>
      </div>

      {/* Students List */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider font-bold">
            <tr>
              <th className="px-6 py-4">Aluno</th>
              <th className="px-6 py-4">Plano</th>
              <th className="px-6 py-4">Vencimento</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold border border-orange-500/20">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {student.phone}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-white/5 px-2 py-1 rounded text-xs border border-white/10">
                    {student.plan}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-gray-500" />
                    {student.dueDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    student.status === 'active' 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${student.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                    {student.status === 'active' ? 'Ativo' : 'Inadimplente'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {student.status === 'late' && (
                      <button 
                        onClick={() => handleWhatsAppBilling(student)}
                        className="p-2 bg-green-600/10 text-green-500 rounded-lg hover:bg-green-600 hover:text-white transition-all"
                        title="Cobrar no WhatsApp"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    )}
                    <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-orange-500 transition-all">
                      <CreditCard className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-orange-500 transition-all">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xl font-bold">Cadastrar Novo Aluno</h2>
                <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Photo Placeholder */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-3xl bg-black border-2 border-dashed border-orange-500/30 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-orange-500 transition-all">
                        <Camera className="h-8 w-8 text-orange-500" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center px-4">Tirar Foto</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nome Completo</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Ex: João Silva"
                      value={newStudent.name}
                      onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 focus:ring-1 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Telefone (WhatsApp)</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="Ex: 11999999999"
                      value={newStudent.phone}
                      onChange={e => setNewStudent({...newStudent, phone: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 focus:ring-1 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Plano</label>
                    <select 
                      value={newStudent.plan}
                      onChange={e => setNewStudent({...newStudent, plan: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 focus:ring-1 focus:ring-orange-500 outline-none"
                    >
                      <option>Mensal</option>
                      <option>Trimestral</option>
                      <option>Semestral</option>
                      <option>Anual</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Próximo Vencimento</label>
                    <input 
                      required
                      type="date" 
                      value={newStudent.dueDate}
                      onChange={e => setNewStudent({...newStudent, dueDate: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 focus:ring-1 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span>Os dados serão salvos permanentemente.</span>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-6 py-3 rounded-xl hover:bg-white/5 transition-all text-sm font-bold"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="bg-orange-500 text-black px-8 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-sm font-bold flex items-center gap-2"
                    >
                      <Save className="h-5 w-5" />
                      Salvar Cadastro
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
