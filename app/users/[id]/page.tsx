"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from "next/navigation";
import axios from 'axios';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

const UserData: React.FC = () => {
    const { id } = useParams();
    const [user, setUser] = useState<any>(null); // Adjust type as per your data structure
    const [albums, setAlbums] = useState<any[]>([]); // Adjust type as per your data structure
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUser(userResponse.data);
                const albumsResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
                setAlbums(albumsResponse.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.error('Error fetching data:', err);
            }
        };

        fetchUserData();
    }, [id]);

    return (
        <>
            <Header />
            <div className="bg-primary-50 bg-dotted-pattern bg-contain flex items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl p-6 bg-gray-100 rounded-lg shadow-lg">
                <Table>
                    <TableCaption className="font-bold text-3xl">{user?.name} Albums</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Index</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>User ID</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {albums.map((album, index) => (
                            <TableRow key={album.id} className="cursor-pointer hover:bg-gray-200" onClick={() => router.push(`/album/${album.id}`)}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{album.title}</TableCell>
                                <TableCell>{album.userId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
            <Footer />
        </>


    );
};

export default UserData;

