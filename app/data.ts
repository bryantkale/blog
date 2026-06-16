import type { Artwork } from '@/utils/supabase/storage';

type SocialLink = {
    label: string;
    url: string;
};

export const EMAIL = 'caelinbryant@gmail.com';
export const FULL_NAME = 'Caelin Bryant';

export const SOCIAL_LINKS: SocialLink[] = [
    {
        label: 'Github',
        url: 'https://github.com/bryantkale',
    },
    {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/caelin-bryant',
    },
    {
        label: 'Instagram',
        url: 'https://www.instagram.com/caebryant',
    },
    {
        label: 'GoodReads',
        url: 'https://www.goodreads.com/user/show/154091402',
    }
];

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