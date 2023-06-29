import Image from 'next/image';
import React from 'react'
import { AiOutlineDown } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import ChatPart, { aChat } from '../components/ChatPart';
import ListsPart from '../components/ListsPart';
import Person from '../components/Person';
import Seo from '../components/Seo';

export default function HomePage() {
  const chats: aChat[] = [
    {
      profile: {
        image: "/images/person.jpg",
        link: "/",
        name: "Mugisha Yves"
      },
      active: true,
      lastMessage: "Nones bro ko tutavuganye kuri ya boro"
    },
    {
      profile: {
        image: "/images/person.jpg",
        link: "/",
        name: "Mugisha Yves"
      },
      active: true,
      lastMessage: "Nones bro ko tutavuganye kuri ya boro"
    },
    {
      profile: {
        text: "Y",
        link: "/",
        name: "Mugisha Yves"
      },
      active: true,
      lastMessage: "Nones bro ko tutavuganye kuri ya boro"
    },
    {
      profile: {
        image: "/images/person.jpg",
        link: "/",
        name: "Mugisha Yves"
      },
      active: true,
      lastMessage: "Nones bro ko tutavuganye kuri ya boro"
    },
    {
      profile: {
        image: "/images/person.jpg",
        link: "/",
        name: "Mugisha Yves"
      },
      active: false,
      lastMessage: "Nones bro ko tutavuganye kuri ya boro"
    }
  ]
  const users = [
    {
      image: "/images/person.jpg",
      link: "/user/id"
    },
    {
      image: "/images/person.jpg",
      link: "/user/id"
    },
    {
      image: "/images/person.jpg",
      link: "/user/id"
    },
    {
      image: "/images/person.jpg",
      link: "/user/id"
    },
    {
      image: "/images/person.jpg",
      link: "/user/id"
    }
  ]
  return (
    <div className='h-full w-full'>
      {/* <Seo templateTitle='Home' /> */}
      <Seo title='Chatmaid | Main' />

      <main className='h-full w-full'>
        <div className="w-full h-[100vh] overflow-hidden">
          <div className="w-full py-3 px-4 text-white">
            <div className="flex flex-row justify-between">
              <Image src={"/images/logo.jpeg"} width={100} height={20} alt="logo" />
              <div className="flex flex-row items-center gap-3">
                <Person link='/' text='T' />
                <button className='font-bold md:text-base text-sm hover:bg-[#10131A] rounded-md p-2'>Add member</button>
                <div className="flex flex-row gap-0 items-center">
                  {users.map((user, index) => {
                    return (
                      <Person key={index} image={user.image} link={user.link} />
                    )
                  })}
                  <button className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-gray-900 text-gray-400 font-bold">+42</button>
                </div>
                <button className="flex items-center font-bold gap-1 hover:bg-[#10131A] rounded-md p-2 lg:text-base text-sm">
                  <p>Recent Messages</p>
                  <AiOutlineDown className='font-bold' />
                </button>
                <button className='hover:bg-[#10131A] rounded-md p-2 md:text-base text-sm'>
                  <BiEditAlt className='font-bold' />
                </button>
              </div>
            </div>
          </div>
          <div className="block md:flex flex-row h-full">
            <div className='w-[100vw] h-full md:w-[75vw] lg:w-[80vw]'>
              <ListsPart />
            </div>
            <div className='hidden md:block  md:w-[25vw] lg:w-[20vw]'>
              <ChatPart chats={chats} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
