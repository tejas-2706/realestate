"use client"
import React, { useEffect, useState } from 'react'
import { fetchLatestListingsforAdmin } from '@/app/component/ListingMapView'
import { BathIcon, BedDouble, MapPin, Ruler, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/utils/supabase/client'
import { toast } from 'sonner'
const ViewListing = ({ type }) => {
    const [listing, setListing] = useState([]);
    useEffect(() => {
        getLatestListing(type);
    }, [type])
    const getLatestListing = async (type) => {
        const data = await fetchLatestListingsforAdmin(type);
        setListing(data);
        console.log(data);
    };
    const handlePublish = async(id)=>{
       const { data, error } = await supabase
      .from('listing')
      .update({ active: true })
      .eq('id', id)
      .select()

      if(data){
        toast('Listing Published!!')
      }
    }
    return (
        <div>
            <h1 className="text-2xl font-bold text-start mb-6">Hello, Admin</h1>
            <h1 className="text-2xl font-bold text-start mb-6">Properties to Approve!!</h1>
            <div>
                <div className='flex flex-col w-1/2 gap-5'>
                    {listing?.length > 0 ? listing.map((item, index) => (
                        <div key={item.id} className='p-3 hover:border hover:bg-slate-100 rounded-lg cursor-pointer'>
                            <div>
                                {console.log(item.listingImages[0]?.url)}
                            </div>
                            <img src={item.listingImages[0]?.url}
                                width={800}
                                height={150}
                                className='rounded-lg object-cover h-[170px]' 
                                alt={item.address||'Listing Image'}/>

                            <div className='flex mt-2 flex-col gap-2'>
                                <h2 className='font-bold text-xl'>Rs.{item.price}</h2>
                                <h2 className='flex gap-2 text-sm text-gray-400'>
                                    <MapPin className='h-8 w-8' />
                                    {item.address}
                                </h2>
                                <div className='flex gap-2 mt-2 justify-between'>
                                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center w-full'>
                                        <BedDouble className='h-4 w-4' />
                                        {item?.bedroom}
                                    </h2>
                                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center w-full'>
                                        <BathIcon className='h-4 w-4' />
                                        {item?.bathroom}
                                    </h2>
                                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 text-gray-500 justify-center items-center w-full'>
                                        <Ruler className='h-4 w-4' />
                                        {item?.area}
                                    </h2>
                                    <h2>
                                        {item.id}
                                    </h2>
                                </div>
                            </div>
                            <div className='flex py-4 items-center justify-center'>
                                <Button onClick={()=>{handlePublish(item.id)}}>Allow Publish</Button>
                            </div>
                        </div>
                    ))
                        : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                            <div key={index} className='h-[230px] w-full 
            bg-slate-200 animate-pulse rounded-lg'>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewListing
