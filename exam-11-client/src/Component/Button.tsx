import React from 'react'

interface ButtonProps {
       children:React.ReactNode
       onClick:() => void
       styles:string
}

const Button = ({children , onClick , styles}:ButtonProps) => {
       return (
              <button
                     onClick={onClick}
                     className={styles}
              >
                     {children}
              </button>
       )
}

export default Button