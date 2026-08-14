import React from 'react';

export default function FlagIcon({ lang, size = 18 }) {
    if (lang === 'bn') {
        return (
            <svg 
                width={size * 1.33} 
                height={size} 
                viewBox="0 0 20 15" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="flag-svg-icon"
                style={{ borderRadius: '3px', flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }}
            >
                <rect width="20" height="15" fill="#006A4E" rx="3" />
                <circle cx="9" cy="7.5" r="4.5" fill="#F42A41" />
            </svg>
        );
    }

    if (lang === 'en') {
        return (
            <svg 
                width={size * 1.33} 
                height={size} 
                viewBox="0 0 60 30" 
                xmlns="http://www.w3.org/2000/svg"
                className="flag-svg-icon"
                style={{ borderRadius: '3px', flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }}
            >
                <clipPath id="uk-clip">
                    <rect width="60" height="30" rx="4" />
                </clipPath>
                <clipPath id="uk-diag">
                    <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                </clipPath>
                <g clipPath="url(#uk-clip)">
                    <rect width="60" height="30" fill="#012169"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6"/>
                    <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-diag)" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10"/>
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                </g>
            </svg>
        );
    }

    if (lang === 'ar') {
        return (
            <svg 
                width={size * 1.33} 
                height={size} 
                viewBox="0 0 24 16" 
                xmlns="http://www.w3.org/2000/svg"
                className="flag-svg-icon"
                style={{ borderRadius: '3px', flexShrink: 0, display: 'inline-block', verticalAlign: 'middle', boxShadow: '0 1px 4px rgba(0,0,0,0.25)' }}
            >
                <rect width="24" height="16" rx="3" fill="#006C35" />
                <path d="M4 11h16M4 11l2-1.5M4 11l2 1.5M7 6.5h10M8 4.5h8" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
        );
    }

    return null;
}
