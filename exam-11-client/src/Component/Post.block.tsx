import React from 'react'
import { INewsProps } from '../Interface/INews'

type IPost =  Omit<INewsProps , 'description'>

const PostBlock = ({title , _id  ,imageNews ,datePub}:IPost) => {

       
       return (
              <div>
                     {
                            imageNews !== ''?
                            <img 
                                   src={`http://localhost:8000/news/${imageNews}`}/>
                            :null

                     }
                     <h2>{title}</h2>
                     <h4>{datePub}</h4>
                     
              </div>
       )
}

export default PostBlock