import React, { useEffect } from 'react'
import { AppDispatch , RootState } from '../index'
import { useSelector ,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { INewsProps } from '../Interface/INews'
import PostBlock from '../Component/Post.block'
import { deleteDataNews, getDataNews } from '../Store/News.store'
import Button from '../Component/Button'

const Posts = () => {

       const arrNews = useSelector<RootState , INewsProps[]> (state => state.news.news)
       const dispatch = useDispatch<AppDispatch>()

       const navigate = useNavigate()

       useEffect(() => {
              dispatch(getDataNews())
       },[dispatch])

       return (
              <div className='mainPostBlock'>
                     {
                            arrNews.map((val) => {
                                   return <div
                                          className='newsBlock'
                                          key={val._id}
                                   >
                                                 <PostBlock
                                                        key={val._id}
                                                        title={val.title}
                                                        datePub={val.datePub}
                                                        imageNews={val.imageNews}
                                                        _id={val._id}
                                                 />
                                                 <Button
                                                        styles=''
                                                        onClick={() => navigate(`/news/${val._id}`)}
                                                 >
                                                        READ MORE
                                                 </Button>
                                                 <Button
                                                        styles=''
                                                        onClick={() => {
                                                               
                                                               dispatch(deleteDataNews(val._id))}}
                                                 >
                                                        DELETE
                                                 </Button>
                                   </div>
                            })
                     }
                     
              </div>
       )
}

export default Posts