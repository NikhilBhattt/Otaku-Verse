import React from 'react'
import Body from './components/Body'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const slider = (Data)=>{
  const limitWords = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  return(
    <SwiperSlide key={Data.id} style={{backgroundImage: `url(${Data.image})`, backgroundSize: 'cover', backgroundPosition: 'center',width: '100%', height: '55vh'}}>
      <div className='flex flex-col justify-center  bg-gradient-to-r from-black/80 via-black/70 to-transparent p-3 w-1/2'>
      <h1 className='text-2xl font-bold text-purple-500'><span className='text-white text-3xl'>{Data.id}-</span>{Data.title} </h1>
      <p className='text-white text-sm font-mono font-thin pl-8'>
        {limitWords(Data.description, 30)}
      </p>
      <button className="mt-4 ml-8 w-32 py-1 text-sm bg-transparent text-purple-500 border-2 border-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition-colors duration-300">
        Watch Now
      </button>
      </div>
    </SwiperSlide>
  )
}


const Home = () => {

  const Data = [
    {id: 1, image: 'https://th.bing.com/th/id/OIP.9YwNz70B17oER1fuhuIDhwHaFb?rs=1&pid=ImgDetMain', title: 'One Piece', description: 'one peice is a manga and anime series that follows the adventures of Monkey D. Luffy, a young man who gains the ability to stretch like rubber after eating a Devil Fruit. He sets out on a journey to find the legendary treasure, the One Piece, and become the Pirate King.'},
    {id: 2, image: 'https://i.pinimg.com/originals/4f/ba/09/4fba09dde681e2db50ea2d2d57bbee90.jpg', title: 'Naruto', description: 'naruto is a manga and anime series that follows the story of Naruto Uzumaki, a young ninja who seeks to gain recognition from his peers and also dreams of becoming the Hokage, the leader of his village.'},
  ]
  return (
    <div className='flex flex-col items-end  w-[52vw] h-[calc(96vh-2rem)]'>
      <div className='flex flex-col items-start w-full'>
        <h1 className='text-xl font-b612 w-full '>IMMERSE into the world of Anime</h1>
        <p className='text-sm font-mono w-full'>Lorem ipsum dolor sit amet consectetur <br />adipisicing elit. Quisquam, quos.</p>
        </div>
        <div className="w-[49vw]">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                style={{
                  height: '55vh',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '4px',
                  boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.3)',
                }}
            >
                {Data.map(slider)}
            </Swiper>
        </div>
    </div>
  )
}

export default Home
