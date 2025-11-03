// "use client";

// import Container from "@/components/ui/container";
// import useGoogleLogin from "@/hooks/useGoogleLogin";
// import React, { useEffect, useState } from "react";


// export default function CallBackOAuth() {
//     const [dotLoading, setDotLoading] = useState<string>("");
//     const { getOauthAuthorizationCode, googleLogin } = useGoogleLogin();

//     useEffect(() => {
//         setInterval(() => {
//             setDotLoading((state) => {
//                 return state.length >= 3 ? "" : state + ".";
//             });
//         }, 500);


//         (async function login() {
//             const authorizationCode = await getOauthAuthorizationCode();
//             if (authorizationCode) {
//                 googleLogin(authorizationCode);
//                 console.log("Authorization code:", authorizationCode);
//             } else {
//                 console.error("Authorization code not found in URL");
//             }
//         })();

//         // cleanup interval khi component unmount
//         // return () => clearInterval(interval);
//     }, []);

//     return (
//         <Container>
//             <div className="text-3xl text-black">Logging in {dotLoading}</div>
//         </Container>
//     );
// }
"use client";

import Container from "@/components/ui/container";
import useGoogleLogin from "@/hooks/useGoogleLogin";
import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function CallBackOAuth() {
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

                console.log("Authorization code:", authorizationCode);
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Container>
                <div className="flex flex-col items-center justify-center space-y-6 py-12">
                    {/* Icon and Animation */}
                    <div className="relative">
                        {status === 'loading' && (
                            <div className="relative">
                                <Loader2 className="w-20 h-20 text-blue-600 animate-spin" />
                                <div className="absolute inset-0 w-20 h-20 border-4 border-blue-200 rounded-full animate-ping opacity-20" />
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="relative">
                                <CheckCircle2 className="w-20 h-20 text-green-600 animate-bounce" />
                                <div className="absolute inset-0 w-20 h-20 bg-green-200 rounded-full animate-ping opacity-30" />
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="relative">
                                <XCircle className="w-20 h-20 text-red-600 animate-pulse" />
                            </div>
                        )}
                    </div>

                    {/* Message */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            {status === 'loading' && "Đang xác thực"}
                            {status === 'success' && "Thành công!"}
                            {status === 'error' && "Có lỗi xảy ra"}
                        </h1>
                        <p className="text-lg text-gray-600 animate-pulse">
                            {message}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    {status === 'loading' && (
                        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-[progress_1.5s_ease-in-out_infinite]" />
                        </div>
                    )}

                    {/* Additional Info */}
                    <div className="text-center text-sm text-gray-500 max-w-md">
                        {status === 'loading' && (
                            <p>Vui lòng đợi trong giây lát...</p>
                        )}
                        {status === 'success' && (
                            <p>Bạn sẽ được chuyển hướng ngay bây giờ</p>
                        )}
                        {status === 'error' && (
                            <div className="space-y-2">
                                <p>Vui lòng thử lại hoặc liên hệ hỗ trợ</p>
                                <button
                                    onClick={() => window.location.href = '/login'}
                                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Quay lại đăng nhập
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Branding */}
                    <div className="pt-8 text-gray-400 text-sm">
                        <p>UniOrien</p>
                    </div>
                </div>
            </Container>

            <style jsx>{`
                @keyframes progress {
                    0% {
                        width: 0%;
                        margin-left: 0%;
                    }
                    50% {
                        width: 75%;
                        margin-left: 0%;
                    }
                    100% {
                        width: 0%;
                        margin-left: 100%;
                    }
                }
            `}</style>
        </div>
    );
}