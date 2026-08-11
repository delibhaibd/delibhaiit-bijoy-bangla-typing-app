import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in from localStorage
        const loggedInUser = localStorage.getItem('bijoyMockUser');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock authentication logic for integration testing
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'delibhaibd@gmail.com' && password === 'B@blo22256540!') {
                    const mockUser = {
                        id: 'mock_user_1',
                        email: 'delibhaibd@gmail.com',
                        name: 'DeliBhai Admin'
                    };
                    setUser(mockUser);
                    localStorage.setItem('bijoyMockUser', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject(new Error('ইমেইল বা পাসওয়ার্ড সঠিক নয়!'));
                }
            }, 800); // Simulate network delay
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
