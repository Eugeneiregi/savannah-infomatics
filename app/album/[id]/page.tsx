"use client";

import React, { useState, useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation'; 
import axios from 'axios';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface Album {
    userId: number;
    id: number;
    title: string;
}

interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const albumpage = () => {
    const [album, setAlbum] = useState<Album | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAlbumPhotos = async () => {
          setLoading(true);
          try {
            const albumResponse = await axios.get<Album>(`https://jsonplaceholder.typicode.com/albums/${id}`);
            setAlbum(albumResponse.data);
            const photosResponse = await axios.get<Photo[]>(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
            setPhotos(photosResponse.data);
            setLoading(false);
          } catch (err) {
            setLoading(false);
            console.error('Error fetching data:', err);
          }
        };
    
        fetchAlbumPhotos();
      }, [id]);

    return (
        <>
            <Header />
            <div className="p-4">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {album && <h2 className="text-2xl font-bold">{album.title} Album Photos</h2>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {photos.map((photo: Photo) => (
                                <div key={photo.id} className="cursor-pointer" onClick={() => router.push(`/photo/${photo.id}`)}>
                                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                        <img className="w-full" src={photo.url} alt={photo.title} />
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">{photo.title}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default albumpage;
