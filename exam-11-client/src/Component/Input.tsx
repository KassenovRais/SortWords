import React, { ChangeEvent } from 'react'

interface InputProps {
       value:string
       onChange:(e:ChangeEvent<HTMLInputElement>) => void
       styles:string;
       type:string
       placeholder:string
       name:string
}

const Input = ({value , styles , onChange ,type,placeholder}:InputProps) => {
       return (
              <input
                     value={value}
                     onChange={onChange}
                     className={styles}
                     placeholder={placeholder}
                     type={type}
              />
       )
}

export default Input