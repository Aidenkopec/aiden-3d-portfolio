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

            <motion.p variants={fadeIn("", "", 0.1, 1)}
                      className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
                As a software developer, I bring a distinctive mix of expertise in full-stack, front-end, and back-end
                development. My tenure at Evans Consoles is characterized by developing and integrating innovative
                systems and applications to enhance efficiency in sales, engineering, manufacturing, and finance
                departments. This role has enabled me to deepen my expertise in analyzing and mapping comprehensive
                business processes, creating optimized tools for operational efficiency, and crafting web-based
                dashboards and reports that underpin continuous improvement initiatives across the organization.

                <br/><br/>
                Previously, at One Piece IT, I was instrumental in transforming web and mobile applications into highly
                efficient systems. At Launchcode, I spearheaded the development of a pivotal quote-to-cash system for
                the Oil & Gas industry, merging my technical prowess with adept project management.

                <br/><br/>
                My educational background at the Southern Alberta Institute of Technology equipped me with a broad skill
                set, including Java, C++, Python, JavaScript, TypeScript, React, and various databases. Beyond
                programming languages, I've developed innovative projects like an AI Image Generator and a 3D T-Shirt
                Designer, demonstrating my capability in advanced web technologies.

                <br/><br/>
                Outside of technology, I engage in outdoor activities like skiing, hiking, and fitness, contributing to
                my mental agility and physical well-being. My involvement in hockey, as a player and referee, has honed
                my quick decision-making and teamwork skills. These experiences have not only enriched my personal life
                but also positively influenced my professional demeanor, adding depth to my technical expertise.

                <br/><br/>
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
