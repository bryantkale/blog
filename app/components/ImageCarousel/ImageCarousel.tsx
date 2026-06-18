import { Carousel, CarouselContent, CarouselIndicator, CarouselItem, CarouselNavigation } from "@/components/motion-primitives/carousel";
import { MorphingDialog, MorphingDialogClose, MorphingDialogContainer, MorphingDialogContent, MorphingDialogImage, MorphingDialogTrigger } from "@/components/motion-primitives/morphing-dialog";

export default function ImageCarousel({ item }) {
    if (!item.images.length) {
        return null;
    }

    return (
        <div>
            {/* // style={{ border: '80px solid transparent', borderImage: "url(/frame.png) 18% round" }}> */}
            <Carousel className="m-6">
                <CarouselContent>
                    {item.images.map((image, idx) => (
                        <CarouselItem className='p-6' key={idx}>
                            <MorphingDialog
                                transition={{
                                    duration: 0.3,
                                    ease: 'easeInOut',
                                }}
                            >
                                <MorphingDialogTrigger className='block w-full'>
                                    <div className='flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[4px] bg-zinc-100'>
                                        <MorphingDialogImage
                                            src={image.imageUrl}
                                            alt={image.description || image.title}
                                            className='h-full w-full object-cover'
                                        />
                                    </div>

                                </MorphingDialogTrigger>
                                <MorphingDialogContainer>
                                    <MorphingDialogContent className='relative'>
                                        <div className='flex max-h-[90vh] max-w-[90vw] items-center justify-center p-4'>
                                            <MorphingDialogImage
                                                src={image.imageUrl}
                                                alt={image.description || image.title}
                                                className='max-h-[90vh] max-w-[90vw] rounded-[4px] object-contain'
                                            />
                                        </div>
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
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNavigation alwaysShow></CarouselNavigation>
                <CarouselIndicator />
            </Carousel>
        </div>
    )
}