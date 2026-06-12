import { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { ForgotPasswordForm } from '../components/ForgotPassword';
import image from '../../../assets/img/app-icon.jpeg';

export const AuthPage = () => {
    const [isForgot, setIsForgot] = useState(false);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 p-6'>
            <div className='login-card w-full max-w-lg p-12 rounded-3xl bg-white shadow-lg border border-gray-100 text-slate-900'>
                <div className='text-center mb-10'>
                    <img
                        src={image}
                        alt='Heaven Flavor'
                        className='profile-photo mx-auto mb-4 h-20 w-auto'
                    />
                    <h1 className='text-3xl font-bold text-gray-900 text-white'>
                        {isForgot ? 'Recuperar Acceso' : 'Acceso Seguro'}
                    </h1>
                    <p className='text-slate-500 mt-1'>
                        {isForgot
                            ? 'Introduce tu correo electrónico'
                            : 'Introduce tus credenciales de administrador'}
                    </p>
                </div>

                {isForgot ? (
                    <ForgotPasswordForm onSwitch={() => setIsForgot(false)} />
                ) : (
                    <LoginForm onForgot={() => setIsForgot(true)} />
                )}

                {!isForgot && (
                    <div className='mt-8 text-center text-sm'>
                        <button
                            type='button'
                            onClick={() => setIsForgot(true)}
                            className='text-[#3b82f6] font-bold hover:underline transition-all'
                        >
                            ¿Olvidaste tu contraseña? Recupérala aquí
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
