import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {ChevronLeft,ChevronRight} from 'lucide-react'

export default function Carousel({
    items,
    slidesPerView = 2 ,
    renderItem,
    showButtons = false,
    autoplay = false,
    autoplayDelay = 2000,
}) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        slidesToScroll: 1,
        align: "start",
        containScroll: "trimSnaps",
    });


    useEffect(() => {
        if (!emblaApi || !autoplay) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, autoplayDelay);

        return () => clearInterval(interval);
    }, [emblaApi, autoplay, autoplayDelay]);

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext(); 

    const slideWidthClass =
    slidesPerView === 1
      ? "w-full"
      : slidesPerView === 2
      ? "sm:w-1/2"
      : slidesPerView === 3
      ? "sm:w-1/3"
      : `sm:w-1/${slidesPerView}`;

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {Array.isArray(items) &&
                        items.map((item, idx) => (
                            <div
                                 className={`flex-shrink-0 w-full ${slideWidthClass} p-4`}
                                key={idx}
                            >
                                {renderItem(item, idx)}
                            </div>
                        ))}
                </div>
            </div>

            {showButtons && (
                <div className="absolute -bottom-12 right-4 flex gap-4">
                    <button
                        onClick={scrollPrev}
                        className="bg-black h-10 w-10 text-white text-2xl  rounded-full hover:bg-green-700 transition-colors  flex items-center justify-center"
                    >
                        <ChevronLeft/>
                    </button>
                    <button
                        onClick={scrollNext}
                        className="bg-black h-10 w-10 text-white text-2xl rounded-full hover:bg-green-700 transition-colors  flex items-center justify-center"
                    >
                        <ChevronRight/>
                    </button>
                </div>
            )}
        </div>
    );
}
