type ItemT = {
  id?: string
  title?: string
  subtitle?: string
  image?: string
}
type CategoriesT = {
  title: string
  type: number
  items: ItemT[]
}
type ResponseT = {
  data?: {
    items: CategoriesT[]
    totalItems: number
  }
}
