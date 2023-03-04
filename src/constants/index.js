import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    carrent,
    jobit,
    tripguide,
    threejs,
    central,
    banana,
    hyundia,
    sait,
    aws,
    java,
    postgreSql,
    python,
    ai,
    youtube,
    data,
} from "../assets";

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const services = [
    {
        title: "Full Stack Developer",
        icon: mobile,
    },
    {
        title: "Web Developer",
        icon: web,
    },
    {
        title: "Backend Developer",
        icon: backend,
    },
    {
        title: "Content Creator",
        icon: creator,
    },
];

const technologies = [
    {
        name: "HTML 5",
        icon: html,
    },
    {
        name: "CSS 3",
        icon: css,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Java",
        icon: java,
    },
    {
        name: "Python",
        icon: python,
    },
    {
        name: "Node JS",
        icon: nodejs,
    },
    {
        name: "MongoDB",
        icon: mongodb,
    },
    {
        name: "PostgreSQL",
        icon: postgreSql,
    },
    {
        name: "git",
        icon: git,
    },
    {
        name: "aws",
        icon: aws,
    },
    {
        name: "docker",
        icon: docker,
    },
];

const experiences = [
    {
        title: "Industry Software Project ",
        company_name: "SAIT Polytechnic and Launchcode",
        icon: sait,
        iconBg: "#383E56",
        date: "April 2022 - December 2022",
        points: [
            "Led the development of a quote-to-cash system for commercial clients in the Oil & Gas industry as team leader.",
            "Utilized technologies such as React, Typescript, Node.js, PostgreSQL, Git, Docker, and AWS.",
            "Gained experience in project management, client relations, and technical skills including object-oriented programming, web development, software analysis, and database design and programming.",
            "Provided support for front-end and back-end development, gathering client requirements, and designing workflows, functionalities, and reporting structures.",
            "Conducted code reviews, testing, and bug tracking, and prepared technical documents.",
        ],
    },
    {
        title: "Hockey Referee",
        company_name: "Central Zone Referees",
        icon: central,
        iconBg: "#E6DEDD",
        date: "2016 - Feb 2022",
        points: [
            "Experienced Hockey Referee with over 6 years of experience officiating Junior A, B, Midget, and Bantam Hockey Teams in Canada.",
            "Demonstrated leadership skills and the ability to work as part of a dynamic team, enforcing all rules and regulations of Hockey Canada and communicating professionally with players, coaches, and parents.",
            "Managed conflicts and difficult situations effectively, making quick and hard decisions to maintain a safe and fair playing environment.",
        ],
    },
    {
        title: "Sales Consultant",
        company_name: "Banana Republic",
        icon: banana,
        iconBg: "#383E56",
        date: "2020 - Jan 2021",
        points: [
            "Skilled Retail Sales Associate with a demonstrated ability to provide outstanding customer service and promote loyalty in a fast-paced retail environment.",
            "Acknowledged and assisted customers, locating merchandise effectively using various methods and promoting loyalty by educating customers about products and loyalty programs.",
            "Supported sales floor, fitting room, check out, and back-of-house processes, contributing to the overall success of the store."
        ],
    },
    {
        title: "Concierge",
        company_name: "Precision Hyundai,",
        icon: hyundia,
        iconBg: "#E6DEDD",
        date: "2020 - 2020",
        points: [
            "Detailed the interior and exterior of vehicles, using advanced techniques and products to restore the appearance and protect the value of customers' cars.",
            "Shuttled customers from their homes to the dealership safely and professionally, ensuring that their experience was positive and stress-free.",
            "Processed and cashiered payments in the service and parts departments, handling transactions accurately and efficiently and providing customers with clear and concise invoices and receipts.",
            "Scheduled appointments for customer services over the phone, ensuring that customers received the services they needed at a time that was convenient for them.",
        ],
    },
];

const testimonials = [
    {
        testimonial:
            "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
        name: "Sara Lee",
        designation: "CFO",
        company: "Acme Co",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        testimonial:
            "I've never met a web developer who truly cares about their clients' success like Rick does.",
        name: "Chris Brown",
        designation: "COO",
        company: "DEF Corp",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        testimonial:
            "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
        name: "Lisa Wang",
        designation: "CTO",
        company: "456 Enterprises",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
];

const projects = [
    {
        name: "AI Image Generator",
        description:
            "Transform dreams into reality with AI-generated images using the MERN stack, Tailwind, OpenAI's DALL-E, and Cloudinary. This project provides a stunning user experience like no other, taking you on a magical journey into a world of wonders!",
        tags: [
            {
                name: "React",
                color: "blue-text-gradient",
            },
            {
                name: "OpenAI DALL-E",
                color: "green-text-gradient",
            },
            {
                name: "Tailwind",
                color: "pink-text-gradient",
            },
            {
                name: "MERN",
                color: "orange-text-gradient",
            },


        ],
        image: ai,
        source_code_link: "https://github.com/Aidenkopec/ai-image-generator",
    },
    {
        name: "YouTube Clone",
        description:
            "Built a revolutionary YouTube clone using React.js and Material UI 5. This cutting-edge platform offers seamless video streaming and effortless RapidAPI integration, delivering the ultimate viewing experience.",
        tags: [
            {
                name: "React",
                color: "blue-text-gradient",
            },
            {
                name: "RapidAPI",
                color: "green-text-gradient",
            },
            {
                name: "Material UI 5",
                color: "pink-text-gradient",
            },
        ],
        image: youtube,
        source_code_link: "https://github.com/Aidenkopec/Youtube_Clone",
    },
    {
        name: "Data Management Sorting Algorithms",
        description:
        "Developed a high-performance Java multi-sorting algorithm that utilizes bubble, quick, insertion, selection, merge, and odd-even sorting algorithms. This solution offers lightning-fast sorting capabilities, enabling optimal efficiency.",
        tags: [
            {
                name: "Java",
                color: "blue-text-gradient",
            },
            {
                name: "Algorithms",
                color: "green-text-gradient",
            },
            {
                name: "Data management",
                color: "pink-text-gradient",
            },
        ],
        image: data,
        source_code_link: "https://github.com/Aidenkopec/Data-Management-Sorting-Algoritm",
    },
];

export {services, technologies, experiences, testimonials, projects};
