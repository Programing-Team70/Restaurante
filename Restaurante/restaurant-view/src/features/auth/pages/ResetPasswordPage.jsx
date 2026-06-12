import { useSearchParams, Navigate } from 'react-router-dom';
import { ResetPasswordForm } from '../components/ResetPasswordReset';
import image from '../../../assets/img/app-icon.jpeg';

export const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    if (!token) {
        return <Navigate to='/' replace />;
    }

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
                        Restablecer Contraseña
                    </h1>
                    <p className='text-slate-500 mt-1'>
                        Por favor, ingresa tu nueva contraseña a continuación.
                    </p>
                </div>

                {/* Renderizar el formulario*/}
                <ResetPasswordForm token={token} />
            </div>
        </div>
    );
};
