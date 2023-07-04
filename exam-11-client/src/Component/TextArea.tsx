import React, { ChangeEvent } from 'react'

interface ITextArea {
       value:string
       onChange:(e:ChangeEvent<HTMLTextAreaElement>) => void
       placeholder:string
       styles:string
       name:string
}

const Textarea = ({value , styles , placeholder , onChange}:ITextArea) => {
       return (
              <textarea
                     value={value}
                     onChange={onChange}
                     className={styles}
                     placeholder={placeholder}
              />
       )
}

export default Textarea