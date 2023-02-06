import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import ManageContact from '@/layouts/ManageContact';

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();
    if (!session) {
        return (
            <div className="flex justify-center p-10">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => signIn('cognito')}
                >
                    Login to use admin panel
                </button>
            </div>
        );
    }
    return (
        <>
            <div className="flex justify-end p-10">
                <button
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => signOut()}
                >
                    Logout
                </button>
            </div>
            <ManageContact />
        </>
    );
}
