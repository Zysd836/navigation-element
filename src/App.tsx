import React from 'react'
import { StoreContext } from './context/Store'

function App() {
  const { data, loading, error } = React.useContext(StoreContext)
  console.log('🚀 ~ file: App.tsx:5 ~ App ~ data:', data)

  return (
    <div className="App">
      <div
        className="bg-red-600"
        color="sd"
      >
        dsd
      </div>
    </div>
  )
}

export default App
