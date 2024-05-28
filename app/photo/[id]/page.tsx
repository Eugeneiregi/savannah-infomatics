"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import router from 'next/router';

interface Photo {
    id: number;
    title: string;
    url: string;
    // Add any other properties here as needed
}

const PhotoPage = () => {
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [title, setTitle] = useState('');
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchPhoto = async () => {
          try {
            const photoResponse = await axios.get<Photo>(`https://jsonplaceholder.typicode.com/photos/${id}`);
            setPhoto(photoResponse.data);
            setTitle(photoResponse.data.title)
            setLoading(false);
          } catch (err) {
            setLoading(false);
            console.error('Error fetching photo:', err);
          }
        };
        fetchPhoto();
      }, [id]);
    
      const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
      };
    
      const handleSubmit = async () => {
        setLoadingUpdate(true);
        try {
          const response = await axios.patch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
            title: title,
          });
          setPhoto(response.data);
          toast.success(`Title Updated to "${response?.data?.title}" successfully`)
          setLoadingUpdate(false);
        } catch (error) {
          setLoadingUpdate(false);
          console.error('Error updating photo title:', error);
        }
      };

    return (
        <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
            <div className="h-64 mb-6">
                <img className="object-cover w-full h-full" src={photo?.url} alt={photo?.title} />
            </div>
            <div>
                <div className="font-bold text-xl mb-2">{photo?.title}</div>
                <Textarea value={title} onChange={handleTitleChange} />
            </div>
            <div className="mt-6">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={handleSubmit}
                    disabled={loadingUpdate}
                >
                    {loadingUpdate ? 'Updating...' : 'Update'}
                </button>
            </div>
            <div className="mt-6">
                <Button onClick={() => router.push('/')}>
                    Go Home
                </Button>
            </div>
        </div>
    </div>
    )
}

export default PhotoPage;
