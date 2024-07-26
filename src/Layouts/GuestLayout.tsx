import React, { useEffect } from 'react'
import { Header } from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const GuestLayout = ({ children }: React.PropsWithChildren<{}>) => {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth?.user) {
            navigate("/dashboard", { replace: true });
        }
    }, [auth?.user, navigate]);
    return (
        <div>
            {/* Header content */}
            <Header title='Crypto Wallet' />
            <main>
                {/* Render the main content of the page */}
                {children}
            </main>
            <footer>
                {/* Footer content */}
            </footer>
        </div>
    )
}

export default GuestLayout;