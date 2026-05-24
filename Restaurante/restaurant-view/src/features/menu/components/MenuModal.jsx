import React, { useState, useEffect } from 'react';
import { XCircle, FileText, ToggleLeft, ToggleRight } from 'lucide-react';

export const MenuModal = ({ isOpen, onClose, onSave, initialData = null }) => {
    if (!isOpen) return null;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        restaurant: '',
        type: '',
        ingredients: '',
        isAvailable: true,
        isActive: true
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                _id: initialData._id || initialData.id,
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || '',
                restaurant: initialData.restaurant || '',
                type: initialData.type || '',
                ingredients: Array.isArray(initialData.ingredients) 
                    ? initialData.ingredients.join(', ') 
                    : '',
                isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true,
                isActive: initialData.isActive !== undefined ? initialData.isActive : true
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                restaurant: '',
                type: '',
                ingredients: '',
                isAvailable: true,
                isActive: true
            });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        try {
            setIsSubmitting(true);
            const processedData = {
                ...formData,
                price: Number(formData.price),
                ingredients: formData.ingredients
                    ? formData.ingredients.split(',').map(ing => ing.trim())
                    : []
            };
            await onSave(processedData);
            onClose();
        } catch (error) {
            console.error("Error al procesar el platillo: ", error);
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
                            {initialData ? 'Modificar Platillo' : 'Crear Platillo'}
                        </h3>
                        <p className="text-xs text-gray-300 font-normal mt-0.5">
                            {initialData ? 'Modifique un platillo Heaven Flavor' : 'Cree un nuevo platillo Heaven Flavor'}
                        </p>
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
                            Nombre del Platillo
                        </label>
                        <input 
                            type="text" required name="name" value={formData.name} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                            placeholder="Ej. Fettuccine Alfredo con Pollo"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                            Descripción
                        </label>
                        <textarea 
                            required rows="3" name="description" value={formData.description} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors resize-none"
                            placeholder="Ej. Pasta artesanal bañada en una cremosa salsa Alfredo..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                                Precio
                            </label>
                            <input 
                                type="number" required min="0" step="0.01" name="price" value={formData.price} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="Ej. 0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                                Restaurante
                            </label>
                            <input 
                                type="text" required name="restaurant" value={formData.restaurant} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="ID del restaurante"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0a192f] mb-2">
                            Tipo
                        </label>
                        <select 
                            required name="type" value={formData.type} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors bg-white"
                        >
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="entrada">Entrada</option>
                            <option value="plato fuerte">Plato fuerte</option>
                            <option value="postre">Postre</option>
                            <option value="bebida">Bebida</option>
                            <option value="acompañamiento">Acompañamiento</option>
                            <option value="combo">Combo</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    {initialData && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                            <div className="space-y-0.5">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#0a192f]">
                                    Disponile
                                </span>
                                <p className="text-xs text-gray-400">
                                    {formData.isAvailable 
                                        ? "El platillo se encuentra disponible actualmente." 
                                        : "El platillo no se encuentra disponible actualmente."}
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

                    <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-100 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <FileText size={16} className="text-gray-400" />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block">
                                Detalles
                            </span>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                                Ingredientes
                            </label>
                            <input 
                                type="text" name="ingredients" value={formData.ingredients} onChange={handleChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#0a192f] text-sm font-medium transition-colors"
                                placeholder="Ej. Pasta fettuccine, Crema, Queso parmesano"
                            />
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