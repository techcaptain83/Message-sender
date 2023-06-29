import Image from 'next/image';
import React from 'react'
import clsx from "clsx"
interface PersonProps{
    link: string,
    image?: string;
    text?: string;
    additionalStyles? : string 
}

const Person:React.FC<PersonProps> = ({link,image,text,additionalStyles}) => {
  return (
      <a href={link} className={clsx(
          text && "w-7 h-7 lg:w-10 lg:h-10 rounded-full bg-green-500 flex items-center justify-center",
          additionalStyles && additionalStyles
      )}>
          {image && <Image src={image} alt="person" width={40} height={40} className="rounded-full" />}
          {text && <p className='font-bold text-lg text-white'>{text}</p>}
      </a>
  )
}

export default Person