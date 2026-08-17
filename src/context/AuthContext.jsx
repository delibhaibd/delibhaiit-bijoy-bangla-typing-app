import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Default Public Student User for Testing View
const DEFAULT_PUBLIC_STUDENT = {
    id: 'student_delibhaiitbd',
    email: 'delibhaiitbd@gmail.com',
    name: 'DeliBhai Student',
    role: 'student',
    isAdmin: false
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in from localStorage, otherwise auto-login as public student
        const loggedInUser = localStorage.getItem('bijoyMockUser');

        if (loggedInUser) {
            try {
                const parsed = JSON.parse(loggedInUser);
                if (parsed && parsed.email) {
                    setUser(parsed);
                } else {
                    setUser(DEFAULT_PUBLIC_STUDENT);
                    localStorage.setItem('bijoyMockUser', JSON.stringify(DEFAULT_PUBLIC_STUDENT));
                }
            } catch {
                setUser(DEFAULT_PUBLIC_STUDENT);
                localStorage.setItem('bijoyMockUser', JSON.stringify(DEFAULT_PUBLIC_STUDENT));
            }
        } else {
            // Automatic public login on first visit or page reload in logged-out state
            setUser(DEFAULT_PUBLIC_STUDENT);
            localStorage.setItem('bijoyMockUser', JSON.stringify(DEFAULT_PUBLIC_STUDENT));
        }
        setLoading(false);
    }, []);

    // Cross-Domain Popup Authentication Listener (Single Sign-On from delibhaiit.com)
    useEffect(() => {
        const handleAuthMessage = (event) => {
            const data = event.data;
            if (!data) return;

            // Check for delibhai auth success events
            if (
                data.type === 'DELIBHAI_AUTH_SUCCESS' || 
                data.type === 'DELIBHAI_LOGIN_SUCCESS' || 
                data.type === 'DELIBHAI_REGISTER_SUCCESS' ||
                data.action === 'login_success' ||
                data.action === 'delibhai_auth'
            ) {
                const rawUser = data.user || data.payload || data;
                const email = (rawUser.email || rawUser.userEmail || '').trim();
                if (!email) return;

                const trimmedEmail = email.toLowerCase();
                const isAdmin = trimmedEmail === 'bkctg540@gmail.com' || Boolean(rawUser.isAdmin);
                
                const authenticatedUser = {
                    id: rawUser.id || `user_${Date.now()}`,
                    email: email,
                    name: rawUser.name || rawUser.userName || email.split('@')[0],
                    role: isAdmin ? 'admin' : (rawUser.role || 'student'),
                    isAdmin: isAdmin,
                    isPremium: Boolean(rawUser.isPremium || rawUser.hasPurchased || isAdmin),
                    token: rawUser.token || ''
                };

                setUser(authenticatedUser);
                localStorage.setItem('bijoyMockUser', JSON.stringify(authenticatedUser));
                localStorage.removeItem('bijoyLoggedOut');
            }
        };

        window.addEventListener('message', handleAuthMessage);
        return () => window.removeEventListener('message', handleAuthMessage);
    }, []);

    const login = async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const trimmedEmail = email?.trim()?.toLowerCase();
                
                // 1. Admin Authentication Logic
                if (trimmedEmail === 'bkctg540@gmail.com' && password === 'B@blo22256540!') {
                    const adminUser = {
                        id: 'admin_bkctg540',
                        email: 'bkctg540@gmail.com',
                        name: 'Bablo Admin',
                        role: 'admin',
                        isAdmin: true
                    };
                    setUser(adminUser);
                    localStorage.setItem('bijoyMockUser', JSON.stringify(adminUser));
                    localStorage.removeItem('bijoyLoggedOut');
                    resolve(adminUser);
                } 
                // 2. Public Testing Student Authentication Logic (delibhaiitbd@gmail.com & delibhaibd@gmail.com)
                else if ((trimmedEmail === 'delibhaiitbd@gmail.com' || trimmedEmail === 'delibhaibd@gmail.com') && password === '0000') {
                    const studentUser = {
                        id: trimmedEmail === 'delibhaibd@gmail.com' ? 'student_delibhaibd' : 'student_delibhaiitbd',
                        email: trimmedEmail,
                        name: 'DeliBhai Student',
                        role: 'student',
                        isAdmin: false
                    };
                    setUser(studentUser);
                    localStorage.setItem('bijoyMockUser', JSON.stringify(studentUser));
                    resolve(studentUser);
                } else {
                    reject(new Error('ইমেইল বা পাসওয়ার্ড সঠিক নয়!'));
                }
            }, 300);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('bijoyMockUser');
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

