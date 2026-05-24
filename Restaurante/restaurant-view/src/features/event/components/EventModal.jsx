import React, { useState, useEffect } from 'react';
import { XCircle } from 'lucide-react';

export const EventModal = ({ isOpen, onClose, onSave, initialData = null }) => {
    if (!isOpen) return null;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditMode = !!initialData;

    const [formData, setFormData] = useState({
        restaurantId: '',
        title: '',
        description: '',
        eventType: 'cena temática',
        eventDate: '',
        capacity: 1,
        status: 'programado',
        notes: '',
        resources: {
            music: 'No requerida',
            decoration: 'No requerida',
            extraStaffNeeded: 0,
            specialMenuItems: []
        },
        isAvailable: true,
        isActive: true
    });

    useEffect(() => {
        if (initialData) {
            let formattedDate = '';
            if (initialData.eventDate) {
                const d = new Date(initialData.eventDate);
                formattedDate = d.toISOString().slice(0, 16);
            }

            setFormData({
                restaurantId: initialData.restaurantId || '',
                title: initialData.title || '',
                description: initialData.description || '',
                eventType: initialData.eventType || 'cena temática',
                eventDate: formattedDate,
                capacity: initialData.capacity || 1,
                status: initialData.status || 'programado',
                notes: initialData.notes || '',
                resources: {
                    music: initialData.resources?.music || 'No requerida',
                    decoration: initialData.resources?.decoration || 'No requerida',
                    extraStaffNeeded: initialData.resources?.extraStaffNeeded || 0,
                    specialMenuItems: initialData.resources?.specialMenuItems || []
                },
                isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true,
                isActive: initialData.isActive !== undefined ? initialData.isActive : true
            });
        } else {
            setFormData({
                restaurantId: '',
                title: '',
                description: '',
                eventType: 'cena temática',
                eventDate: '',
                capacity: 1,
                status: 'programado',
                notes: '',
                resources: {
                    music: 'No requerida',
                    decoration: 'No requerida',
                    extraStaffNeeded: 0,
                    specialMenuItems: []
                },
                isAvailable: true,
                isActive: true
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleResourceChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            resources: {
                ...prev.resources,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);
            const payload = isEditMode 
                ? { ...formData, _id: initialData._id || initialData.id }
                : formData;

            await onSave(payload);
            onClose();
        } catch (error) {
            console.error("Error al procesar el evento Heaven Flavor: ", error);
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
                            {isEditMode ? 'Modificar Evento' : 'Crear Evento'}
                        </h3>
                        <p className="text-xs text-gray-300 font-normal mt-0.5">
                            {isEditMode ? 'Modifique un evento Heaven Flavor' : 'Cree un nuevo evento Heaven Flavor'}
                        </p>
                    </div>
                    <button 
                        type="button" onClick={onClose} disabled={isSubmitting}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white disabled:opacity-50"
                    >
                        <XCircle size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-5 flex-1 text-left">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Nombre del Evento</label>
                            <input 
                                type="text" required minLength={3} maxLength={200} name="title" value={formData.title} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="Ej. Festival del Marisco 2026"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Restaurante</label>
                            <input 
                                type="text" required name="restaurantId" value={formData.restaurantId} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="ID del restaurante asignado"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Descripción</label>
                        <textarea 
                            required name="description" value={formData.description} onChange={handleChange} rows={2}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors resize-none"
                            placeholder="Describa el objetivo del evento..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Tipo</label>
                            <select 
                                name="eventType" value={formData.eventType} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                            >
                                <option value="cena temática">Cena Temática</option>
                                <option value="promoción">Promoción</option>
                                <option value="degustación">Degustación</option>
                                <option value="festival">Festival</option>
                                <option value="privado">Privado</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Fecha y Hora</label>
                            <input 
                                type="datetime-local" required name="eventDate" value={formData.eventDate} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Capacidad</label>
                            <input 
                                type="number" required min="1" max="50" name="capacity" value={formData.capacity} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50/60 p-5 rounded-2xl border border-gray-100 space-y-4">
                        <h4 className="text-xs font-bold tracking-widest text-blue-900 uppercase border-b border-gray-200 pb-2">Recursos y Logística del Evento</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Música</label>
                                <input 
                                    type="text" name="music" value={formData.resources.music} onChange={handleResourceChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0a192f] text-xs font-medium transition-colors"
                                    placeholder="Ej. Banda en vivo o Enlatada"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Estilo</label>
                                <input 
                                    type="text" name="decoration" value={formData.resources.decoration} onChange={handleResourceChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0a192f] text-xs font-medium transition-colors"
                                    placeholder="Ej. Mantelería Imperial Azul"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Meseros</label>
                                <input 
                                    type="number" min="0" name="extraStaffNeeded" value={formData.resources.extraStaffNeeded} onChange={handleResourceChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0a192f] text-xs font-medium transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {isEditMode && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-blue-50/20 p-4 rounded-xl border border-blue-100/60">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Estado del Evento</label>
                                <select 
                                    name="status" value={formData.status} onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                >
                                    <option value="programado">Programado</option>
                                    <option value="activo">Activo</option>
                                    <option value="finalizado">Finalizado</option>
                                    <option value="cancelado">Cancelado</option>
                                </select>
                            </div>
                            <div className="flex gap-6 pt-4 justify-center">
                                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#0a192f]">
                                    <input 
                                        type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange}
                                        className="w-4 h-4 rounded text-[#0a192f] focus:ring-[#0a192f] border-gray-300"
                                    />
                                    Disponible
                                </label>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Notas</label>
                        <textarea 
                            maxLength={500} name="notes" value={formData.notes} onChange={handleChange} rows={2}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors resize-none"
                            placeholder="Ej. Coordinar con cocina los requerimientos para alérgenos alimentarios..."
                        />
                    </div>

                    <div className="pt-6 flex justify-end space-x-3 border-t border-gray-100">
                        <button 
                            type="button" onClick={onClose} disabled={isSubmitting}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" disabled={isSubmitting}
                            className={`px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition-colors ${
                                isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0a192f] hover:bg-[#122b52]'
                            }`}
                        >
                            {isSubmitting ? 'Procesando...' : isEditMode ? 'Modificar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};