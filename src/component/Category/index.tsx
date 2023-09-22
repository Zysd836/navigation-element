import React, { forwardRef, memo } from 'react'
import CardItem from '../CardItem'
import styles from './index.module.scss'

interface Props {
  data: CategoriesT
  pushListItemRef: (e: HTMLElement | null) => void
}
const Category: React.FC<Props> = memo(({ data, pushListItemRef }) => {
  return (
    <section ref={(e) => pushListItemRef(e)}>
      <h3 className="text-xl font-semibold text-white whitespace-nowrap py-6">{data?.title || 'N/A'}</h3>
      <div className={`${styles.list__item} flex overflow-x-scroll gap-6 h-[260px] items-center`}>
        {data?.items?.map((item, idx) => (
          <CardItem
            key={idx}
            item={item}
          />
        ))}
      </div>
    </section>
  )
})

export default Category
