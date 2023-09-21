import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StoreContext } from './context/Store'
import Category from './component/Category'
import { CodeArrowKey, activeClass } from './utils/constant'
import SkeletonLoading from './component/SkeletonLoading'

interface CurrentDataFocusableT {
  categoryIdx: number
  activeItemIdx: number
}
const HEIGHT_CATEGORY_ELEMENT = 336
const WIDTH_CARD_ITEM = 304
function App() {
  const { data, loading, error } = React.useContext(StoreContext)
  const [currentDataFocusable, setCurrentDataFocusable] = useState<CurrentDataFocusableT>({
    categoryIdx: 0,
    activeItemIdx: 0,
  })

  const listItemRef = useRef<HTMLElement[]>([])

  // push all element category to list
  const pushListItemRef = useCallback((e: HTMLElement | null) => {
    if (e && !(listItemRef as any)?.current?.includes(e)) (listItemRef as any)?.current?.push(e)
  }, [])

  const handlePressArrowRight = useCallback(() => {
    const { activeItemIdx, categoryIdx } = currentDataFocusable
    const allCategoryElement = listItemRef?.current
    const currentListCardElement = allCategoryElement?.[categoryIdx]?.children?.[1]
    const currentCardElements = currentListCardElement?.children
    if (categoryIdx + 1 >= (data?.data?.totalItems as number) && activeItemIdx === currentCardElements?.length - 1) {
      return
    }
    // logic when to end current category
    if (activeItemIdx === currentCardElements?.length - 1) {

      allCategoryElement?.[categoryIdx + 1]?.classList?.add(activeClass.ACTIVE_CATEGORIES)
      allCategoryElement?.[categoryIdx]?.classList?.remove(activeClass?.ACTIVE_CATEGORIES)
      window?.scrollTo({
        top: HEIGHT_CATEGORY_ELEMENT * (categoryIdx + 1),
        behavior: 'smooth',
      })
      const nextListCardElement = allCategoryElement?.[categoryIdx + 1]?.children?.[1]
      const nextCardElements = nextListCardElement?.children
      let nextActiveIdx: number | null = null
      for (let idx = 0; idx < nextCardElements?.length; idx++) {
        if (nextCardElements?.[idx]?.className?.includes(activeClass?.ACTIVE_ITEMV)) {
          nextActiveIdx = idx
        }
      }
      nextActiveIdx !== null &&
        setCurrentDataFocusable({
          categoryIdx: categoryIdx + 1,
          activeItemIdx: nextActiveIdx,
        })
      return
    }
    // logic focus next card element
    if (activeItemIdx < currentCardElements?.length - 1) {
      currentCardElements?.[activeItemIdx + 1]?.classList?.add(activeClass.ACTIVE_ITEMV)
      currentListCardElement?.scrollTo({
        left: WIDTH_CARD_ITEM * (activeItemIdx + 1),
        behavior: 'smooth',
      })
      // remove class element not active
      currentCardElements?.[activeItemIdx]?.classList?.remove(activeClass?.ACTIVE_ITEMV)
      setCurrentDataFocusable({
        activeItemIdx: activeItemIdx + 1,
        categoryIdx,
      })
    }
  }, [currentDataFocusable, data?.data?.totalItems])

  const handlePressArrowDown = useCallback(() => {
    const { categoryIdx } = currentDataFocusable
    const allCategoryElement = listItemRef?.current
    if (categoryIdx + 1 >= (data?.data?.totalItems as number)) {
      return
    }
    // logic when to end current category
    allCategoryElement?.[categoryIdx + 1]?.classList?.add(activeClass.ACTIVE_CATEGORIES)
    allCategoryElement?.[categoryIdx]?.classList?.remove(activeClass?.ACTIVE_CATEGORIES)
    window?.scrollTo({
      top: HEIGHT_CATEGORY_ELEMENT * (categoryIdx + 1),
      behavior: 'smooth',
    })
    const nextListCardElement = allCategoryElement?.[categoryIdx + 1]?.children?.[1]
    const nextCardElements = nextListCardElement?.children
    let nextActiveIdx: number | null = null
    for (let idx = 0; idx < nextCardElements?.length; idx++) {
      if (nextCardElements?.[idx]?.className?.includes(activeClass?.ACTIVE_ITEMV)) {
        nextActiveIdx = idx
      }
    }
    nextActiveIdx !== null &&
      setCurrentDataFocusable({
        categoryIdx: categoryIdx + 1,
        activeItemIdx: nextActiveIdx,
      })
  }, [currentDataFocusable, data?.data?.totalItems])

  const handlePressArrowLeft = useCallback(() => {
    const { activeItemIdx, categoryIdx } = currentDataFocusable
    if (categoryIdx === 0 && activeItemIdx === 0) {
      return
    }

    const allCategoryElement = listItemRef?.current
    const currentListCardElement = allCategoryElement?.[categoryIdx]?.children?.[1]
    const currentCardElements = currentListCardElement?.children
    // logic when to end current category
    if (activeItemIdx <= 0 && categoryIdx !== 0) {
      allCategoryElement?.[categoryIdx - 1]?.classList?.add(activeClass.ACTIVE_CATEGORIES)
      allCategoryElement?.[categoryIdx]?.classList?.remove(activeClass?.ACTIVE_CATEGORIES)
      window?.scrollTo({
        top: HEIGHT_CATEGORY_ELEMENT * (categoryIdx - 1),
        behavior: 'smooth',
      })
      const nextListCardElement = allCategoryElement?.[categoryIdx - 1]?.children?.[1]
      const nextCardElements = nextListCardElement?.children
      let nextActiveIdx: number | null = null
      for (let idx = 0; idx < nextCardElements?.length; idx++) {
        if (nextCardElements?.[idx]?.className?.includes(activeClass?.ACTIVE_ITEMV)) {
          nextActiveIdx = idx
        }
      }
      nextActiveIdx !== null &&
        setCurrentDataFocusable({
          categoryIdx: categoryIdx - 1,
          activeItemIdx: nextActiveIdx,
        })
      return
    }
    // logic focus next card element
    if (activeItemIdx > 0) {
      currentCardElements?.[activeItemIdx - 1]?.classList?.add(activeClass.ACTIVE_ITEMV)
      currentListCardElement?.scrollTo({
        left: WIDTH_CARD_ITEM * (activeItemIdx - 1),
        behavior: 'smooth',
      })
      // remove class element not active
      currentCardElements?.[activeItemIdx]?.classList?.remove(activeClass?.ACTIVE_ITEMV)
      setCurrentDataFocusable({
        activeItemIdx: activeItemIdx - 1,
        categoryIdx,
      })
    }
  }, [currentDataFocusable])

  const handlePressArrowUp = useCallback(() => {
    const { categoryIdx } = currentDataFocusable
    if (categoryIdx === 0) {
      return
    }

    const allCategoryElement = listItemRef?.current
    // logic when to end current category
    allCategoryElement?.[categoryIdx - 1]?.classList?.add(activeClass.ACTIVE_CATEGORIES)
    allCategoryElement?.[categoryIdx]?.classList?.remove(activeClass?.ACTIVE_CATEGORIES)
    window?.scrollTo({
      top: HEIGHT_CATEGORY_ELEMENT * (categoryIdx - 1),
      behavior: 'smooth',
    })
    const nextListCardElement = allCategoryElement?.[categoryIdx - 1]?.children?.[1]
    const nextCardElements = nextListCardElement?.children
    let nextActiveIdx: number | null = null
    for (let idx = 0; idx < nextCardElements?.length; idx++) {
      if (nextCardElements?.[idx]?.className?.includes(activeClass?.ACTIVE_ITEMV)) {
        nextActiveIdx = idx
      }
    }
    nextActiveIdx !== null &&
      setCurrentDataFocusable({
        categoryIdx: categoryIdx - 1,
        activeItemIdx: nextActiveIdx,
      })
  }, [currentDataFocusable])

  useEffect(() => {
    const handlePressNavigation = (e: KeyboardEvent) => {
      e.preventDefault()

      const checkActiveCategory = () => {
        const activeCategory = listItemRef?.current?.find(
          (item: HTMLElement) => item?.className?.includes(activeClass.ACTIVE_CATEGORIES),
        )
        return activeCategory
      }

      if (!checkActiveCategory() && Object.values(CodeArrowKey).includes(e.code as any)) {
        // all section (category component)
        listItemRef?.current?.[0]?.classList?.add(activeClass.ACTIVE_CATEGORIES)

        const firstCategory = listItemRef?.current?.[0]

        const parentListCardElement = firstCategory?.children?.[1]

        const firstCardElement = parentListCardElement?.children?.[0]

        firstCardElement.classList.add(activeClass.ACTIVE_ITEMV)
        for (let category of listItemRef?.current) {
          category?.children?.[1]?.children?.[0]?.classList.add(activeClass.ACTIVE_ITEMV)
        }
        return
      }
      switch (e.code) {
        case CodeArrowKey.ARROW_UP:
          handlePressArrowUp()
          break
        case CodeArrowKey.ARROW_DOWN:
          handlePressArrowDown()
          break
        case CodeArrowKey.ARROW_LEFT:
          handlePressArrowLeft()
          break
        case CodeArrowKey.ARROW_RIGHT:
          handlePressArrowRight()
          break
        default:
      }
    }
    document.addEventListener('keydown', handlePressNavigation)
    return () => document.removeEventListener('keydown', handlePressNavigation)
  }, [handlePressArrowDown, handlePressArrowLeft, handlePressArrowRight, handlePressArrowUp])
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
