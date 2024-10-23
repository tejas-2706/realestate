import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function AgentDetails({ listingDetail }) {
    return (
        <div className="flex gap-5 items-center justify-between p-5 
        rounded-lg shadow-md border my-6 ">
            <div className="lex items-center gap-6">
                <Image src={listingDetail?.profileImage}
                    alt="profileImage"
                    width={60}
                    height={60}
                    className="rounded-full"
                />
                <div >
                    <h2 className="text-lg font-Bold">{listingDetail?.fullName}</h2>
                    <h2 className="text-gray-500">{listingDetail?.createdBy}</h2>
                    <h2 className="text-gray-500">{listingDetail?.email}</h2>
                </div>
            </div>
            {/* <Button>Send Message</Button> */}
        </div>
    )
}

export default AgentDetails