import React, { useState, useEffect } from 'react';
import { XCircle } from 'lucide-react';

export const ReservationModal = ({ isOpen, onClose, onSave, initialData = null }) => {
    if (!isOpen) return null;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditMode = !!initialData;

    const [formData, setFormData] = useState({
        restaurantId: '',
        tableId: '',
        customerName: '',
        customerPhone: '',
        type: 'mesa',
        date: '',
        guests: 1,
        status: 'pendiente',
        notes: '',
        isAvalible: true,
        isActive: true
    });

    useEffect(() => {
        if (initialData) {
            let formattedDate = '';
            if (initialData.date) {
                const d = new Date(initialData.date);
                formattedDate = d.toISOString().slice(0, 16);
            }

            setFormData({
                restaurantId: initialData.restaurantId || '',
                tableId: initialData.tableId || '',
                customerName: initialData.customerName || '',
                customerPhone: initialData.customerPhone || '',
                type: initialData.type || 'mesa',
                date: formattedDate,
                guests: initialData.guests || 1,
                status: initialData.status || 'pendiente',
                notes: initialData.notes || '',
                isAvalible: initialData.isAvalible !== undefined ? initialData.isAvalible : true,
                isActive: initialData.isActive !== undefined ? initialData.isActive : true
            });
        } else {
            setFormData({
                restaurantId: '',
                tableId: '',
                customerName: '',
                customerPhone: '',
                type: 'mesa',
                date: '',
                guests: 1,
                status: 'pendiente',
                notes: '',
                isAvalible: true,
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
            console.error("Error al procesar la reservación: ", error);
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
                            {isEditMode ? 'Modificar Reservación' : 'Crear Reservación'}
                        </h3>
                        <p className="text-xs text-gray-300 font-normal mt-0.5">
                            {isEditMode ? 'Modifique una reservación Heaven Flavor' : 'Cree una nueva reservación Heaven Flavor'}
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
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Nombre del Cliente</label>
                            <input 
                                type="text" required minLength={3} maxLength={200} name="customerName" value={formData.customerName} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="Ej. Carlos Mendoza"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Teléfono</label>
                            <input 
                                type="text" required pattern="\d{8}" name="customerPhone" value={formData.customerPhone} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="Ej. 45892311"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Tipo</label>
                            <select 
                                name="type" value={formData.type} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                            >
                                <option value="mesa">Mesa</option>
                                <option value="domicilio">Domicilio</option>
                                <option value="para llevar">Para Llevar</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Fecha y Hora</label>
                            <input 
                                type="datetime-local" required name="date" value={formData.date} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Comensales</label>
                            <input 
                                type="number" required min="1" max="50" name="guests" value={formData.guests} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Restaurante</label>
                            <input 
                                type="text" required name="restaurantId" value={formData.restaurantId} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm transition-colors"
                                placeholder="ID del restaurante"
                            />
                        </div>
    
                        {formData.type === 'mesa' && (
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">Mesa</label>
                                <input 
                                    type="text" required name="tableId" value={formData.tableId} onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:outline-none focus:border-blue-900 bg-blue-50/20 text-xs font-mono transition-colors"
                                    placeholder="ID de la mesa"
                                />
                            </div>
                        )}
                    </div>

                    {isEditMode && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Estado</label>
                                <select 
                                    name="status" value={formData.status} onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                >
                                    <option value="pendiente">Pendiente</option>
                                    <option value="confirmada">Confirmada</option>
                                    <option value="en curso">En Curso</option>
                                    <option value="completada">Completada</option>
                                    <option value="cancelada">Cancelada</option>
                                </select>
                            </div>
                            <div className="flex gap-6 pt-4 justify-center">
                                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#0a192f]">
                                    <input 
                                        type="checkbox" name="isAvalible" checked={formData.isAvalible} onChange={handleChange}
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
                            maxLength={500} name="notes" value={formData.notes} onChange={handleChange} rows={3}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors resize-none"
                            placeholder="Ej. El cliente solicita mesa cerca de la ventana y es alérgico a los mariscos."
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
                            {isSubmitting ? 'Procesando...' : isEditMode ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};