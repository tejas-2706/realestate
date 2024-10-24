"use client"
import React, { useEffect, useState } from 'react'
import OlaMaps from './OlaMaps'
import Listing from './Listing'
import { supabase } from '@/utils/supabase/client'
import { toast } from 'sonner'
function ListingMapView({ type }) {
    const [listing, setListing] = useState([]);
    const [searchedAddress, setSearchedAddress] = useState('');
    useEffect(() => {
        getLatestListing(type);
    }, [type])
    const getLatestListing = async (type) => {
        const data = await fetchLatestListings(type);
        setListing(data);
        console.log(data);
    };
    const handleSearchClick = async () => {
        const searchTerm = searchedAddress.split(" ")[0];
        const data = await searchListings(type, searchTerm);
        setListing(data);
        console.log(data);

    };
    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <Listing listing={listing} handleSearchClick={handleSearchClick}
                    searchedAddress={(v) => setSearchedAddress(v)} />
            </div>
            <div>
                <OlaMaps />
            </div>
        </div>
    )
}
const fetchLatestListings = async (type) => {
    const { data, error } = await supabase
        .from('listing')
        .select(`*, listingImages(
            url,
            listing_id
        )`)
        .eq('active', true)
        .eq('type', type)
        .order('id', { ascending: false });

    if (error) {
        toast("Server Side Error!!");
        return [];
    }
    return data;
}
export const fetchLatestListingsforAdmin = async (type) => {
    const { data, error } = await supabase
        .from('listing')
        .select(`
            *,
            listingImages (
                url,
                listing_id
            ),
            listingDocs (
                new_url,
                listing_id
            )
        `)
        // .eq('active', true)
        .eq('type', type)
        .order('id', { ascending: false });

    if (error) {
        toast("Server Side Error!!");
        return [];
    }
    return data;
}

export const searchListings = async (type, searchTerm) => {
    const { data, error } = await supabase
        .from('listing')
        .select(`*, listingImages(
            url,
            listing_id
        )`)
        .eq('active', true)
        .eq('type', type)
        .like('address', `%${searchTerm}%`)
        .order('id', { ascending: false });

    if (error) {
        toast("Server Side Error!!");
        return [];
    }
    return data;
}
export default ListingMapView

