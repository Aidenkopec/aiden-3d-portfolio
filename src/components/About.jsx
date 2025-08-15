import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

const ServiceCard = ({ index, title, icon }) => (
  <Tilt
    tiltMaxAngleX={45}
    tiltMaxAngleY={45}
    scale={1}
    transitionSpeed={450}
    className="xs:w-[250px] w-full"
  >
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
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
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a Full Stack Software Developer with a proven track record of
        delivering scalable, production-grade systems that drive efficiency,
        accuracy, and visibility across complex, multi-department environments.
        My expertise spans backend automation, real-time reporting
        infrastructure, ERP integrations, and full-stack platforms that support
        high-impact operations across diverse business functions.
        <br />
        <br />
        At Evans Consoles, I've developed 40+ custom KPI reports and 10
        real-time dashboards, saving thousands of labor hours annually and
        resolving $2M+ in inventory discrepancies. I built a comprehensive Bill
        of Materials platform and implemented dynamic budgeting systems using
        cutting-edge technologies like Vue 3, Node.js, BullMQ, and Redis,
        achieving a 20x deployment speed improvement.
        <br />
        <br />
        My technical arsenal includes modern frontend frameworks (Vue 3, React,
        Next.js), robust backend technologies (Node.js, Python), advanced
        databases (EdgeDB, PostgreSQL, Redis), and comprehensive DevOps
        practices (Docker, Kubernetes, AWS). I excel at translating real-world
        challenges into modern, high-performance software that drives tangible
        business outcomes across organizations.
        <br />
        <br />
        Beyond client work, I founded Solvex Digital, delivering full-stack web
        applications and GPT-powered AI integrations to 8+ clients. I've also
        developed sophisticated systems like containerized cryptocurrency
        trading bots with advanced algorithmic strategies, demonstrating my
        ability to tackle complex technical challenges across diverse domains.
        <br />
        <br />
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
