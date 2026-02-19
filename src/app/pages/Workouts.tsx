import { useState } from "react";
import { 
  Dumbbell, 
  Plus, 
  Search, 
  ChevronRight, 
  Play, 
  Clock, 
  Target,
  MoreVertical,
  Flame,
  ArrowRight,
  X,
  Repeat,
  Trophy,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  mediaUrl: string;
  type: 'video' | 'gif' | 'image';
}

interface Workout {
  id: string;
  title: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  exercises: Exercise[];
  color: string;
  category: string;
}

const mockWorkouts: Workout[] = [
  { 
    id: '1', 
    title: 'Hipertrofia - Peito & Tríceps', 
    level: 'Intermediário', 
    duration: '60 min', 
    category: 'Musculação',
    color: 'bg-orange-500',
    exercises: [
      { id: 'e1', name: 'Supino Reto com Barra', sets: 4, reps: '10-12', rest: '60s', type: 'video', mediaUrl: 'https://images.unsplash.com/photo-1651346847980-ab1c883e8cc8?w=800&q=80' },
      { id: 'e2', name: 'Crucifixo Inclinado', sets: 3, reps: '12', rest: '45s', type: 'gif', mediaUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80' },
      { id: 'e3', name: 'Tríceps Pulley', sets: 4, reps: '15', rest: '30s', type: 'video', mediaUrl: 'https://images.unsplash.com/photo-1590239068178-34fd62908c65?w=800&q=80' },
    ]
  },
  { 
    id: '2', 
    title: 'Leg Day - Quadríceps & Glúteos', 
    level: 'Avançado', 
    duration: '75 min', 
    category: 'Musculação',
    color: 'bg-red-500',
    exercises: [
      { id: 'e4', name: 'Agachamento Livre', sets: 4, reps: '8-10', rest: '90s', type: 'video', mediaUrl: 'https://images.unsplash.com/photo-1585484764802-387ea30e8432?w=800&q=80' },
      { id: 'e5', name: 'Leg Press 45º', sets: 4, reps: '12', rest: '60s', type: 'gif', mediaUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' },
    ]
  },
  { 
    id: '3', 
    title: 'Costas & Bíceps', 
    level: 'Intermediário', 
    duration: '60 min', 
    category: 'Musculação',
    color: 'bg-green-500',
    exercises: [
      { id: 'e6', name: 'Rosca Direta W', sets: 3, reps: '12', rest: '45s', type: 'video', mediaUrl: 'https://images.unsplash.com/photo-1704223523183-cc0ef35cb671?w=800&q=80' },
      { id: 'e7', name: 'Remada Curvada', sets: 4, reps: '10', rest: '60s', type: 'video', mediaUrl: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&q=80' },
    ]
  }
];

export function Workouts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const filteredWorkouts = mockWorkouts.filter(w => 
    w.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planilhas de Treino</h1>
          <p className="text-gray-400">Visualize e edite os treinos com demonstrações em vídeo/GIF.</p>
        </div>
        <button className="bg-orange-500 text-black px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-sm font-bold flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Novo Template
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Buscar treinos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111111] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <motion.div 
            key={workout.id} 
            whileHover={{ y: -5 }}
            onClick={() => setSelectedWorkout(workout)}
            className="bg-[#111111] p-6 rounded-3xl border border-white/5 group cursor-pointer relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${workout.color} opacity-[0.03] blur-3xl`} />
            
            <div className="flex justify-between items-start relative z-10">
              <div className={`p-3 rounded-2xl ${workout.color}/10 text-orange-500`}>
                <Dumbbell className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                <Flame className="h-3 w-3 text-orange-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{workout.level}</span>
              </div>
            </div>

            <div className="mt-6 relative z-10">
              <h3 className="text-xl font-bold group-hover:text-orange-500 transition-colors">{workout.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{workout.category}</p>
              
              <div className="flex items-center gap-4 mt-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Duração</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-gray-400" /> {workout.duration}
                  </span>
                </div>
                <div className="flex flex-col border-l border-white/10 pl-4">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Exercícios</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                    <Target className="h-3.5 w-3.5 text-gray-400" /> {workout.exercises.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
              <span className="text-xs text-gray-500">Última edição há 2 dias</span>
              <button className="flex items-center gap-2 text-xs font-bold text-orange-500 group-hover:gap-3 transition-all">
                VER EXERCÍCIOS <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedWorkout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWorkout(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#111111] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${selectedWorkout.color}/10 text-orange-500`}>
                    <Dumbbell className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedWorkout.title}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-orange-500 font-bold uppercase tracking-widest">{selectedWorkout.level}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-xs text-gray-400">{selectedWorkout.duration} estimado</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedWorkout(null)}
                  className="bg-white/5 hover:bg-white/10 p-3 rounded-full text-gray-400 hover:text-white transition-all"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content - Exercise List */}
              <div className="flex-1 overflow-auto p-8 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {selectedWorkout.exercises.map((ex, idx) => (
                    <motion.div 
                      key={ex.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-black/40 border border-white/5 rounded-3xl overflow-hidden hover:border-orange-500/30 transition-all"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Media Section */}
                        <div className="w-full md:w-64 h-48 relative overflow-hidden bg-black shrink-0">
                          <ImageWithFallback 
                            src={ex.mediaUrl} 
                            alt={ex.name} 
                            className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                            <div className="bg-orange-500 text-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                              <Play className="h-4 w-4 fill-current" />
                            </div>
                          </div>
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">{ex.type}</span>
                          </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="bg-orange-500 text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-md">
                                  {idx + 1}
                                </span>
                                <h4 className="text-lg font-bold">{ex.name}</h4>
                              </div>
                              <p className="text-gray-500 text-xs flex items-center gap-1.5">
                                <Info className="h-3 w-3" /> Foco em execução controlada e cadência 2:2
                              </p>
                            </div>
                            <button className="text-gray-600 hover:text-white transition-colors">
                              <MoreVertical className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-8 mt-6">
                            <div className="flex items-center gap-3">
                              <div className="bg-white/5 p-2 rounded-xl">
                                <Repeat className="h-4 w-4 text-orange-500" />
                              </div>
                              <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-none">Séries</p>
                                <p className="text-sm font-bold mt-1">{ex.sets}x</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 border-l border-white/10 pl-8">
                              <div className="bg-white/5 p-2 rounded-xl">
                                <Trophy className="h-4 w-4 text-orange-500" />
                              </div>
                              <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-none">Reps</p>
                                <p className="text-sm font-bold mt-1">{ex.reps}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 border-l border-white/10 pl-8">
                              <div className="bg-white/5 p-2 rounded-xl">
                                <Clock className="h-4 w-4 text-orange-500" />
                              </div>
                              <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-none">Descanso</p>
                                <p className="text-sm font-bold mt-1">{ex.rest}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 border-t border-white/5 bg-black/40 flex justify-end gap-4">
                <button className="px-6 py-3 rounded-2xl hover:bg-white/5 font-bold transition-all text-sm">
                  Editar Planilha
                </button>
                <button className="bg-orange-500 text-black px-10 py-3 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-sm">
                  Atribuir a Aluno
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
