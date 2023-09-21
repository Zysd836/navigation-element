import React, { memo } from 'react'

interface Props {
  item: ItemT
}
const CardItem: React.FC<Props> = memo(({ item }) => {
  return (
    <div className="text-white min-w-[280px] h-[220px] shadow-pri rounded-md bg-gray-800 cursor-pointer transition-all">
      <div className="w-full h-[160px] overflow-hidden">
        <img
          src={item?.image}
          loading="lazy"
          className="object-cover bg-center w-full h-full rounded-md"
          alt=""
        />
      </div>
      <div className="mt-2 mx-3">
        <h5 className="mb-0 text-base font-semibold whitespace-nowrap text-ellipsis overflow-hidden active-title">
          {item?.title}
        </h5>
        <div className="text-xs opacity-60 active-subtitle">{item.subtitle}</div>
      </div>
    </div>
  )
})

export default CardItem
