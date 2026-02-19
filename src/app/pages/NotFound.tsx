import { Link } from "react-router";
import { MoveLeft, Ghost } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <div className="bg-orange-500/10 p-6 rounded-full mb-6">
        <Ghost className="h-16 w-16 text-orange-500" />
      </div>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        Ops! A página que você está procurando não existe ou foi movida para outro local.
      </p>
      <Link 
        to="/" 
        className="bg-orange-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2"
      >
        <MoveLeft className="h-5 w-5" />
        Voltar ao Início
      </Link>
    </div>
  );
}
