import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, CalendarDays, ClipboardList } from 'lucide-react';
import logo from "../../assets/img/app-logo.jpeg";

export const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full m-0 p-0 flex flex-col items-stretch space-y-10 animate-in fade-in duration-500 box-border">
            <header className="bg-[#0a192f] min-h-[400px] py-15 px-5 rounded-3xl text-white shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center w-full">
                <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
                    <div className="mb-8 overflow-hidden rounded-full border-2 border-white/10 shadow-xl">
                        <img 
                            src={logo} 
                            alt="Heaven Flavor Logo" 
                            className="w-24 h-24 md:w-40 md:h-40 object-cover"
                        />
                    </div>
                    <h1 className="text-3xl md:text-6xl font-bold tracking-tight leading-tight">
                        Heaven Flavor
                    </h1>
                    <p className="mt-6 text-blue-100/80 text-xl md:text-2xl font-light italic leading-relaxed max-w-2xl">
                        "Pureza y elegancia en cada detalle."
                    </p>
                </div>
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>
            </header>

            <section className="min-h-[100px] py-10 px-10 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-5">
                <div 
                    onClick={() => navigate('/dashboard/event')} 
                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col items-center text-center cursor-pointer group"
                >
                    <br />
                    <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                        <CalendarDays className="text-[#0a192f]" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0a192f]">Eventos</h3>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                        Organiza banquetes, festivales y actividades especiales.
                    </p>
                    <br />
                </div>

                <div 
                    onClick={() => navigate('/dashboard/order')} 
                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col items-center text-center cursor-pointer group"
                >
                    <br />
                    <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                        <ClipboardList className="text-[#0a192f]" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0a192f]">Órdenes</h3>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                        Monitorea y atiende pedidos en tiempo real.
                    </p>
                    <br />
                </div>

                <div 
                    onClick={() => navigate('/dashboard/menu')} 
                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col items-center text-center cursor-pointer group"
                >
                    <br />
                    <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                        <Utensils className="text-[#0a192f]" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0a192f]">Menú del Día</h3>
                    <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                        Actualiza platos y precios.
                    </p>
                    <br />
                </div>
            </section>
            <br />
        </div>
    );
};