import React from 'react'
import {NavLink} from 'react-router-dom'

interface ILink {
       to:string
       children:React.ReactNode
}

const Link = ({to , children}:ILink) => {
       return (
              
              <NavLink
                     className={({isActive}) => isActive? 'active' : 'link'}
                     to={to}
              >
                     {children}
              </NavLink>
       )
}

export default Link