import React from 'react';
import { XCircle, Users, MapPin, Tag, CheckCircle2, Clock, Edit3, Trash2 } from 'lucide-react';

export const TableContainerModal = ({ isOpen, onClose, selectedTable, onEditClick, onDeleteClick }) => {
    if (!isOpen || !selectedTable) return null;

    const handleDelete = () => {
        if (window.confirm(`¿Está seguro de que desea eliminar la mesa ubicada en "${selectedTable.location || 'Sin ubicación'}"?`)) {
            onDeleteClick(selectedTable);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="fixed inset-0 bg-[#0a192f]/40 backdrop-blur-sm transition-opacity" onClick={onClose}/>

            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-xl overflow-hidden transform transition-all z-10 animate-in zoom-in-95 duration-200">
                
                <div className="bg-[#0a192f] text-white px-8 py-5 flex items-center justify-between">
                    <div>
                        <span className="text-[10px] bg-white/10 text-blue-200 font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-1 inline-block">
                            Mesa
                        </span>
                        <h3 className="text-xl font-bold tracking-wide">
                            {selectedTable.location || 'Mesa del Establecimiento'}
                        </h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-300 hover:text-white"
                    >
                        <XCircle size={22} />
                    </button>
                </div>

                <div className="p-8 space-y-6 text-sm text-left">
                    
                    <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                            <MapPin size={13} /> Ubicación
                        </span>
                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 font-medium">
                            {selectedTable.location || "No se ha ingresado una localizacion para esta mesa."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1 bg-blue-50/50 border border-blue-100/50 p-3.5 rounded-xl">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                <Users size={12} /> Capacidad
                            </span>
                            <p className="text-lg font-black text-[#0a192f]">
                                {Number(selectedTable.capacity || 0)} Comensales
                            </p>
                        </div>

                        <div className="space-y-1 bg-gray-50 p-3.5 rounded-xl">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                                <Tag size={12} /> Estado
                            </span>
                            <div className="flex items-center gap-1.5 mt-1">
                                {selectedTable.isAvailable ? (
                                    <span className="text-green-700 text-xs font-bold flex items-center gap-1">
                                        <CheckCircle2 size={14} className="text-green-600" /> Disponible
                                    </span>
                                ) : (
                                    <span className="text-red-700 text-xs font-bold flex items-center gap-1">
                                        <XCircle size={14} className="text-red-600" /> No Disponible
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                            <Clock size={13} /> Horarios
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {Array.isArray(selectedTable.availableHours) && selectedTable.availableHours.length > 0 ? (
                                selectedTable.availableHours.map((hour, index) => (
                                    <span 
                                        key={index}
                                        className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200/60 flex items-center gap-1.5"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                        {hour.start} - {hour.end}
                                    </span>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 italic">No hay horarios programados para esta mesa.</p>
                            )}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-0.5 text-[10px] text-gray-400">
                            <p><strong>ID Mesa:</strong> {String(selectedTable._id || selectedTable.id || 'N/A')}</p>
                            <p><strong>ID Relación:</strong> {String(selectedTable.restaurant || 'No asignado')}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl text-xs font-bold transition-all border border-red-200 active:scale-95"
                                title="Eliminar Mesa"
                            >
                                <Trash2 size={14} />
                                <span>Eliminar</span>
                            </button>
                            <button
                                type="button"
                                onClick={onEditClick}
                                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/10 active:scale-95"
                            >
                                <Edit3 size={14} />
                                <span>Modificar</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};