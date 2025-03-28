import React from 'react';


const SmalllSidebarBtn = ({icon,name,onClick}) => {
  return (
    <button onClick={onClick} className='block text-cm-icon cursor-pointer'>
        {icon}
    </button>
  )
}

export default SmalllSidebarBtn;
