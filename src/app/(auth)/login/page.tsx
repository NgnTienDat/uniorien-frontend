"use client"
import GoogleButton from '@/app/(auth)/login/GoogleButton';
import Container from '@/components/ui/container'
import useGoogleLogin from '@/hooks/useGoogleLogin';
import React from 'react'

function Login() {
    return (
        <Container>
            <div className="min-h-screen py-6 flex items-center justify-center">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-600">

                </h1>
                <GoogleButton />

            </div>
        </Container>
    )
}

export default Login