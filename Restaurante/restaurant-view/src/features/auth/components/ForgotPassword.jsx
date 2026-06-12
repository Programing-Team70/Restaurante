import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

export const ForgotPasswordForm = ({ onSwitch }) => {
    const forgotPassword = useAuthStore((state) => state.forgotPassword);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const res = await forgotPassword(data.email);

        if (res?.success) {
            toast.success('Revisa tu bandeja para continuar con el cambio de contraseña.', {
                duration: 5000,
            });
            onSwitch();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-7'>
            {/* Campo: Email con Label Flotante e Icono */}
            <section className='input-group relative'>
                <input
                    type='email'
                    id='email-forgot'
                    placeholder=' '
                    className='peer w-full px-5 pr-12 py-4 bg-white border border-slate-300 rounded-xl outline-none focus:border-[#3b82f6] transition-all'
                    {...register('email', {
                        required: 'El correo electrónico es obligatorio',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Introduce un correo válido',
                        },
                    })}
                    aria-required='true'
                />
                <label
                    htmlFor='email-forgot'
                    className='absolute left-5 top-4 text-slate-500 pointer-events-none transition-all 
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500
                    peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-[#3b82f6] peer-focus:bg-white peer-focus:px-2
                    [:not(:placeholder-shown)]:top-[-10px] [:not(:placeholder-shown)]:text-xs [:not(:placeholder-shown)]:text-[#3b82f6] [:not(:placeholder-shown)]:bg-white [:not(:placeholder-shown)]:px-2'
                >
                    Correo Electrónico
                </label>

                {/* Icono de correo integrado en la parte derecha */}
                <div className='absolute right-5 top-4.5 text-slate-400 pointer-events-none'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                    </svg>
                </div>

                {errors.email && (
                    <p className='text-red-600 text-xs mt-1.5 ml-1' role='alert'>
                        {errors.email.message}
                    </p>
                )}
            </section>

            {/* Control de error del servidor/Zustand */}
            {error && (
                <p
                    className='text-red-600 text-sm text-center font-medium bg-red-50 py-2.5 rounded-lg border border-red-100'
                    role='alert'
                >
                    {error}
                </p>
            )}

            {/* Botón de Enviar */}
            <button
                type='submit'
                disabled={loading}
                className='w-full py-4 bg-[#3b82f6] text-white rounded-xl font-bold hover:bg-blue-600 shadow-md hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none'
            >
                {loading ? 'ENVIANDO...' : 'RECUPERAR CONTRASEÑA'}
            </button>

            {/* Enlace para volver al Login optimizado */}
            <p className='text-center text-sm text-slate-600 pt-2'>
                <button
                    type='button'
                    className='group inline-flex items-center gap-2 text-[#3b82f6] font-bold hover:text-blue-700 transition-colors'
                    onClick={onSwitch}
                >
                    {/* Flecha con animación hover hacia la izquierda */}
                    <svg
                        className='w-4 h-4 transform group-hover:-translate-x-1 transition-transform'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2.5'
                            d='M15 19l-7-7 7-7'
                        />
                    </svg>
                    Volver a Iniciar Sesión
                </button>
            </p>
        </form>
    );
};
