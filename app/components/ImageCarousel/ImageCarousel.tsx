import { Carousel, CarouselContent, CarouselIndicator, CarouselItem, CarouselNavigation } from "@/components/motion-primitives/carousel";
import { MorphingDialog, MorphingDialogClose, MorphingDialogContainer, MorphingDialogContent, MorphingDialogImage, MorphingDialogTrigger } from "@/components/motion-primitives/morphing-dialog";

export default function ImageCarousel({ item }) {
    return (
        <div>
            {/* // style={{ border: '80px solid transparent', borderImage: "url(/frame.png) 18% round" }}> */}
            <Carousel className="m-6">
                <CarouselContent>
                    {item.images.map((image, idx) => (
                        <MorphingDialog
                            key={idx}
                            transition={{
                                duration: 0.3,
                                ease: 'easeInOut',
                            }}
                        >
                            <MorphingDialogTrigger>
                                <CarouselItem className='p-6'>
                                    <MorphingDialogImage
                                        src={image.imageUrl}
                                        alt={image.description}
                                        className='max-w-xs rounded-[4px] w-sm'
                                    />
                                </CarouselItem>

                            </MorphingDialogTrigger>
                            <MorphingDialogContainer>
                                <MorphingDialogContent className='relative'>
                                    <CarouselItem className='p-4'>
                                        <MorphingDialogImage
                                            src={image.imageUrl}
                                            alt={image.description}
                                            className='h-auto w-full max-w-[90vw] rounded-[4px] object-cover lg:h-[90vh]'
                                        />
                                    </CarouselItem>
                                </MorphingDialogContent>
                                <MorphingDialogClose
                                    className='fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1'
                                    variants={{
                                        initial: { opacity: 0 },
                                        animate: {
                                            opacity: 1,
                                            transition: { delay: 0.3, duration: 0.1 },
                                        },
                                        exit: { opacity: 0, transition: { duration: 0 } },
                                    }}
                                >
                                </MorphingDialogClose>
                            </MorphingDialogContainer>
                        </MorphingDialog>
                    ))}
                </CarouselContent>
                <CarouselNavigation alwaysShow></CarouselNavigation>
                <CarouselIndicator />
            </Carousel>
        </div>
    )
}