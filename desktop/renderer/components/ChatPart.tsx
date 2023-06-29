import clsx from 'clsx';
import Image from 'next/image';
import React, { Profiler } from 'react'
import Person from './Person';

export interface Profile {
    image?: string;
    text?: string;
    name: string;
    link: string;
}

export interface aChat {
    profile: Profile;
    active: boolean;
    lastMessage: string;
}

interface ChatPartProps {
    chats: aChat[];
}




const ChatPart: React.FC<ChatPartProps> = ({ chats }) => {
    const ChatProfile = ({
        image,
        text }: {
            image?: string,
            text?: string
        }) => {
        return (
            <div className={clsx(
                text && "w-12 h-12 rounded-md bg-blue-500 flex items-center justify-center",
            )}>
                {image && <Image src={image} alt="person" width={60} height={60} className="rounded-md" />}
                {text && <p className='font-bold text-lg text-white'>{text}</p>}
            </div>
        )
    }
    const OneChat: React.FC<aChat> = ({ profile, active, lastMessage }) => {
        return (
            <a href={profile.link} className="my-2 ">
                <div className="flex flex-row gap-2 items-center my-2 hover:bg-[#10131A] rounded-md p-1 px-2">
                    <div className='relative'>
                        {profile.image ? <ChatProfile image={profile.image} /> : <ChatProfile text={profile.text} />}
                        {active ? <div className='w-2 h-2 lg:w-4 lg:h-4 rounded-full absolute -right-1 -bottom-1 bg-green-500'></div> : <div className='absolute -right-1 -bottom-1 bg-yellow-500 rounded-full w-2 h-2 lg:w-4 lg:h-4 '></div>}
                    </div>
                    <div>
                        <p className='font-bold text-sm lg:text-base'>{profile.name}</p>
                        <p className='font-normal text-xs lg:text-sm text-gray-400'>{lastMessage}</p>
                    </div>
                </div>
            </a>
        )
    }
    return (
        <div className='hidden md:block px-3 py-3 h-full bg-[#171C22] text-white border-t-[1px] border-gray-400'>
            {
                chats.map((chat, index) => {
                    return (
                        <OneChat key={index} profile={chat.profile} lastMessage={chat.lastMessage} active={chat.active} />
                    )
                })
            }
        </div>
    )
}

export default ChatPart