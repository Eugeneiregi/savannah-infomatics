"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import router from 'next/router';
import Link from "next/link"
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

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
    let router;
    if (typeof window !== 'undefined') {
        router = require('next/router').default;
    }

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
        <>
            <Header />
            <div className="flex items-center justify-center min-h-screen wrapper">
                <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                    <div className="h-74 mb-6">
                        <img className="object-cover w-full h-full" src={photo?.url} alt={photo?.title} />
                    </div>
                    <div>
                        <div className="font-bold text-xl mb-2">{photo?.title}</div>
                        <Textarea value={title} onChange={handleTitleChange} />
                    </div>
                    <div className="flex flex-col space-x-2 pt-10 px-10 py-5">

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="hover:bg-blue-700 text-white font-bold rounded">Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-slate-50 text-black">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div>
                                        <div className="font-bold text-xl mb-2">{photo?.title}</div>
                                        <Textarea value={title} onChange={handleTitleChange} />
                                    </div>
                                    <div className="flex flex-col space-x-2 pt-10 px-10 py-5">
                                        <Button
                                            className=" hover:bg-blue-700 text-white font-bold rounded"
                                            onClick={handleSubmit}
                                            disabled={loadingUpdate}
                                        >
                                            {loadingUpdate ? 'Updating...' : 'Update'}
                                        </Button>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
                                            Close
                                        </Button>
                                    </DialogClose>
                                    {/* <Button onClick={handleSubmit} disabled={loadingUpdate}>
                                        {loadingUpdate ? 'Updating...' : 'Save changes'}
                                    </Button> */}
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className="text-black font-bold px-10 py-5">
                                    <Link href="/users">Start Again</Link>           
                                </Button>
                            </DialogClose>
                        </Dialog>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default PhotoPage;
