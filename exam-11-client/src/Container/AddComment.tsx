import React, { useEffect, useState , FormEvent} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../index'
import { INews, INewsProps  } from '../Interface/INews'
import { ICommentProps, ICommentValue } from '../Interface/IComment'
import { useParams } from 'react-router-dom'
import { deleteDataComment, getDataCommentId, postDataComment } from '../Store/Comment.store'
import { getDataNewsId } from '../Store/News.store'
import Comment from '../Component/Comment'
import Input from '../Component/Input'
import Textarea from '../Component/TextArea'
import Button from '../Component/Button'


const AddComment = () => {

       const arrComments = useSelector<RootState, ICommentProps[]>(state => state.comment)
       const newsObj = useSelector<RootState, INews>(state => state.news)
       const dispatch = useDispatch<AppDispatch> ()

       const {id} = useParams()

       const [commentValue , setComment] = useState<ICommentValue>({
              author:'',
              comment:'',
              news_id: ''
       })

       const submitHandlet = (e:FormEvent<HTMLFormElement>) => {
              e.preventDefault()

              const valueComment:number = commentValue.comment.trim().split(' ').join('').length

              if(valueComment !== 0){
                     dispatch(postDataComment(commentValue))
              }
              setComment({...commentValue , author:'' , comment: ''})
       }
       

       useEffect(() => {

              if(id) {
                     dispatch(getDataNewsId(id))
                     dispatch(getDataCommentId(id))
              }              
       },[dispatch])
       useEffect(() => {
              setComment({...commentValue , news_id: newsObj.newsId._id})
       },[newsObj.newsId])

       return (
              <>
                     <div
                            key={newsObj.newsId._id}
                     >
                            {
                                   newsObj.newsId.imageNews !== ''?
                                   <img src={`http://localhost:8000/news/${newsObj.newsId.imageNews}`}/>
                                   :null

                            }
                            <h2>{newsObj.newsId.title}</h2>
                            <p>{newsObj.newsId.description}</p>
                            <h4>{newsObj.newsId.datePub}</h4>
                     
                     </div>
                     <div>
                            {
                                   arrComments.map((val) => {
                                          return <div
                                                 key={val._id}
                                          >
                                                 <Comment
                                                 key={val._id}
                                                 author={val.author}
                                                 comment={val.comment}
                                          />
                                          <Button
                                                 styles=''
                                                 onClick={() => dispatch(deleteDataComment(val._id))}
                                          >
                                                 DELETE COMMENT
                                          </Button>
                                          </div>
                                   })
                            }
                            
                     </div>
                     <form onSubmit={submitHandlet} >
                            <Input
                                   value={commentValue.author}
                                   onChange={(e) => setComment({...commentValue, author: e.target.value})}
                                   styles=''
                                   placeholder='ENTER YOUR NAME'
                                   type='text'
                                   name='author'
                            />
                            <Textarea
                                   value={commentValue.comment}
                                   onChange={(e) => setComment({...commentValue , comment:e.target.value})}
                                   placeholder='ENTER COMMENT'
                                   name=''
                                   styles=''
                            />
                            <Button
                                   styles=''
                                   onClick={() => {}}
                            >
                                   ADD COMMENT
                            </Button>

                     </form>

              </>
       )
}

export default AddComment