"use client";

import Header from "@/components/shared/Header";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from 'axios';
import Footer from "@/components/shared/Footer";

interface User {
    id: number;
    name: string;
}

interface Album {
    userId: number;
}

const UsersPage: React.FC = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const userResponse = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users/');
                setUsers(userResponse.data);
                const albumsResponse = await axios.get<Album[]>('https://jsonplaceholder.typicode.com/albums');
                setAlbums(albumsResponse.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    const userAlbumCounts = users.map(user => ({
        ...user,
        albumCount: albums.filter(album => album.userId === user.id).length
    }));

    return (
        <>
            {session ? (
                <>
                    <Header />
                    <div className="text-center justify-center p-10">
                        <h1 className="text-5xl text-black font-bold">
                            Welcome back, {session.user?.name}!!!
                        </h1>
                        <p className="text-2xl font-semibold">{session.user?.email}</p>
                        <Button
                            onClick={() => router.push('/')}
                            className="bg-black text-white px-10 py-5"
                        >
                            Go Back
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-4xl text-black font-bold">
                        You're not logged in
                    </h1>
                </>
            )}
            <section className="p-10 bg-primary-50 bg-dotted-pattern bg-contain">
                <h2 className="text-2xl font-bold mb-4">Users and their Albums</h2>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white text-black rounded-full">
                        {userAlbumCounts.map(user => (
                            <div
                                key={user.id}
                                className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
                                onClick={() => router.push(`/users/${user.id}`)}
                            >
                               
                                <div className="px-10 py-7 hover:bg-white text-black">
                                    <div className="font-bold text-xl mb-2">{user.name}</div>
                                    <p className="text-gray-700 text-base">
                                        Albums: {user.albumCount}
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#user</span>
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#albums</span>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </>
    );
};

export default UsersPage;
