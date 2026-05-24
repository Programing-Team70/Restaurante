import React, { useState, useEffect } from 'react';
import { XCircle, Upload } from 'lucide-react';

export const RestaurantModal = ({ isOpen, onClose, onSave, initialData = null }) => {
    if (!isOpen) return null;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditMode = !!initialData;

    const [formData, setFormData] = useState({
        restaurantName: '',
        restaurantAddress: '',
        restaurantSchedule: '',
        restaurantCategory: '',
        averagePrice: '',
        phone: '',
        email: '',
        isAvailable: true,
        isActive: true,
        photos: null
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                restaurantName: initialData.restaurantName || '',
                restaurantAddress: initialData.restaurantAddress || '',
                restaurantSchedule: initialData.restaurantSchedule || '',
                restaurantCategory: initialData.restaurantCategory || '',
                averagePrice: initialData.averagePrice || '',
                phone: initialData.contact?.phone || initialData.phone || '',
                email: initialData.contact?.email || initialData.email || '',
                isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true,
                isActive: initialData.isActive !== undefined ? initialData.isActive : true,
                photos: null 
            });
        } else {
            setFormData({
                restaurantName: '',
                restaurantAddress: '',
                restaurantSchedule: '',
                restaurantCategory: '',
                averagePrice: '',
                phone: '',
                email: '',
                isAvailable: true,
                isActive: true,
                photos: null
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

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFormData({ ...formData, photos: e.target.files });
        }
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
            console.error("Error al procesar el restaurante: ", error);
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
                            {isEditMode ? 'Modificar Restaurante' : 'Crear Restaurante'}
                        </h3>
                        <p className="text-xs text-gray-300 font-normal mt-0.5">
                            {isEditMode ? 'Modifique un restaurante Heaven Flavor' : 'Cree un nuevo restaurante Heaven Flavor'}
                        </p>
                    </div>
                    <button 
                        type="button"
                        onClick={onClose} 
                        disabled={isSubmitting}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white disabled:opacity-50"
                    >
                        <XCircle size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 overflow-y-auto space-y-5 flex-1 text-left">
                    
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Nombre del Restaurante</label>
                        <input 
                            type="text" required name="restaurantName" value={formData.restaurantName} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                            placeholder="Ej. Heaven Flavor Antigua"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Dirección</label>
                        <input 
                            type="text" required name="restaurantAddress" value={formData.restaurantAddress} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                            placeholder="Ej. 5a Avenida Norte #12, Antigua Guatemala"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Horario</label>
                            <input 
                                type="text" required name="restaurantSchedule" value={formData.restaurantSchedule} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="Ej. Lu a Do - 7:00 a 22:00"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Categoría</label>
                            <input 
                                type="text" required name="restaurantCategory" value={formData.restaurantCategory} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="Ej. Gourmet"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Precio Promedio</label>
                            <input 
                                type="number" required min="0" name="averagePrice" value={formData.averagePrice} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="Ej. 0.00"
                            />
                        </div>

                        {isEditMode && (
                            <div className="flex gap-6 pt-4">
                                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-[#0a192f]">
                                    <input 
                                        type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleChange}
                                        className="w-4 h-4 rounded text-[#0a192f] focus:ring-[#0a192f] border-gray-300"
                                    />
                                    Disponible
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-100 space-y-4">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Información de Contacto</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Teléfono</label>
                                <input 
                                    type="text" required name="phone" value={formData.phone} onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                    placeholder="Ej. 15896357"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Correo Electrónico</label>
                                <input 
                                    type="email" required name="email" value={formData.email} onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                    placeholder="Ej. sede@heavenflavor.com"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">Fotografía</label>
                        <div className="border-2 border-dashed border-gray-200 hover:border-[#0a192f] rounded-xl p-4 transition-colors flex flex-col items-center justify-center bg-gray-50/30 cursor-pointer relative">
                            <input 
                                type="file" accept="image/*" onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <Upload size={24} className="text-gray-400 mb-2" />
                            <p className="text-xs font-medium text-[#0a192f]">
                                {formData.photos ? `${formData.photos[0].name}` : isEditMode ? 'Dejar vacío si no desea cambiar la imagen actual' : 'Haga clic para seleccionar o arrastre una imagen'}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">Formatos permitidos: PNG, JPG, JPEG, WEBP (Máx. 10MB)</p>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end space-x-3 border-t border-gray-100">
                        <button 
                            type="button" onClick={onClose} disabled={isSubmitting}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
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
                            {isSubmitting ? 'Procesando...' : isEditMode ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};