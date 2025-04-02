import React from 'react';


const SmalllSidebarBtn = ({icon,name,onClick,isActive}) => {
  return (
    <button onClick={onClick} className={`block text-cm-icon cursor-pointer relative ${isActive?"after:content-[''] after:absolute after:w-full after:h-1 after:left-0 after:-translate-y-5 cm-xmd:after:w-1 cm-xmd:after:h-full after:bg-cm-green-deep after:top-0 cm-xmd:after:left-full cm-xmd:after:-translate-y-0 cm-xmd:after:translate-x-5":""}`}>
        {icon}
    </button>
  )
}

export default SmalllSidebarBtn;
