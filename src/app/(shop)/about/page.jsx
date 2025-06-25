'use client'
import Loading from '@/components/ui/Loading/Loading'
import React, { useEffect, useState } from 'react'
import { MdOutlineMarkEmailUnread } from "react-icons/md"
import { TbFileDescription } from "react-icons/tb"
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"
import { FaAddressCard } from "react-icons/fa6"
import { RiBuilding2Fill } from "react-icons/ri"

const Page = () => {
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState(null)

  const GetInfo = async () => {
    try {
      const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/company-info`)
      const response = await request.json()
      setInfo(response)
    } catch (error) {
      console.error("Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    GetInfo()
  }, [])

  if (loading) return <div className="flex justify-center items-center h-96"><Loading /></div>
  if (!info) return <p className="text-center text-error">No info available</p>

  const hasValidCoordinates =
    Number.isFinite(info.companyAddress?.latitude) &&
    Number.isFinite(info.companyAddress?.longitude)

  const mapSrc = hasValidCoordinates
    ? `https://www.google.com/maps?q=${info.companyAddress.latitude},${info.companyAddress.longitude}&z=15&output=embed`
    : `https://www.google.com/maps?q=41.239957,69.336054&z=15&output=embed`

  return (
    <div className="max-w-full mx-auto p-6 rounded-xl mt-10">
      <p className="text-3xl font-bold text-center mb-6 text-primary flex items-center gap-2">
        <RiBuilding2Fill /> О компании
      </p>
      <div className="space-y-4 text-lg leading-relaxed">
        <div className="p-4 rounded-lg border-b-2 border-primary">
          <h2 className="font-semibold text-xl mb-2 flex items-center gap-2">
            <TbFileDescription className='text-primary' /> Описание:
          </h2>
          <p>{info.companyInfo}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border-b-2 border-primary">
            <h2 className="font-semibold text-xl mb-2 flex items-center gap-2">
              <MdOutlineMarkEmailUnread className='text-primary' /> Email:
            </h2>
            <p>{info.email?.[0]}</p>
          </div>

          <div className="p-4 rounded-lg border-b-2 border-primary">
            <h2 className="font-semibold text-xl mb-2 flex items-center gap-2">
              <FaPhoneAlt className='text-primary' /> Телефон:
            </h2>
            {info.phoneNumbers?.map((num, index) => (
              <p key={index}><a href={`tel:${num}`}>{num}</a></p>
            ))}
          </div>

          <div className="p-4 rounded-lg md:col-span-2 border-b-2 border-primary">
            <h2 className="font-semibold text-xl mb-2 flex items-center gap-2">
              <FaAddressCard className='text-primary' /> Адрес:
            </h2>
            <p>{info.companyAddress?.address}</p>
            <p className="text-sm text-base-content mt-1">
              Координаты: {info.companyAddress?.latitude}, {info.companyAddress?.longitude}
            </p>

            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" /> Карта:
              </h3>
              <iframe
                className="w-full h-96 rounded-lg border"
                loading="lazy"
                allowFullScreen
                src={mapSrc}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
