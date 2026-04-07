
'use client';
import { Carousel, CarouselContent, CarouselIndicator, CarouselItem, CarouselNavigation } from "@/components/motion-primitives/carousel";
import { MorphingDialog, MorphingDialogClose, MorphingDialogContainer, MorphingDialogContent, MorphingDialogImage, MorphingDialogTrigger } from "@/components/motion-primitives/morphing-dialog";
import { motion } from "motion/react";

const artworkItems = [{
  mainTitle: 'Paper Art',
  year: '2016',
  images: [{
    title: 'Paper 1',
    description: 'Description of Paper 1',
    imageUrl: '/images/Bryant_Paper_01.jpg'
  },
  {
    title: 'Paper 2',
    description: 'Description of Paper 2',
    imageUrl: '/images/Bryant_Paper_02.jpg'
  },
  {
    title: 'Paper 3',
    description: 'Description of Paper 3',
    imageUrl: '/images/Bryant_Paper_03.jpg'
  },
  {
    title: 'Paper 4',
    description: 'Description of Paper 4',
    imageUrl: '/images/Bryant_Paper_04.jpg'
  },]
},
{
  mainTitle: 'Return',
  year: '2017',
  images: [{
    title: 'Paper 1',
    description: 'Description of Paper 1',
    imageUrl: '/images/Bryant_Return_01.jpg'
  },
  {
    title: 'Paper 2',
    description: 'Description of Paper 2',
    imageUrl: '/images/Bryant_Return_02.jpg'
  },
  {
    title: 'Paper 3',
    description: 'Description of Paper 3',
    imageUrl: '/images/Bryant_Return_03.jpg'
  },
  {
    title: 'Paper 4',
    description: 'Description of Paper 4',
    imageUrl: '/images/Bryant_Return_04.jpg'
  },
  {
    title: 'Paper 5',
    description: 'Description of Paper 5',
    imageUrl: '/images/Bryant_Return_05.jpg'
  }]
},
{
  mainTitle: 'Charcoal Drawing',
  year: '2017',
  images: [
    {
      title: 'Charcoal 1',
      description: 'Description of Charcoal 1',
      imageUrl: '/images/Bryant_Final_01.jpg'
    },
    {
      title: 'Charcoal 2',
      description: 'Description of Charcoal 2',
      imageUrl: '/images/Bryant_Final_02.jpg'
    },
    {
      title: 'Charcoal 3',
      description: 'Description of Charcoal 3',
      imageUrl: '/images/Bryant_Final_03.jpg'
    },
    {
      title: 'Charcoal 4',
      description: 'Description of Charcoal 4',
      imageUrl: '/images/Bryant_Final_04.jpg'
    }
  ]
}];

export default function Artwork() {
  return (
    <div style={{ padding: 'auto' }}>
      <h1 className="flex mb-8 text-2xl font-semibold">My Art Work</h1>
      {artworkItems.map((item, index) => (
        <div key={index}>
          <div>{item.mainTitle}</div>
          <div>{item.year}</div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Carousel>
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
                      <CarouselItem className='p-4'>
                        <MorphingDialogImage
                          src={image.imageUrl}
                          alt={image.description}
                          className='max-w-xs rounded-[4px]'
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
          </motion.div>
        </div>
      ))}
    </div>
  )
}
