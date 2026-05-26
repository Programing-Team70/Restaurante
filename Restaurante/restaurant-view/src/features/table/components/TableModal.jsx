import React, { useState, useEffect } from 'react';
import { XCircle, Clock, Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

export const TableModal = ({ isOpen, onClose, onSave, initialData = null }) => {
    if (!isOpen) return null;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        restaurant: '',
        capacity: '',
        location: '',
        isAvailable: true,
        isActive: true,
    });

    const [availableHours, setAvailableHours] = useState([
        { start: '12:00', end: '14:00' }
    ]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                restaurant: initialData.restaurant || '',
                capacity: initialData.capacity || '',
                location: initialData.location || '',
                isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true, 
                isActive: initialData.isActive !== undefined ? initialData.isActive : true,
            });
            if (Array.isArray(initialData.availableHours) && initialData.availableHours.length > 0) {
                setAvailableHours(initialData.availableHours);
            } else {
                setAvailableHours([{ start: '', end: '' }]);
            }
        } else {
            setFormData({
                restaurant: '',
                capacity: '',
                location: '',
                isAvailable: true,
                isActive: true,
            });
            setAvailableHours([{ start: '12:00', end: '14:00' }]);
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const toggleAvailableState = () => {
        setFormData(prev => ({
            ...prev,
            isAvailable: !prev.isAvailable
        }));
    };

    const handleHourChange = (index, field, value) => {
        const updatedHours = [...availableHours];
        updatedHours[index][field] = value;
        setAvailableHours(updatedHours);
    };

    const addHourRange = () => {
        setAvailableHours([...availableHours, { start: '', end: '' }]);
    };

    const removeHourRange = (index) => {
        if (availableHours.length === 1) return;
        setAvailableHours(availableHours.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            const validHours = availableHours.filter(hour => hour.start && hour.end);

            const processedData = {
                ...(initialData || {}),
                ...formData,
                capacity: Number(formData.capacity),
                availableHours: validHours,
            };

            await onSave(processedData);
            onClose();
        } catch (error) {
            console.error("Error al guardar la mesa:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="fixed inset-0 bg-[#0a192f]/40 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-3xl overflow-hidden transform transition-all z-10 max-h-[90vh] flex flex-col">
                
                <div className="bg-[#0a192f] text-white px-10 py-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold tracking-wide">
                            {initialData ? 'Modificar Mesa' : 'Crear Mesa'}
                        </h3>
                        <p className="text-xs text-gray-300 font-normal mt-0.5">Gestione las mesas Heaven Flavor</p>
                    </div>
                    <button 
                        type="button"
                        onClick={onClose} 
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white"
                    >
                        <XCircle size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-5 flex-1 text-left">
                    
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                            ID del Restaurante
                        </label>
                        <input 
                            type="text" required name="restaurant" value={formData.restaurant} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                            placeholder="Ej. ID hexadecimal de 24 caracteres"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                                Capacidad
                            </label>
                            <input 
                                type="number" required min="1" name="capacity" value={formData.capacity} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="Ej. 4"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                                Ubicación
                            </label>
                            <input 
                                type="text" required maxLength="200" name="location" value={formData.location} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="Ej. Terraza - Zona Norte, junto a la ventana"
                            />
                        </div>
                    </div>

                    {initialData && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                            <div className="space-y-0.5">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#0a192f]">
                                    Disponible
                                </span>
                                <p className="text-xs text-gray-400">
                                    {formData.isAvailable 
                                        ? "La mesa se encuentra disponible actualmente." 
                                        : "La mesa no se encuentra disponible actualmente."}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={toggleAvailableState}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                                    formData.isAvailable 
                                        ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' 
                                        : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                                }`}
                            >
                                {formData.isAvailable ? (
                                    <>
                                        <ToggleRight size={18} className="text-green-600" />
                                        <span>Disponible</span>
                                    </>
                                ) : (
                                    <>
                                        <ToggleLeft size={18} className="text-red-500" />
                                        <span>No Disponible</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-100 space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-200/60 pb-2">
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-gray-400" />
                                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block">
                                    Horarios
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={addHourRange}
                                className="flex items-center gap-1 text-[11px] font-bold text-[#0a192f] uppercase hover:underline"
                            >
                                <Plus size={12} strokeWidth={3} /> Añadir Rango
                            </button>
                        </div>

                        <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
                            {availableHours.map((hour, index) => (
                                <div key={index} className="flex items-center gap-4 animate-in fade-in duration-200">
                                    <div className="flex-1 grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Entrada</label>
                                            <input 
                                                type="time" required value={hour.start}
                                                onChange={(e) => handleHourChange(index, 'start', e.target.value)}
                                                className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:border-[#0a192f]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Salida</label>
                                            <input 
                                                type="time" required value={hour.end}
                                                onChange={(e) => handleHourChange(index, 'end', e.target.value)}
                                                className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:border-[#0a192f]"
                                            />
                                        </div>
                                    </div>
                                    
                                    {availableHours.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeHourRange(index)}
                                            className="mt-5 p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                            title="Eliminar este horario"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end space-x-3 border-t border-gray-100">
                        <button 
                            type="button" onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition-colors ${
                                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0a192f] hover:bg-[#122b52]'
                            }`}
                        >
                            {isSubmitting ? 'Procesando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};