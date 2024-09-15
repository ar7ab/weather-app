import React from 'react'
import Weather from './components/Weather'
import '@fontsource/poppins/400.css'; // Normal weight
import '@fontsource/poppins/700.css'; // Bold weight



const App = () => {
  return (
    <div className='app min-h-[100vh] grid bg-blue-300'>
      <Weather />
    </div>
  )
}

export default App