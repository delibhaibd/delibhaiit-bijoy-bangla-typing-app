import React from 'react';
import './PremiumCourseModal.css';

const COURSE_PURCHASE_URL = 'https://www.delibhaiit.com/courses/typingcourse';

export default function PremiumCourseModal({ isOpen, onClose, onOpenLogin, user, lessonTitle = 'অ্যাডভান্স লেসন' }) {
    if (!isOpen) return null;

    const isLoggedIn = !!user;
    const isAdmin = !!user?.isAdmin;

    const handlePurchaseRedirect = () => {
        window.open(COURSE_PURCHASE_URL, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="premium-modal-backdrop" onClick={onClose}>
            <div className="premium-modal-card" onClick={(e) => e.stopPropagation()}>
                {/* Glowing Crown / Diamond Header Icon */}
                <div className="premium-card-crown-wrap">
                    <div className="crown-glow-halo"></div>
                    <span className="premium-crown-icon">💎</span>
                </div>

                <button className="premium-modal-close-x" onClick={onClose} title="বন্ধ করুন">
                    ✕
                </button>

                <div className="premium-modal-header">
                    <div className="premium-pill-tag">
                        <span>⚡ delibhai IT Mastery Course</span>
                    </div>
                    <h2 className="premium-title">
                        {isLoggedIn 
                            ? 'সম্পূর্ণ টাইপিং কোর্সটি আনলক করুন' 
                            : 'পরবর্তী লেসনে যেতে প্রথমে লগইন করুন'}
                    </h2>
                    <p className="premium-subtitle">
                        {isLoggedIn ? (
                            <>
                                আপনি প্রথম ফ্রি ট্রায়াল লেসন সফলভাবে উপভোগ করেছেন। 
                                <br />
                                <strong>'{lessonTitle}'</strong> সহ বাকি সকল অ্যাডভান্স ড্রিল ও সার্টিফিকেট পেতে কোর্সটি এনরোল করুন।
                            </>
                        ) : (
                            <>
                                প্রতিটি ক্যাটাগরির ১ম লেসন সবার জন্য উন্মুক্ত। পরবর্তী সকল অ্যাডভান্স লেসন ও অগ্রগতি ট্র্যাক করতে আপনার একাউন্টে লগইন করুন।
                            </>
                        )}
                    </p>
                </div>

                {/* Course Benefits Grid */}
                <div className="premium-benefits-list">
                    <div className="benefit-item">
                        <span className="benefit-icon">🎯</span>
                        <div className="benefit-text">
                            <strong>১০০% নির্ভুল বাংলা (বিজয়), ইংরেজি ও আরবি</strong>
                            <span>সকল যুক্তবর্ণ, হরকত, সিম্বল ও হোম-টপ-বটম রোর পূর্ণাঙ্গ গাইড</span>
                        </div>
                    </div>

                    <div className="benefit-item">
                        <span className="benefit-icon">⚡</span>
                        <div className="benefit-text">
                            <strong>গতি বৃদ্ধির স্পেশাল এক্সারসাইজ ও শর্টকাট</strong>
                            <span>৪০+ WPM গতি অর্জনের বৈজ্ঞানিক ফিঙ্গার পজিশন মেথড</span>
                        </div>
                    </div>

                    <div className="benefit-item">
                        <span className="benefit-icon">📜</span>
                        <div className="benefit-text">
                            <strong>ভেরিফাইড প্রফেশনাল সার্টিফিকেট</strong>
                            <span>কোর্স সমাপ্তির পর সরকারি ও বেসরকারি চাকরির উপযোগী সার্টিফিকেট</span>
                        </div>
                    </div>

                    <div className="benefit-item">
                        <span className="benefit-icon">👑</span>
                        <div className="benefit-text">
                            <strong>লাইভ পারফরম্যান্স ও লাইফটাইম এক্সেস</strong>
                            <span>অগ্রগতি ক্লাউড সেভ ও যেকোনো ডিভাইস থেকে আনলিমিটেড প্র্যাক্টিস</span>
                        </div>
                    </div>
                </div>

                {/* Pricing / Offer Banner */}
                <div className="premium-offer-banner">
                    <div className="offer-left">
                        <span className="offer-badge">🔥 স্পেশাল অফার</span>
                        <span className="offer-title">ফুল কোর্স লাইফটাইম এক্সেস</span>
                    </div>
                    <div className="offer-right">
                        <span className="offer-link-hint">delibhaiit.com</span>
                    </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="premium-actions-row">
                    {!isLoggedIn ? (
                        <>
                            <button 
                                type="button" 
                                className="premium-btn-primary login-action-btn"
                                onClick={() => {
                                    onClose();
                                    if (onOpenLogin) onOpenLogin();
                                }}
                            >
                                <span className="btn-icon">🔑</span>
                                <span>আইডি লগইন / সাইন ইন করুন</span>
                            </button>

                            <button 
                                type="button" 
                                className="premium-btn-secondary buy-course-direct-btn"
                                onClick={handlePurchaseRedirect}
                            >
                                <span>🛒 কোর্স কিনুন (ওয়েবসাইট)</span>
                                <span className="btn-arrow">↗</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                type="button" 
                                className="premium-btn-primary enroll-action-btn"
                                onClick={handlePurchaseRedirect}
                            >
                                <span className="btn-icon">🚀</span>
                                <span>কোর্স পারচেজ / এনরোল করুন</span>
                                <span className="btn-arrow">↗</span>
                            </button>

                            <button 
                                type="button" 
                                className="premium-btn-secondary"
                                onClick={onClose}
                            >
                                <span>ফ্রি লেসন অনুশীলন করুন</span>
                            </button>
                        </>
                    )}
                </div>

                <div className="premium-footer-security-note">
                    🔒 নিরাপদ পেমেন্ট • তাৎক্ষণিক অ্যাক্টিভেশন • deliBhai IT সাপোর্ট
                </div>
            </div>
        </div>
    );
}
