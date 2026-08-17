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

// Helper to read cross-domain shared cookies (e.g. .delibhaiit.com)
const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
};

// Backend verification endpoint on delibhaiit.com
const DELIBHAI_API_BASE = 'https://www.delibhaiit.com';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sync live profile & course purchase data from delibhaiit.com backend
    const syncUserProfileFromBackend = async (token) => {
        if (!token) return null;
        try {
            const res = await fetch(`${DELIBHAI_API_BASE}/api/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                const backendUser = data.user || data;
                if (backendUser && backendUser.email) {
                    const email = backendUser.email.trim();
                    const trimmedEmail = email.toLowerCase();
                    const isAdmin = trimmedEmail === 'bkctg540@gmail.com' || Boolean(backendUser.isAdmin);
                    const isPremium = Boolean(
                        backendUser.isPremium || 
                        backendUser.hasPurchased || 
                        isAdmin ||
                        (Array.isArray(backendUser.purchasedCourses) && backendUser.purchasedCourses.some(c => c === 'typingcourse' || c?.id === 'typingcourse' || c?.slug === 'typingcourse'))
                    );

                    const syncedUser = {
                        id: backendUser.id || backendUser._id || `user_${Date.now()}`,
                        email: email,
                        name: backendUser.name || backendUser.userName || email.split('@')[0],
                        role: isAdmin ? 'admin' : (backendUser.role || 'student'),
                        isAdmin: isAdmin,
                        isPremium: isPremium,
                        purchasedCourses: backendUser.purchasedCourses || (isPremium ? ['typingcourse'] : []),
                        token: token,
                        avatar: backendUser.avatar || backendUser.photoUrl || ''
                    };

                    setUser(syncedUser);
                    localStorage.setItem('bijoyMockUser', JSON.stringify(syncedUser));
                    localStorage.removeItem('bijoyLoggedOut');
                    return syncedUser;
                }
            }
        } catch (err) {
            console.warn('[deliBhai SSO] Backend sync warning:', err);
        }
        return null;
    };

    useEffect(() => {
        const initAuth = async () => {
            // 1. Check URL query parameters (SSO Handshake when redirected from delibhaiit.com)
            const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
            const urlToken = urlParams?.get('token') || urlParams?.get('auth_token') || urlParams?.get('jwt');
            const urlEmail = urlParams?.get('email') || urlParams?.get('user_email');
            const urlName = urlParams?.get('name') || urlParams?.get('user_name');
            const urlIsPremium = urlParams?.get('is_premium') === 'true' || urlParams?.get('premium') === 'true' || urlParams?.get('purchased') === 'true';
            const urlSsoData = urlParams?.get('sso_data') || urlParams?.get('auth_data');

            let authenticatedFromUrl = false;

            if (urlSsoData) {
                try {
                    const decoded = JSON.parse(atob(urlSsoData));
                    if (decoded && decoded.email) {
                        const email = decoded.email.trim();
                        const trimmedEmail = email.toLowerCase();
                        const isAdmin = trimmedEmail === 'bkctg540@gmail.com' || Boolean(decoded.isAdmin);
                        const ssoUser = {
                            id: decoded.id || `user_${Date.now()}`,
                            email: email,
                            name: decoded.name || email.split('@')[0],
                            role: isAdmin ? 'admin' : (decoded.role || 'student'),
                            isAdmin: isAdmin,
                            isPremium: Boolean(decoded.isPremium || decoded.hasPurchased || isAdmin),
                            purchasedCourses: decoded.purchasedCourses || [],
                            token: decoded.token || ''
                        };
                        setUser(ssoUser);
                        localStorage.setItem('bijoyMockUser', JSON.stringify(ssoUser));
                        localStorage.removeItem('bijoyLoggedOut');
                        authenticatedFromUrl = true;
                    }
                } catch (e) {
                    console.warn('[deliBhai SSO] Failed to parse sso_data parameter:', e);
                }
            } else if (urlEmail) {
                const email = urlEmail.trim();
                const trimmedEmail = email.toLowerCase();
                const isAdmin = trimmedEmail === 'bkctg540@gmail.com';
                const ssoUser = {
                    id: `user_${Date.now()}`,
                    email: email,
                    name: urlName || email.split('@')[0],
                    role: isAdmin ? 'admin' : 'student',
                    isAdmin: isAdmin,
                    isPremium: urlIsPremium || isAdmin,
                    purchasedCourses: urlIsPremium ? ['typingcourse'] : [],
                    token: urlToken || ''
                };
                setUser(ssoUser);
                localStorage.setItem('bijoyMockUser', JSON.stringify(ssoUser));
                localStorage.removeItem('bijoyLoggedOut');
                authenticatedFromUrl = true;
            }

            // If token provided in URL, clean up the address bar and verify backend
            if (urlToken || urlEmail || urlSsoData) {
                if (typeof window !== 'undefined' && window.history?.replaceState) {
                    const cleanUrl = window.location.pathname + window.location.hash;
                    window.history.replaceState({}, document.title, cleanUrl);
                }
                if (urlToken) {
                    await syncUserProfileFromBackend(urlToken);
                }
            }

            if (authenticatedFromUrl) {
                setLoading(false);
                return;
            }

            // 2. Check Cross-Domain shared cookie (e.g. delibhai_token on .delibhaiit.com)
            const sharedCookieToken = getCookie('deli_auth_token') || getCookie('delibhai_token') || getCookie('token');
            if (sharedCookieToken) {
                const synced = await syncUserProfileFromBackend(sharedCookieToken);
                if (synced) {
                    setLoading(false);
                    return;
                }
            }

            // 3. Check existing localStorage session
            const loggedInUser = localStorage.getItem('bijoyMockUser');
            if (loggedInUser) {
                try {
                    const parsed = JSON.parse(loggedInUser);
                    if (parsed && parsed.email) {
                        setUser(parsed);
                        if (parsed.token) {
                            // Silently refresh backend status in background
                            syncUserProfileFromBackend(parsed.token);
                        }
                    } else {
                        setUser(DEFAULT_PUBLIC_STUDENT);
                        localStorage.setItem('bijoyMockUser', JSON.stringify(DEFAULT_PUBLIC_STUDENT));
                    }
                } catch {
                    setUser(DEFAULT_PUBLIC_STUDENT);
                    localStorage.setItem('bijoyMockUser', JSON.stringify(DEFAULT_PUBLIC_STUDENT));
                }
            } else {
                setUser(DEFAULT_PUBLIC_STUDENT);
                localStorage.setItem('bijoyMockUser', JSON.stringify(DEFAULT_PUBLIC_STUDENT));
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    // Global session refresher (cookies, backend api, and storage)
    const refreshAuthSession = async () => {
        const sharedCookieToken = getCookie('deli_auth_token') || getCookie('delibhai_token') || getCookie('token') || getCookie('jwt');
        if (sharedCookieToken) {
            const synced = await syncUserProfileFromBackend(sharedCookieToken);
            if (synced) return synced;
        }

        const currentUserRaw = localStorage.getItem('bijoyMockUser');
        if (currentUserRaw) {
            try {
                const parsed = JSON.parse(currentUserRaw);
                if (parsed?.token) {
                    const synced = await syncUserProfileFromBackend(parsed.token);
                    if (synced) return synced;
                }
            } catch (e) {}
        }
        return null;
    };

    // Auto-refresh when tab receives focus or storage changes across tabs
    useEffect(() => {
        const onWindowFocus = () => {
            refreshAuthSession();
        };

        const onStorageChange = (e) => {
            if (e.key === 'bijoyMockUser' && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    if (parsed?.email) setUser(parsed);
                } catch (err) {}
            }
        };

        window.addEventListener('focus', onWindowFocus);
        window.addEventListener('storage', onStorageChange);
        return () => {
            window.removeEventListener('focus', onWindowFocus);
            window.removeEventListener('storage', onStorageChange);
        };
    }, []);

    // Cross-Domain Popup Authentication Listener (Single Sign-On from delibhaiit.com)
    useEffect(() => {
        const handleAuthMessage = async (event) => {
            let data = event.data;
            if (!data) return;

            // Support JSON string messages
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                } catch {
                    return;
                }
            }

            // Check for delibhai auth success events
            const isAuthEvent = Boolean(
                data.type === 'DELIBHAI_AUTH_SUCCESS' || 
                data.type === 'DELIBHAI_LOGIN_SUCCESS' || 
                data.type === 'DELIBHAI_REGISTER_SUCCESS' ||
                data.type === 'LOGIN_SUCCESS' ||
                data.type === 'AUTH_SUCCESS' ||
                data.action === 'login_success' ||
                data.action === 'delibhai_auth' ||
                (data.user && data.user.email) ||
                (data.email && typeof data.email === 'string')
            );

            if (isAuthEvent) {
                const rawUser = data.user || data.payload || data.data || data;
                const email = (rawUser.email || rawUser.userEmail || '').trim();
                if (!email) return;

                const trimmedEmail = email.toLowerCase();
                const isAdmin = trimmedEmail === 'bkctg540@gmail.com' || Boolean(rawUser.isAdmin);
                const isPremium = Boolean(
                    rawUser.isPremium || 
                    rawUser.hasPurchased || 
                    isAdmin ||
                    (Array.isArray(rawUser.purchasedCourses) && rawUser.purchasedCourses.some(c => c === 'typingcourse' || c?.id === 'typingcourse' || c?.slug === 'typingcourse'))
                );
                
                const authenticatedUser = {
                    id: rawUser.id || rawUser._id || `user_${Date.now()}`,
                    email: email,
                    name: rawUser.name || rawUser.userName || email.split('@')[0],
                    role: isAdmin ? 'admin' : (rawUser.role || 'student'),
                    isAdmin: isAdmin,
                    isPremium: isPremium,
                    purchasedCourses: rawUser.purchasedCourses || (isPremium ? ['typingcourse'] : []),
                    token: rawUser.token || ''
                };

                setUser(authenticatedUser);
                localStorage.setItem('bijoyMockUser', JSON.stringify(authenticatedUser));
                localStorage.removeItem('bijoyLoggedOut');

                // If backend token is present, sync any extra data in background
                if (authenticatedUser.token) {
                    syncUserProfileFromBackend(authenticatedUser.token);
                }
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
        refreshAuthSession,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

