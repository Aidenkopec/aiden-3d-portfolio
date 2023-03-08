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
                I am a driven software developer with experience in software architecture, database design, web
                development, and object-oriented programming. I am proud to have supported company-wide business and
                technology projects, exceeding quality expectations by gathering requirements, identifying user stories,
                and developing applications, functionalities, and graphical user interfaces.
                <br/>
                <br/>
                My educational background includes a Diploma in Software Development from the Southern Alberta Institute
                of Technology, where I gained valuable technical skills in Java, C++, Python, JavaScript, TypeScript,
                React, Node.js, Express.js, AngularJS, Java Web, JSON, PostgreSQL, MySQL, NoSQL, MongoDB, HTML, and CSS.
                I have also worked with development tools and environments such as IDE (IntelliJ IDEA, MS Visual
                Studio), Slack Board, Git, GitHub, GitLab, AWS, and Docker.
                <br/>
                <br/>
                I am a hard-working and detail-oriented problem solver who has completed several impressive projects,
                including an AI image generation application, a modern YouTube clone application, a multi-sorting
                algorithm, and a graphical user interface for a Flight Reservation System. In my free time, I enjoy
                skiing, hiking, and officiating hockey games, which has taught me the importance of teamwork,
                communication, and decision-making under pressure. I believe my diverse set of technical skills and
                passion for software development makes me a strong candidate for your team.

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
