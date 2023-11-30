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
                I'm a passionate software developer with expertise in full-stack, front-end, and back-end development.
                I've built robust applications using Node.js, Express.js, MongoDB, and APIs, while also creating
                engaging user interfaces with React, JavaScript, and HTML5/CSS3. My experience at One Piece IT led to
                significant performance improvements for web and mobile applications. At Launchcode, I developed a
                crucial quote-to-cash system for the Oil & Gas industry, showcasing my technical and project management
                skills.

                <br/>
                <br/>
                In terms of technology, I've honed my skills at the Southern Alberta Institute of Technology, covering a
                wide range of languages and databases, including Java, C++, Python, JavaScript, TypeScript, React,
                AngularJS, and various databases like PostgreSQL, MySQL, NoSQL, and MongoDB. I'm also well-versed in
                development tools and environments like IntelliJ IDEA, MS Visual Studio, Slack, Git, GitHub, GitLab,
                AWS, and Docker.
                <br/>
                <br/>
                My project portfolio features notable creations such as an AI Image Generator and a 3D T-Shirt Designer,
                demonstrating my proficiency in cutting-edge web development. I've also developed an Article Summarizer,
                showcasing my skills in creating concise article summaries
                <br/>
                <br/>
                Outside of tech, I enjoy outdoor activities and sports like skiing, hiking, and fitness, which offer
                both physical and mental challenges. My passion for hockey, as both a player and referee, has taught me
                valuable skills such as quick decision-making, teamwork, and resilience under pressure. These
                experiences have significantly influenced my professional approach, enriching my skill set and
                perspectives.
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
