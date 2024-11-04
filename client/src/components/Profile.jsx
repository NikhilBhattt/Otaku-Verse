import React from 'react'

const Profile = () => {
  return (
    <svg width="22vw" height="8.5vh" viewBox="0 0 327 68" fill="none" className='absolute top-[0.8vw] right-[1vw] flex items-center' xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="profileImage" patternUnits="userSpaceOnUse" width="100" height="100">
          <image 
            href="https://th.bing.com/th/id/OIP.UGlKxiZQylR3CnJIXSbFIAHaLL?rs=1&pid=ImgDetMain" 
            width="101" 
            height="57" 
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
      <path d="M5.01379 7.72268C2.85418 4.39627 5.24151 0 9.20747 0H317C322.523 0 327 4.47715 327 10V58C327 63.5228 322.523 68 317 68H60.4387C50.2786 68 40.809 62.8576 35.2765 54.336L5.01379 7.72268Z" fill="#B95050"/>
      <path d="M24.1823 16.7735C21.9672 13.4507 24.3491 9 28.3426 9H95C98.3137 9 101 11.6863 101 15V51C101 54.3137 98.3137 57 95 57H59.5629C54.2133 57 49.2176 54.3264 46.2501 49.8752L24.1823 16.7735Z" fill="url(#profileImage)"/>
      <text  fontFamily="Arial" x="40%" y="60%" className='text-2xl font-bold' fill="white">Kaddulive@0</text>
    </svg>
  )
}

export default Profile
