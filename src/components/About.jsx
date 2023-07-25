import React from "react";
import Tilt from "react-tilt";
import {motion} from "framer-motion";

import {styles} from "../styles";
import {services} from "../constants";
import {SectionWrapper} from "../hoc";
import {fadeIn, textVariant} from "../utils/motion";

const ServiceCard = ({index, title, icon}) => (
    <Tilt className='xs:w-[250px] w-full'>
        <motion.div
            variants={fadeIn("right", "spring", index * 0.5, 0.75)}
            className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
        >
            <div
                options={{
                    max: 45,
                    scale: 1,
                    speed: 450,
                }}
                className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
            >
                <img
                    src={icon}
                    alt='web-development'
                    className='w-16 h-16 object-contain'
                />

                <h3 className='text-white text-[20px] font-bold text-center'>
                    {title}
                </h3>
            </div>
        </motion.div>
    </Tilt>
);

const About = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={styles.sectionSubText}>Introduction</p>
                <h2 className={styles.sectionHeadText}>Overview.</h2>
            </motion.div>

            <motion.p
                variants={fadeIn("", "", 0.1, 1)}
                className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
            >
                I am a dedicated software developer with a diverse range of experience in full-stack development,
                front-end & back-end development. As a Freelance Web Developer, I design, develop, and maintain robust,
                scalable applications using Node.js, Express.js, and MongoDB, and integrate various APIs. I craft
                engaging user interfaces using React, JavaScript, HTML5/CSS3, Framer Motion, and Three.js and leverage
                AWS for reliable cloud infrastructure. I also develop websites using Wix and WordPress, demonstrating
                versatility and proficiency in different web development platforms.
                <br/>
                <br/>
                In my role at SAIT Polytechnic and Launchcode, I spearheaded the development of a quote-to-cash system
                for commercial clients in the Oil & Gas industry, managing front-end and back-end development, client
                requirements gathering, and workflow design. I've worked extensively with React, Typescript, Node.js,
                PostgreSQL, Git, Docker, and AWS.
                <br/>
                <br/>
                My educational background includes a Diploma in Software Development from the Southern Alberta Institute
                of Technology, where I honed my technical skills in Java, C++, Python, JavaScript, TypeScript, React,
                Node.js, Express.js, AngularJS, Java Web, JSON, PostgreSQL, MySQL, NoSQL, MongoDB, HTML, and CSS. I am
                proficient with development tools and environments such as IDE (IntelliJ IDEA, MS Visual Studio), Slack
                Board, Git, GitHub, GitLab, AWS, and Docker.
                <br/>
                <br/>
                I am a diligent, detail-oriented problem solver with strong communication and leadership skills, honed
                through my experience as a hockey referee and team leader in software projects. I have completed several
                impressive projects, including an AI Image Generation Application, a modern 3D T-Shirt Designer, a
                Multi-data-sorting Algorithm, and a YouTube Clone Application. In my free time, I enjoy skiing, hiking,
                and officiating hockey games, which has taught me the importance of teamwork, communication, and
                decision-making under pressure. I believe my diverse set of technical skills, soft skills, and passion
                for software development makes me a strong candidate for your team.
            </motion.p>


            <div className='mt-20 flex flex-wrap gap-10'>
                {services.map((service, index) => (
                    <ServiceCard key={service.title} index={index} {...service} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(About, "about");
