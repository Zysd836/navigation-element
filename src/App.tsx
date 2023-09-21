import React, { useCallback, useRef } from 'react'
import { StoreContext } from './context/Store'
import Category from './component/Category'
import SkeletonLoading from './component/SkeletonLoading'

function App() {
  const { data, loading, error } = React.useContext(StoreContext)

  const listItemRef = useRef<HTMLElement[]>([])

  // push all element category to list
  const pushListItemRef = useCallback((e: HTMLElement | null) => {
    if (e && !(listItemRef as any)?.current?.includes(e)) (listItemRef as any)?.current?.push(e)
  }, [])
  return (
    <div className="my-container px-6">
      {loading ? (
        <div className="flex overflow-hidden gap-6 h-[260px] items-center scroll--none">
          {Array.from(Array(10).keys()).map((item) => (
            <SkeletonLoading key={item} />
          ))}
        </div>
      ) : (
        <>
          {data?.data?.items?.map((item, idx) => (
            <Category
              pushListItemRef={pushListItemRef}
              key={idx}
              data={item}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
