import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const LoginForm = ({ onForgot }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const login = useAuthStore((state) => state.login);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const res = await login(data);
        if (res?.success) {
            navigate('/dashboard/main');
            toast.success('¡Bienvenido de nuevo!', { duration: 4000 });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-7'>
            {/* Campo: Usuario / Email */}
            <section className='input-group relative'>
                <input
                    type='text'
                    id='user-login'
                    placeholder=' '
                    className='w-full px-5 py-4 bg-white border border-slate-300 rounded-xl outline-none focus:border-[#3b82f6]'
                    {...register('emailOrUsername', {
                        required: 'Este campo es obligatorio',
                    })}
                    aria-required='true'
                />
                <label
                    htmlFor='user-login'
                    className='absolute left-5 top-4 text-slate-500 pointer-events-none transition-all'
                >
                    Usuario
                </label>
                {errors.emailOrUsername && (
                    <p className='text-red-600 text-xs mt-1' role='alert'>
                        {errors.emailOrUsername.message}
                    </p>
                )}
            </section>

            {/* Campo: Contraseña */}
            <section className='input-group relative'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id='pass-login'
                    placeholder=' '
                    className='w-full px-5 py-4 bg-white border border-slate-300 rounded-xl outline-none focus:border-[#3b82f6]'
                    {...register('password', {
                        required: 'La contraseña es obligatoria',
                    })}
                    aria-required='true'
                />
                <label
                    htmlFor='pass-login'
                    className='absolute left-5 top-4 text-slate-500 pointer-events-none transition-all'
                >
                    Contraseña
                </label>

                {/* Botón para alternar visibilidad */}
                <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-5 top-4 text-slate-400 hover:text-[#3b82f6] transition-colors'
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                    <svg
                        id='icon-login'
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        aria-hidden='true'
                    >
                        {showPassword ? (
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                            />
                        ) : (
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                        )}
                    </svg>
                </button>

                {errors.password && (
                    <p className='text-red-600 text-xs mt-1' role='alert'>
                        {errors.password.message}
                    </p>
                )}
            </section>

            {/* Control de error del servidor/Zustand */}
            {error && (
                <p className='text-red-600 text-sm text-center font-medium' role='alert'>
                    {error}
                </p>
            )}

            {/* Botón de Enviar */}
            <button
                type='submit'
                disabled={loading}
                className='w-full py-4 bg-[#3b82f6] text-white rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50'
            >
                {loading ? 'Iniciando...' : 'INGRESAR'}
            </button>
        </form>
    );
};
