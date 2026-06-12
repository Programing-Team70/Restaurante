import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const ResetPasswordForm = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const resetPassword = useAuthStore((state) => state.resetPassword);
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const res = await resetPassword({
            token,
            newPassword: data.password,
        });

        if (res?.success) {
            toast.success('¡Contraseña restablecida! Ahora puedes iniciar sesión.', {
                duration: 5000,
            });
            navigate('/');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-7'>
            <section className='input-group relative'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    placeholder=' '
                    className='w-full px-5 py-4 bg-white border border-slate-300 rounded-xl outline-none focus:border-[#3b82f6]'
                    {...register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                            value: 8,
                            message: 'Debe tener al menos 8 caracteres',
                        },
                    })}
                    aria-required='true'
                />
                <label
                    htmlFor='password'
                    className='absolute left-5 top-4 text-slate-500 pointer-events-none transition-all'
                >
                    Nueva contraseña
                </label>

                <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-5 top-4 text-slate-400 hover:text-[#3b82f6] transition-colors'
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                    <svg
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

            <section className='input-group relative'>
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id='confirmPassword'
                    placeholder=' '
                    className='w-full px-5 py-4 bg-white border border-slate-300 rounded-xl outline-none focus:border-[#3b82f6]'
                    {...register('confirmPassword', {
                        required: 'Debe confirmar la contraseña',
                        validate: {
                            matchesPassword: (value) => {
                                const passwordValue = getValues('password');
                                return value === passwordValue || 'Las contraseñas no coinciden';
                            },
                        },
                    })}
                    aria-required='true'
                />
                <label
                    htmlFor='confirmPassword'
                    className='absolute left-5 top-4 text-slate-500 pointer-events-none transition-all'
                >
                    Confirmar contraseña
                </label>

                <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-5 top-4 text-slate-400 hover:text-[#3b82f6] transition-colors'
                    aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                    <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        aria-hidden='true'
                    >
                        {showConfirmPassword ? (
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

                {errors.confirmPassword && (
                    <p className='text-red-600 text-xs mt-1' role='alert'>
                        {errors.confirmPassword.message}
                    </p>
                )}
            </section>

            {error && (
                <p className='text-red-600 text-sm text-center font-medium' role='alert'>
                    {error}
                </p>
            )}

            <button
                type='submit'
                disabled={loading}
                className='w-full py-4 bg-[#3b82f6] text-white rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50'
            >
                {loading ? 'ACTUALIZANDO...' : 'ACTUALIZAR CONTRASEÑA'}
            </button>

            <p className='text-center text-sm text-slate-600 mt-2'>
                ¿Recordaste tu contraseña?{' '}
                <button
                    type='button'
                    onClick={() => navigate('/')}
                    className='font-bold text-[#3b82f6] hover:underline transition-all'
                >
                    Iniciar sesión
                </button>
            </p>
        </form>
    );
};
