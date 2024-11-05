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

const Body = ({ children }) => {
    return (
        <>
            <Nav />
            <Foot url={footImage} />
            <Profile />
            <Option />
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
                <div className='flex items-center justify-between w-[80vw] mt-5 mr-10'>
                    {children}
                    <VrSlider />
                </div>
            </div>
        </>
    )
}

export default Body
