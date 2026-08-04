import type { Artwork } from '@/utils/supabase/storage';

type SocialLink = {
    label: string;
    url: string;
};

export const EMAIL = 'caelinbryant@gmail.com';
export const FIRST_NAME = 'Caelin';

export const SOCIAL_LINKS: SocialLink[] = [
    {
        label: 'GITHUB',
        url: 'https://github.com/bryantkale',
    },
    {
        label: 'LINKEDIN',
        url: 'https://www.linkedin.com/in/caelin-bryant',
    },
    {
        label: 'INSTAGRAM',
        url: 'https://www.instagram.com/caebryant',
    },
    {
        label: 'GOODREADS',
        url: 'https://www.goodreads.com/user/show/154091402',
    }
];

export const portfolioWork: Artwork[] = [
    {
        mainTitle: "Intro to Graphic Design Pieces",
        year: '2026',
        description: "My final work from Introduction to Graphic Design",
        folder: "portfolio",
        images: [
            {
                filename: 'booklet-spread.jpg',
                title: 'Booklet Spread',
                description: 'Here, I\'m exploring typography and style in booklet.' +
                    'This was more about studying typography and style to create visual continuity.' +
                    'We were tasked with visiting The Swiss Grid exhibit and selected a poster that we found' +
                    'striking. The bold orange and black stuck out to me because it felt like the audience was me' +
                    ' specifically. I wanted to capture what that might look like across a booklet spread.',

            },
            {
                filename: 'branding-spread.jpg',
                title: 'Branding Spread',
                description: 'Tasked with building a brand, I decided to go with an idea that was personal to me. My fiance and I have always dreamed of owning a cafe where people can sit and enjoy a good cup of coffee.' +
                    'I wanted to create a brand that was warm and inviting, with a focus on community and connection. The colors and typography were chosen to reflect this, with earthy tones and a friendly, approachable font. The logo was designed to be simple yet memorable, with a focus on the name of the cafe and the idea of bringing people together over a cup of coffee.',
            },
            {
                filename: 'poster-exploration.jpg',
                title: 'Poster Exploration',
                description: 'Inspired by the 6 word project, this project was about creating visual communication' +
                    'through typographic systems and hierarchy. I chose something that was personal to me to build off of.' +
                    'I have a Hoya that has grown beyond the pot and I wanted to show someone how they might propagate a plant' +
                    'by themself. I wanted to portray how a Hoya plant grows through layout. Starting with the title \'A ' +
                    'comprehensive guide to propagating a Hoya\'s, I wanted to show that as the root of the Infographic, the' +
                    'soil. As we work our way up, we flow into various levels of opaqueness with the green boxes which' +
                    'represent the leaves of the Hoya. The numbers give the reader a sense of order and hierarchy to follow.' +
                    'I chose a sans serif font to keep the focus on the content and not the typeface. I wanted to make sure' +
                    'that the reader could focus on the content and not be distracted by the design behind. The colors were' +
                    'chosen to be earthy and natural to represent the plant and the soil.',
            },
        ]
    },
]

// Images are loaded from the public album-art Supabase bucket via folder or bucketPath.
export const artworkItems: Artwork[] = [
    {
        mainTitle: "Sketches from old black book no.1",
        year: '2020-2021',
        description: 'Here are some pieces from my sketchbook. I plan on working them into something bigger, ' +
            'but for now, I want to display them here.',
        folder: 'newer',
        images: []
    },
    {
        mainTitle: "Vivero Project",
        year: "2017",
        description: "This covers some of the work I did for Vivero Swag.",
        folder: "vivero",
        images: []
    },
    {
        mainTitle: "Welding Project",
        year: "2016",
        description: "",
        folder: "welding",
        images: []
    },
    {
        mainTitle: "Wood Project",
        year: "2016",
        description: "Close your eyes and feel the bumps and curves of a tree. It flow is organic and nothing repeats in" +
            " the same way. I wanted to depict that feeling with multiple pieces of wood stack and sanded.",
        folder: "wood",
        images: []
    },
    {
        mainTitle: 'Paper Art',
        year: '2016',
        description: 'Inspired by Henry Moore’s, “Reclining Figure”, I wanted to intimidate the audience with ' +
            'height and ethereal flow as wind moves through the the piece.',
        folder: 'paper-art',
        images: [{
            title: 'Paper 1',
            description: 'Description of Paper 1',
        },
        {
            title: 'Paper 2',
            description: 'Description of Paper 2',
        },
        {
            title: 'Paper 3',
            description: 'Description of Paper 3',
        },
        {
            title: 'Paper 4',
            description: 'Description of Paper 4',
        },]
    },
    {
        mainTitle: 'Return',
        year: '2017',
        description: 'Inspired by found materials from CERA (Conard Environmental Research Area), we focus on life after death.',
        folder: 'return',
        images: [{
            title: 'Paper 1',
            description: 'Description of Paper 1',
        },
        {
            title: 'Paper 2',
            description: 'Description of Paper 2',
        },
        {
            title: 'Paper 3',
            description: 'Description of Paper 3',
        },
        {
            title: 'Paper 4',
            description: 'Description of Paper 4',
        },
        {
            title: 'Paper 5',
            description: 'Description of Paper 5',
        }]
    },
    {
        mainTitle: 'Charcoal Drawing',
        year: '2017',
        description: 'Inspired by Jenny Saville\s, "Other and Children (After the Leonardo Cartoon)" , we focus on capturing the motion' +
            'of a cat being held.',
        folder: 'charcoal',
        images: [
            {
                title: 'Charcoal 1',
                description: 'Description of Charcoal 1',
            },
            {
                title: 'Charcoal 2',
                description: 'Description of Charcoal 2',
            },
            {
                title: 'Charcoal 3',
                description: 'Description of Charcoal 3',
            },
            {
                title: 'Charcoal 4',
                description: 'Description of Charcoal 4',
            }
        ]
    }];