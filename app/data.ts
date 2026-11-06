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
                filename: 'Portfolio-General-compressed.pdf',
                toolsUsed: 'Adobe InDesign',
                title: 'General Portfolio',
                description: 'Here is my first draft at building a professional portfolio for myself. Thank you.',

            },
        ]
    },
]

// Images are loaded from the public album-art Supabase bucket via folder or bucketPath.
export const artworkItems: Artwork[] = [
    {
        mainTitle: "Guts",
        year: "2018",
        description: "I took the most underrepresented organs in art and created something that thought was beautiful. "
            + "For this piece, I used plaster, plastic bags, string and acrylic paint. I filled long plastic bag tubes with"
            + "plaster and molded them in order to create something similar to the small and large intestines. In order to the beautiful "
            + "ridges that intestines usually have, I used string and tied knots all around the plastic bag until it was solid. ",
        folder: "guts",
        medium: "Plaster, String, Acrylic Paint, plastic bags",
        images: []
    },
    {
        mainTitle: "Mounted",
        year: "2018",
        description: "The hands are very informative and you can show a lot of emotion with using gestures. "
            + "Typically, when communicating, people use both of their hands to express themselves, but I thought that "
            + "it would be interesting to try to tell a story just using my right hand as a cast for all 3 mounted hands",
        folder: "Mounted",
        medium: "Plaster, Red wax, Wood, Nails",
        images: []
    },
    {
        mainTitle: "444",
        year: "2018",
        description: "As humans, we show a lot of expression using our eyes and eyebrows, but with this piece, I didn’t "
            + "want to give the viewer that joy of understanding what I was feeling. I decided to just show my face from the bridge "
            + "of my nose to my chin in an effort to show expression in an uncommon way. Though they were just half busts of my face, I "
            + "painted them so that the top 3 busts were all a vibrant red and the bottom half bust was a subtle mustard color. For me, this image is akin to an explanation point.",
        medium: "Plaster, Acrylic Paint, Wood, Nails",
        folder: "444",
        images: []
    },
    {
        mainTitle: "Nails Project",
        year: "2018",
        description: "At the end I would say that it is a piece on human behavior. "
            + "I know a lot of women who go to the nail salon to get their hands and feet polished; I’m one of them. "
            + "I get long nail extensions because I love how they make me feel. Long painted claws. It makes scratching my scalp a lot easier. "
            + "When you take said nails off after 2-3 weeks, your nails underneath, for the most part, are ruined by the glue and wear and tear. "
            + "My nails are always ruined after I get them, but I continue to get them because they make me look badass. After you take your fake nails off, the fake nails pull at your real nails and you’re "
            + "left with weak, brittle nails.",
        folder: "nails",
        medium: "Charcoal",
        images: []
    },
    {
        mainTitle: "Casting Project",
        year: "2016",
        description: "An artist that really inspires me is Kiki Smith. She works with the human body, whether it be drawing a human body interacting with something else or creating a tangible sculpture."
            + "Inspired, I was able to successfully combine both my interest in Kiki Smith and my identity as a queer woman of color on this campus. I wanted to create something that symbolizes who I am as a black person and as a female presenting woman. In my piece, I completely worked with direct casting.",
        folder: "casting",
        medium: "Plaster",
        images: []
    },
    {
        mainTitle: "Vivero Project",
        year: "2017",
        description: "This covers some of the work I did for Vivero Swag. I don't have the full exploration" +
            " of ideas readily avaliable, but this shows me exploring brand design for the first time before I even" +
            " knew what that was.",
        folder: "vivero",
        medium: "Digital",
        images: []
    },
    {
        mainTitle: "Welding Project",
        year: "2016",
        description: "",
        medium: "Metal wire, fake flowers",
        folder: "welding",
        images: []
    },
    {
        mainTitle: "Wood Project",
        year: "2016",
        description: "Close your eyes and feel the bumps and curves of a tree. It flow is organic and nothing repeats in" +
            " the same way. I wanted to depict that feeling with multiple pieces of wood stack and sanded." +
            " Given a chance to explore woodworking, I wanted to pile on many pieces of wood and sand them down to create a smooth surface that felt organic and natural. I wanted to create a piece that felt like it was alive and growing, like a tree.",
        folder: "wood",
        medium: "Wood",
        images: []
    },
    {
        mainTitle: 'Paper Art',
        year: '2016',
        description: 'Inspired by Henry Moore’s, “Reclining Figure”, I wanted to intimidate the audience with ' +
            'height and ethereal flow as wind moves through the the piece.',
        folder: 'paper-art',
        medium: 'Paper',
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
        medium: 'Dirt, Gold sharpie',
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
        medium: 'Charcoal',
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