import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useEventStore } from '../store/EventStore.js'; 
import { EventTable } from '../components/EventTable.jsx';
import { EventModal } from '../components/EventModal.jsx'; 
import { useSaveEvent } from '../hooks/useEvent.js';

export const EventPage = () => {
    const events = useEventStore((state) => state.events);
    const loading = useEventStore((state) => state.loading);
    const error = useEventStore((state) => state.error);
    const getEvents = useEventStore((state) => state.getEvents);
    const cancelEvent = useEventStore((state) => state.cancelEvent);
    const deleteEvent = useEventStore((state) => state.deleteEvent);
    const { saveEvent } = useSaveEvent();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        getEvents();
    }, []);

    const handleOpenCreateModal = () => {
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleSaveEvent = async (eventData) => {
        try {
            await saveEvent(eventData);
            await getEvents(); 
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error al procesar el evento en Heaven Flavor:", err);
        }
    };

    return (
        <div className="w-full max-w-8xl mx-auto py-10 px-6 space-y-8 animate-in fade-in duration-500">
            <header className="flex justify-between items-center border-b border-gray-100 pb-5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-[#0a192f]">Eventos</h2>
                    <p className="text-gray-500 italic text-sm">Gestión de eventos Heaven Flavor</p>
                </div>
                <button 
                    onClick={handleOpenCreateModal}
                    className="flex items-center gap-2 bg-[#0a192f] text-white px-5 py-5 rounded-lg font-semibold hover:bg-[#112240] transition-all shadow-lg hover:shadow-blue-900/20 active:scale-95 whitespace-nowrap tracking-wide"
                >
                    <Plus size={18} strokeWidth={2.5} /> 
                    <span>Nuevo Evento</span>
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
                <EventTable 
                    data={events} 
                    onEdit={handleOpenEditModal}
                    onCancel={cancelEvent}
                    onDelete={deleteEvent} 
                />
            )}

            <EventModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEvent}
                initialData={selectedEvent}
            />
        </div>
    );
};