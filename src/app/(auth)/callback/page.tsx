"use client";

import Container from "@/components/ui/container";
import useGoogleLogin from "@/hooks/useGoogleLogin";
import React, { useEffect, useState } from "react";


export default function CallBackOAuth() {
    const [dotLoading, setDotLoading] = useState<string>("");
    const { getOauthAuthorizationCode, googleLogin } = useGoogleLogin();

    useEffect(() => {
        
        // const interval = setInterval(() => {
        //     setDotLoading((state) => (state.length >= 3 ? "" : state + "."));
        // }, 500);
        setInterval(() => {
            setDotLoading((state) => {
                return state.length >= 3 ? "" : state + ".";
            });
        }, 500);

      
        (async function login() {
            const authorizationCode = await getOauthAuthorizationCode();
            if (authorizationCode) {
                googleLogin(authorizationCode);
                console.log("Authorization code:", authorizationCode);
            } else {
                console.error("Authorization code not found in URL");
            }
        })();

        // cleanup interval khi component unmount
        // return () => clearInterval(interval);
    }, []);

    return (
        <Container>
            <div className="text-3xl text-black">Logging in {dotLoading}</div>
        </Container>
    );
}
