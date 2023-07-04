import React from 'react'
import Link from './Link'
import { Outlet } from 'react-router-dom'

const Layout = () => {
       return (
              <div>
                     <div 
                            className='navBar'
                     >
                            <Link
                                   to='/'
                            >
                                   POST
                            </Link>
                            <Link
                                   to='show'
                            >
                                   SHOW
                            </Link>
                     </div>
                     <div>
                            <Outlet/>
                     </div>
              </div>
       )
}

export default Layout