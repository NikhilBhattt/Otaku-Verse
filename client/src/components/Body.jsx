import React from 'react'
import backgroundImage from '../assets/bgImg/vill.jpeg'
import maskSvg from '../assets/svgs/main.svg'
import Nav from './Nav'
import Foot from './Foot'
import footImage from '../assets/bgImg/town.jpeg'
import Profile from './Profile'
import Option from './Option'
import VrSlider from './VrSlider'
import Title from './Title'
import { motion } from 'framer-motion'

const Body = ({ children }) => {
    const staggerDuration = 0.5;
    const staggerDelay = 0.5;
    return (
        <>
            <motion.div 
                initial={{ x: -100, y: -10, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ duration: staggerDuration, delay: staggerDelay, type: 'spring', bounce: 0.2, stiffness: 100 }}
                className='absolute top-[10vh] left-[2.2vw] z-30 '
            >
                <Nav />
            </motion.div>
            <motion.div initial={{ x: 0, y: (window.innerHeight), opacity: 0 }} animate={{ x: 24, y: window.innerHeight - 114, opacity: 1 }} transition={{ duration: staggerDuration, delay: staggerDelay * 2, type: 'spring', stiffness: 100 }} className='absolute z-30 cursor-pointer'>
                <Foot url={footImage} />
            </motion.div>
            <motion.div initial={{ x: 500, y:-10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: staggerDuration, delay: staggerDelay, type: 'spring', stiffness: 100 }}>
                <Profile />
            </motion.div>
            <motion.div initial={{ y: (window.innerHeight + 100), opacity: 0 }} animate={{ y: window.innerHeight - 10, opacity: 1 }} transition={{ duration: staggerDuration, delay: staggerDelay * 2, type: 'spring', stiffness: 100 }}>
                <Option />
            </motion.div>
            <motion.div initial={{opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: staggerDuration, delay: staggerDelay, type: 'spring', stiffness: 100 }}>
                <div className='relative h-[96vh] flex flex-col items-end bg-white mt-[2vh]'
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        maskImage: `url(${maskSvg})`,
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskImage: `url(${maskSvg})`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        loading: 'lazy',
                        decoding: 'async'
                    }}
                >
                    <div className='px-[10vw] w-[100vw]'>
                        <Title />
                    </div>
                    <div className='flex items-start justify-between w-[84vw] mt-5 mr-10'>
                        {children}
                        <VrSlider />
                    </div>
                </div>
            </motion.div>
            <div className='relative h-[96vh] flex flex-col items-end bg-white mt-[2vh]'
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    maskImage: `url(${maskSvg})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url(${maskSvg})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                }}
            >
                <div className='px-[10vw] w-[100vw]'>
                    <Title/>
                </div>
                <div className='flex items-start justify-between w-[84vw] mt-5 mr-10'>
                    {children}
                    <VrSlider />
                </div>
            </div>
        </>
    )
}

export default Body
