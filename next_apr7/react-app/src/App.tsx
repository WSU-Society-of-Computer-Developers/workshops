import { useState, useEffect } from 'react'
import Card from './comps/Card'

function App() {
  const [photos, setPhotos] = useState([])
  useEffect(() => { // run once the app is mounted
    const url = "https://jsonplaceholder.typicode.com"
    fetch(url + "/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data))
  }, [])
  return (
    <div className='mx-8 mt-4'>
      <h1 className='text-lg'>React App</h1>
      <h3 className='text-gray-400'>Gallery</h3>
      <div className="columns-1 md:columns-2 xl:columns-4">
        {photos ? photos.map(({ id, title, url }) => <Card img={url} title={title} key={id}>{title}</Card>) : <p>Loading...</p>}
      </div>
    </div>
  )
}

export default App
