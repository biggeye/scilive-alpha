'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleSignInWithPassword, handleOAuthLogin } from '@/lib/supabase-server';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    const signInWithPassword = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const result = await handleSignInWithPassword(email, password);
            if (result.error) {
                setMessage(result.error.message);
            } else {
                setMessage('Login successful!');
                router.push('/');
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };
    const signInWithGoogle = async () => {
        setLoading(true);
        setMessage('');

        try {
            const result = await handleOAuthLogin("google");
            if (result.error) {
                setMessage(result.error.message);
            } else {
                setMessage('Login successful!');
                router.push('/');
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form">
            <form className="auth-form" onSubmit={signInWithPassword}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email" 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password" 
                />
                <button type="submit" disabled={loading}>Sign In</button>
            </form>
            <button onClick={signInWithGoogle} disabled={loading}>
                Sign In With Google
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;
