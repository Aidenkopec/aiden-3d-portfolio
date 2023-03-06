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
                I am a driven and creative individual with a passion for software development. As an innovative junior
                software developer, I have gained verifiable experience in software architecture, database design, web
                development, and object-oriented programming. I am proud to have supported company-wide business and
                technology projects, exceeding quality expectations by gathering requirements, identifying user stories,
                and developing applications, functionalities, and graphical user interfaces.
                <br/>
                <br/>
                My educational background includes a Diploma in Software Development from the Southern Alberta Institute
                of Technology, where I gained valuable technical skills in Java, C++, Python, JavaScript, TypeScript,
                React, Node.js, Express.js, AngularJS, Java Web, JSON, PostgreSQL, MySQL, NoSQL, MongoDB, HTML, and CSS.
                I have also had the opportunity to work with development tools and environments such as IDE (IntelliJ
                IDEA, MS Visual Studio), Slack Board, Git, GitHub, Gitlab, AWS, and Docker.
                <br/>
                <br/>
                As a hard-working and detail-oriented individual, I possess excellent problem-solving skills. I have
                completed several impressive projects, including a cutting-edge AI image generation application using
                MERN stack, a modern YouTube clone application using React.js and Material UI 5, a multi-sorting
                algorithm using Java for data management purposes, and a graphical user interface for a Flight
                Reservation System.
                <br/>
                <br/>
                In my free time, I enjoy being active and spending time outdoors. I have been an avid skier
                since I was a child and love hitting the slopes during the winter months. During the summer, I enjoy
                hiking and exploring the beautiful natural landscapes that surround us. I also have a passion for hockey
                and have over six years of experience officiating Junior A, B, Midget, and Bantam Hockey Teams in
                Canada. Officiating has taught me the importance of teamwork, communication, and decision-making under
                pressure.
                <br/>
                <br/>
                I believe that my diverse set of technical skills, attention to detail, and passion for software
                development make me a strong candidate for your team. I am confident that I can bring a lot of value to
                the table and work collaboratively with others to achieve common goals. I am always eager to learn from
                my colleagues and share my knowledge with them to ensure the success of the project.

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
