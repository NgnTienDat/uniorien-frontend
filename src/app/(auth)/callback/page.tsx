"use client";

import { useGoogleLogin } from "@/hooks/useGoogleLogin";
import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link"; // Import Link để dùng cho nút quay lại (nếu cần)

export default function CallBackOAuth() {
    // --- LOGIC GIỮ NGUYÊN ---
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState<string>("Đang xác thực tài khoản...");
    const { getOauthAuthorizationCode, googleLogin, isPending } = useGoogleLogin();

    useEffect(() => {
        let isMounted = true;

        (async function login() {
            try {
                const authorizationCode = await getOauthAuthorizationCode();

                if (!authorizationCode) {
                    if (isMounted) {
                        setStatus('error');
                        setMessage("Không tìm thấy mã xác thực");
                    }
                    console.error("Authorization code not found in URL");
                    return;
                }

                googleLogin(authorizationCode, {
                    onSuccess: () => {
                        if (isMounted) {
                            setStatus('success');
                            setMessage("Đăng nhập thành công!");
                        }
                    },
                    onError: (error: any) => {
                        if (isMounted) {
                            setStatus('error');
                            setMessage(error.message || "Đăng nhập thất bại");
                        }
                    }
                });
            } catch (error: any) {
                if (isMounted) {
                    setStatus('error');
                    setMessage(error.message || "Có lỗi xảy ra");
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, []);
    // --- HẾT PHẦN LOGIC ---

    // --- UI MỚI: SIMPLE & PROFESSIONAL CARD ---
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-100 p-8 md:p-10 text-center">
                
                {/* 1. Status Icon Wrapper */}
                <div className="flex justify-center mb-6">
                    {status === 'loading' && (
                        <div className="p-4 bg-blue-50 rounded-full">
                            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="p-4 bg-green-50 rounded-full animate-in zoom-in duration-300">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="p-4 bg-red-50 rounded-full animate-in zoom-in duration-300">
                            <XCircle className="w-8 h-8 text-red-600" />
                        </div>
                    )}
                </div>

                {/* 2. Title & Message */}
                <h1 className="text-xl font-bold text-slate-900 mb-2">
                    {status === 'loading' && "Đang xác thực..."}
                    {status === 'success' && "Hoàn tất!"}
                    {status === 'error' && "Xác thực thất bại"}
                </h1>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {message}
                </p>

                {/* 3. Actions (Only for Error State) */}
                {status === 'error' && (
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors text-sm"
                    >
                        Quay lại trang đăng nhập
                    </button>
                )}

                {/* 4. Footer Branding */}
                <div className="mt-8 pt-6 border-t border-slate-50">
                    <p className="text-xs text-slate-300 font-semibold tracking-wider uppercase">
                        UniOrien Secure Auth
                    </p>
                </div>
            </div>
        </div>
    );
}