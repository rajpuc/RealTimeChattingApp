import { Loader as LoaderIcon } from 'lucide-react'
import React from 'react'

const Loader = ({height="h-full"}) => {
  return (
    <div className={`w-full ${height} flex items-center justify-center`}>
      <LoaderIcon color='rgb(98, 201, 54)' className="animate-spin" size={40}/>
    </div>
  )
}

export default Loader
