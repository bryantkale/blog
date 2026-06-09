type SocialLink = {
    label: string;
    url: string;
};

type ArtworkImage = {
    title: string;
    description: string;
    imageUrl: string;
}

type Artwork = {
    mainTitle: string;
    year: string;
    description: string;
    images: ArtworkImage[];
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

export const artworkItems: Artwork[] = [{
    mainTitle: "Poop",
    year: 'unknown',
    description: 'unknown',
    images: [
        { title: 'Poopie', description: 'blah blah', imageUrl: '/images/newer1.jpg' },
        { title: 'Poopie', description: 'blah blah', imageUrl: '/images/newer2.jpg' }]
}, {
    mainTitle: 'Paper Art',
    year: '2016',
    description: 'My overall thought process when creating my floating figure was to create something similar to Henry Moore’s sculpture called “Reclining Figure” of an organically shaped woman reclining. I really appreciate his art and it was one of the first things I thought about when deciding what I wanted to create for this project. I wanted to combine both women and something that could possibly intimidate my audience because of its height.',
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
    description: 'For this assignment, we were supposed to compose our own narrative stories using material and inspiration from CERA. One of the ideas that first came to my head was to draw using the different types of mud that I found while roaming the prairie of CERA. I wanted to use dirt because I wanted to work with this idea of everything, including my drawing, returning back to soil from whence it first came. In using dirt, I realized that I could use it in the same way that we used ink at the beginning of the semester. The idea to use mud to draw a deer carcass came from me stumbling upon an actual dead deer carcass near the stream that was located in CERA. I thought that the beauty of this sight was something that I really wanted to capture onto paper before it finally decomposed and nothing was left of it. By using the dirt, clay and the pictures that I took of and near the deer carcass, I decided to tell a story using its bones and the grass that slowly began to cover them.',
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
    description: 'With this assignment, we were told that through our drawings, we were supposed create a conversation with an artist of our choosing. The artist that I chose was Jenny Saville because of the vast charcoal drawings that she does. Specifically, I wanted to focus on the pictures that she draws of mothers and their children. With these drawings, Saville focusing on trying to portray the movements of both the mother and the children because the child will not stay still for the portrait. In trying to have a conversation with Saville, I wanted to try to recreate this exact scene, but instead of a mother and their child, I wanted to draw my girlfriend and her cat. In some sense, cats are similar to toddlers because they struggle when they are being held and move in strange ways. In the past, I have struggled with going outside of my comfort zone with the art that I create because of the anxiety that I feel when creating something new. Because I love figure drawing, I had the most fun drawing the human figure and finding the lines and shapes of the body.',
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