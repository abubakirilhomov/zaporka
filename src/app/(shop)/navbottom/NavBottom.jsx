import React from 'react'
import Link from 'next/link'
import { CgProfile } from 'react-icons/cg'
import { MdCategory, MdContactPhone } from 'react-icons/md'

const NavBottom = () => {
  const pages = [
    { name: 'Каталог', href: '/catalog', icon: <MdCategory className="text-2xl" /> },
    { name: 'Компания', href: '/about', icon: <CgProfile className="text-2xl" /> },
    { name: 'Контакты', href: '/contacts', icon: <MdContactPhone className="text-2xl" /> },
  ]

  return (
    <div className=" z-50 bg-primary shadow-md">
      <div className="flex justify-around items-center py-6">
        {pages.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex  gap-2 items-center   text-base-content hover:text-base-content transition"
          >
            {item.icon}
            <span className="">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavBottom
