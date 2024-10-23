import React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


function Slider({ imageList }) {
    console.log(imageList)
    return (
        <div className="mt-5">
            {imageList ?
                <Carousel>
                    <CarouselContent>
                        {imageList.map((item,index) => (
                            <CarouselItem key={item.id || index}>
                                <img src={item.url || index} width={800}
                                    height={300}
                                    alt='image'
                                    className="rounded-xl object-cover h-[360px] w-full"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                : <div className='w-full h-[50px] bg-slate-20 animate-pulse rounded-lg'>

                </div>
            }
        </div>
    )
}
export default Slider