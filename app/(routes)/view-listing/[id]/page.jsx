"use client"
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Slider from "../components/slider.jsx";
import Details from "../components/Details.jsx";

function ViewListing({ params }) {

    const[ListingDetails,setListingDetail]=useState();

    useEffect(() => {
        GetListingDetails();
    }, [])

    const GetListingDetails = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*,listingImages(url,listing_id)')
            .eq('id', params.id)
            .eq('active',true);

        if (data) {
            setListingDetail(data[0]);
            console.log(data)
        }
        if(error){
            toast('server side error')
        }
    }

    return (
        <div className='px-4 md:px-32 lg:px-56 py-5' > 
            <Slider imageList={ListingDetails?.listingImages} />
            <Details listingDetail={ListingDetails}/>
        </div>
    )
}

export default ViewListing