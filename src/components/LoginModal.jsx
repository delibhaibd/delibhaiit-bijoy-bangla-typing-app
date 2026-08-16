import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Reset inputs whenever modal opens or closes
    React.useEffect(() => {
        if (isOpen) {
            setEmail('');
            setPassword('');
            setError('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const loggedUser = await login(email, password);
            if (onLoginSuccess) onLoginSuccess(loggedUser);
            onClose(); // Close modal on success
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content login-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>লগইন করুন</h2>
                <p className="login-subtitle">আপনার অ্যাকাউন্টে লগইন করুন</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>ইমেইল অ্যাড্রেস</label>
                        <input 
                            type="email" 
                            placeholder="আপনার ইমেইল অ্যাড্রেস লিখুন" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <label>পাসওয়ার্ড</label>
                        <input 
                            type="password" 
                            placeholder="আপনার পাসওয়ার্ড লিখুন" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            autoComplete="off"
                        />
                    </div>

                    {error && <div className="error-msg">{error}</div>}

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? 'লগইন হচ্ছে...' : 'লগইন'}
                    </button>
                </form>

                <div className="divider">বা</div>

                <button className="social-btn google-btn" type="button" onClick={() => alert('ভবিষ্যতে গুগল লগইন যুক্ত করা হবে!')}>
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
                    গুগল দিয়ে লগইন করুন
                </button>
            </div>
        </div>
    );
}
