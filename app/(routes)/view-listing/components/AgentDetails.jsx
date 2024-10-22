import Image from "next/image";
import React from "react";

function AgentDetails({listingDetail}){
    return(
        <div>
            <Image src={listingDetail?.profileImage}
            alt="profileImage"
            width={60}
            height={60}
            className="rounded-full"
            />
            <div>
                
            </div>
        </div>       
    )
}

export default AgentDetails