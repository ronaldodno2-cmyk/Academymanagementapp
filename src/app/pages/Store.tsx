import { useState } from "react";
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  Package, 
  AlertTriangle,
  ShoppingCart,
  Check,
  TrendingUp,
  History,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  image: string;
}

const initialProducts: Product[] = [
  { id: '1', name: 'Whey Protein Isolado 900g', category: 'Suplementos', price: 189.90, stock: 15, minStock: 5, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&h=200&fit=crop' },
  { id: '2', name: 'Creatina Monohidratada 300g', category: 'Suplementos', price: 89.90, stock: 3, minStock: 10, image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=200&h=200&fit=crop' },
  { id: '3', name: 'Pré-Treino C4 200g', category: 'Performance', price: 145.00, stock: 8, minStock: 5, image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&h=200&fit=crop' },
  { id: '4', name: 'BCAA 2400 120 Cáps', category: 'Recuperação', price: 59.90, stock: 20, minStock: 8, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop' },
];

export function Store() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<{product: Product, qty: number}[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error("Produto sem estoque!");
      return;
    }
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? {...item, qty: item.qty + 1} : item));
    } else {
      setCart([...cart, { product, qty: 1 }]);
    }
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  const totalCart = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);

  const finalizeSale = () => {
    toast.success("Venda realizada com sucesso!", {
      description: `Valor total: R$ ${totalCart.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    });
    setCart([]);
    setCartOpen(false);
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loja de Suplementos</h1>
          <p className="text-gray-400">Controle de estoque e vendas rápidas no balcão.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setCartOpen(true)}
            className="relative bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-all"
          >
            <ShoppingCart className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                {cart.length}
              </span>
            )}
          </button>
          <button className="bg-orange-500 text-black px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-sm font-bold flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Novo Produto
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={product.id} 
            className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden group"
          >
            <div className="aspect-square relative overflow-hidden bg-black/50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
              {product.stock <= product.minStock && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-lg">
                  <AlertTriangle className="h-3 w-3" /> BAIXO ESTOQUE
                </div>
              )}
            </div>
            <div className="p-5 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{product.category}</span>
                <h3 className="font-bold text-lg leading-tight mt-1 line-clamp-1">{product.name}</h3>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Preço</p>
                  <p className="text-xl font-bold text-white">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Estoque</p>
                  <p className={`text-sm font-bold ${product.stock <= product.minStock ? 'text-red-500' : 'text-gray-300'}`}>
                    {product.stock} un
                  </p>
                </div>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-white/5 border border-white/10 hover:bg-orange-500 hover:text-black hover:border-orange-500 py-3 rounded-xl font-bold text-xs transition-all uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" /> Adicionar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="relative w-full max-w-md h-full bg-[#111111] border-l border-white/10 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5 text-orange-500" />
                  <h2 className="text-xl font-bold">Carrinho</h2>
                </div>
                <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-white">
                  <Trash2 className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-6 rounded-full bg-white/5">
                      <ShoppingBag className="h-12 w-12 text-gray-700" />
                    </div>
                    <p className="text-gray-500 font-medium">Seu carrinho está vazio</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-3 bg-black rounded-2xl border border-white/5">
                      <img src={item.product.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                      <div className="flex-1">
                        <p className="font-bold text-sm line-clamp-1">{item.product.name}</p>
                        <p className="text-orange-500 text-xs font-bold">R$ {item.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button className="w-6 h-6 rounded bg-white/5 text-xs">-</button>
                          <span className="text-xs font-bold">{item.qty}</span>
                          <button className="w-6 h-6 rounded bg-white/5 text-xs">+</button>
                        </div>
                      </div>
                      <button className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg h-fit">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/5 space-y-4 bg-black/50">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-orange-500">R$ {totalCart.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <button 
                    onClick={finalizeSale}
                    className="w-full bg-orange-500 text-black py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
                  >
                    <Check className="h-5 w-5" /> Finalizar Venda
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
