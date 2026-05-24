import React from 'react';
import { ShieldCheck, HelpCircle, Globe } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="w-full border-t border-gray-100 bg-white/50 backdrop-blur-sm mt-auto box-border">            
            <div className="w-full py-5 px-5 md:px-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-5">
                    <div className="space-y-4">
                        <h4 className="text-[#0a192f] font-bold text-sm uppercase tracking-widest">Soporte Técnico</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            ¿Tienes problemas? Contactaa a nuestro centro de asistencia técnica.
                        </p>
                        <div className="flex items-center gap-2 text-[#0a192f] text-sm font-medium cursor-pointer hover:underline">
                            <HelpCircle size={16} /> programingteam70@gmail.com
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-[#0a192f] font-bold text-sm uppercase tracking-widest">Seguridad</h4>
                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                            <ShieldCheck size={20} className="text-green-600" />
                            Sesión protegida por cifrado de extremo a extremo.
                        </div>
                    </div>
                    <div className="space-y-4 md:text-right">
                        <h4 className="text-[#0a192f] font-bold text-sm uppercase tracking-widest">Sistema</h4>
                        <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-green-700 text-[10px] font-bold uppercase">Servidor: Online</span>
                        </div>
                        <p className="text-gray-400 text-[10px] block mt-2">Versión 2.3.8</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-100 text-gray-400 text-[10px] tracking-[0.2em] uppercase">
                    <p>© 2026 Heaven Flavor — Todos los derechos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0 italic font-medium">
                        <span className="hover:text-[#0a192f] cursor-pointer transition-colors">Términos de Uso</span>
                        <span className="hover:text-[#0a192f] cursor-pointer transition-colors">Privacidad</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};