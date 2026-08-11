import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
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
                <p className="login-subtitle">আপনার কাজের প্রগ্রেস সেভ রাখতে লগইন করুন</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>ইমেইল</label>
                        <input 
                            type="email" 
                            placeholder="delibhaibd@gmail.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>পাসওয়ার্ড</label>
                        <input 
                            type="password" 
                            placeholder="********" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
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
