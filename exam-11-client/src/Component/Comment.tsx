import React from 'react'
import { ICommentValue } from '../Interface/IComment'

type ICommentForBlock = Omit<ICommentValue ,'news_id'>

const Comment = ({author , comment}:ICommentForBlock) => {
       return (
              <div
                     className='commentBlock'
              >
                     <h2>{author}</h2>
                     <p>{comment}</p>
              </div>
       )
}

export default Comment