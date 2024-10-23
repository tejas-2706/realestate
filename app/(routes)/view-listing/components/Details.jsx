import OlaMaps from "@/app/component/OlaMaps";
import Home from "@/app/page";
import { Button } from "@/components/ui/button";
import { Bath, BedDouble, CarFront, Drill, LandPlot, MapPin } from "lucide-react";
//import { Share } from "next/font/google";
import React from "react";
import AgentDetails from "./AgentDetails";

// const shareFont = Share({
//     subsets: ['latin'],
//   });

function Details({ listingDetail }) {
    return listingDetail && (
        <div className='my-6 flex gap-2 flex-col'>
            <div className='flex justify-between items-center'>
                <div>
                    <h2 className='text-3xl font-bold'>{listingDetail?.price}</h2>
                    <h2 className="text-gray-500 text-lg flex gap-2">
                        <MapPin />
                        {listingDetail?.address}
                    </h2>
                </div>
                <Button className="flex gap-2">Share</Button>
            </div>
            <hr></hr>
            <div className='mt-4 flex flex-col gap-3'>
                <h2 className='font-bold text-2xl'> key Features</h2>
                {/* change for vecel here */}
                <div key={listingDetail?.id} className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    <h2 className='flex gap-2 items-center bg-purple-100    
            rounded-lg text-primary justify-center '>
                        {listingDetail?.propertyType}
                    </h2>
                    <h2 className='flex gap-2 items-center bg-purple-100
                rounded-lg text-primary justify-center '>
                        <Drill />
                        Built In{listingDetail?.builtIn}
                    </h2>
                    <h2 className='flex gap-2 items-center bg-purple-100
                rounded-lg text-primary justify-center '>
                        <LandPlot />
                        {listingDetail?.area} Sq.ft
                    </h2>
                    <h2 className='flex gap-2 items-center bg-purple-100
                rounded-lg text-primary justify-center '>
                        <BedDouble />
                        {listingDetail?.bedroom} Bedroom
                    </h2>
                    <h2 className='flex gap-2 items-center bg-purple-100
                rounded-lg text-primary justify-center '>
                        <Bath />
                        {listingDetail?.bathroom}Bathroom
                    </h2>
                    <h2 className='flex gap-2 items-center bg-purple-100
                rounded-lg text-primary justify-center '>
                        <CarFront />
                        {listingDetail?.parking}Parking
                    </h2>
                </div>
            </div>

            <div className='mt-4'>
                <h2 className='font-bold text-2xl'>
                    Whats Special
                </h2>
                <p className='text-gray-600'>{listingDetail?.description}</p>

            </div>
            {/* <div>
                <h2 className='font-bold text-2xl'>
                    Find On Map
                </h2>
                <OlaMaps className='height=24px'
                    coordinates={listingDetail.OlaMaps}
                    listing={[listingDetail]}
                />
            </div> */}
            <div>
                <h2 className='font-bold text-2xl'>Contact Details</h2>

                <AgentDetails listingDetail={listingDetail} />
            </div>
        </div>
    )
}

export default Details