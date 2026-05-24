import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useReservationStore } from '../store/ReservationStore'; 
import { ReservationTable } from '../components/ReservationTable.jsx';
import { ReservationModal } from '../components/ReservationModal.jsx'; 
import { useSaveReservation } from '../hooks/UseReservations.js';

export const ReservationPage = () => {
    const reservations = useReservationStore((state) => state.reservations);
    const loading = useReservationStore((state) => state.loading);
    const error = useReservationStore((state) => state.error);
    const getReservations = useReservationStore((state) => state.getReservations);
    const cancelReservation = useReservationStore((state) => state.cancelReservation);
    const deleteReservation = useReservationStore((state) => state.deleteReservation);
    const { saveReservation } = useSaveReservation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        getReservations();
    }, []);

    const handleOpenCreateModal = () => {
        setSelectedReservation(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (reservation) => {
        setSelectedReservation(reservation);
        setIsModalOpen(true);
    };

    const handleSaveReservation = async (reservationData) => {
        try {
            await saveReservation(reservationData);
            await getReservations(); 
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error al procesar la reservación en Heaven Flavor:", err);
        }
    };

    return (
        <div className="w-full max-w-8xl mx-auto py-10 px-6 space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-center border-b border-gray-100 pb-5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-[#0a192f]">Reservaciones</h2>
                    <p className="text-gray-500 italic text-sm">Gestión de mesas Heaven Flavor</p>
                </div>
                <button 
                    onClick={handleOpenCreateModal}
                    className="flex items-center gap-2 bg-[#0a192f] text-white px-5 py-5 rounded-lg font-semibold hover:bg-[#112240] transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95 whitespace-nowrap tracking-wide"
                >
                    <Plus size={18} strokeWidth={2.5} /> 
                    <span>Nueva Reservación</span>
                </button>
            </header>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 text-left">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-center py-12 text-gray-400 tracking-[0.2em] uppercase text-xs animate-pulse">
                    Sincronizando con la base de datos Heaven Flavor...
                </div>
            ) : (
                <ReservationTable 
                    data={reservations} 
                    onEdit={handleOpenEditModal}
                    onCancel={cancelReservation}
                    onDelete={deleteReservation} 
                />
            )}

            <ReservationModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveReservation}
                initialData={selectedReservation}
            />
        </div>
    );
};