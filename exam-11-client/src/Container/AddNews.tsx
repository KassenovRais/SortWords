import  { FormEvent, useState , DragEvent, ChangeEvent } from 'react'
import { AppDispatch  } from '../index'
import { useDispatch } from 'react-redux'
import Input from '../Component/Input'
import Button from '../Component/Button'
import Textarea from '../Component/TextArea'
import {INewsValue } from '../Interface/INews'
import { postDataNews } from '../Store/News.store'
import '../Style/Add.block.css'
import { useNavigate } from 'react-router-dom'

const AddNews = () => {

       const dispatch:AppDispatch = useDispatch()


       const [dragEvent , setDrag] = useState<boolean>(false)

       const [valueNews , setNews] = useState<INewsValue>({
              title:'',
              description:'',
              imageNews:''
       })

       const navigate = useNavigate()
      

       const formSubmitHandler = (e:FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              const titleValue = valueNews.title.trim().length
              const descriptionValue = valueNews.description.trim().length
              
              if(titleValue !== 0 && descriptionValue !== 0){
                     const formData = new FormData();
                     for(let key in valueNews) {
                       formData.append(key, valueNews[key as keyof typeof valueNews]);
                     }
                     dispatch(postDataNews(formData))
       
                     navigate('/post')
              }
       }

       const fileChangeHandler = (e: DragEvent<HTMLDivElement>, name :string) => {
              e.preventDefault()

              
              if(e.dataTransfer.files) {
                const file = e.dataTransfer.files[0];
                
                setNews(prevState => ({
                  ...prevState,
                     [name]: file
                }))
                
              }

              console.log(valueNews.imageNews);
              
              setDrag(false)

       } 
       
       const dragStartHandler = (e:DragEvent) => {
              e.preventDefault()
              setDrag(true)

       }




       return (
              <div
                     className='mainBlockForm'
              >
                     <form 
                            className='formBlock'
                            onSubmit={formSubmitHandler} >
                            <Input
                                   value={valueNews.title}
                                   onChange={(e) => setNews({...valueNews , title:e.target.value})}
                                   styles=''
                                   placeholder='ENTER TITLE'
                                   type='text'
                                   name='title'
                            />
                            <Textarea
                                   value={valueNews.description}
                                   onChange={(e) => setNews({...valueNews , description:e.target.value})}
                                   styles=''
                                   placeholder='ENTER DESCRIPTION'
                                   name='description'
                            />
                            <div
                                   className='dragBlock'
                                   onDrop={(e) => fileChangeHandler(e ,'imageNews')}
                                   onDragStart={(e) => dragStartHandler(e)}
                                   onDragLeave={(e) => {
                                          e.preventDefault()
                                          setDrag(false)
                                   }}
                                   onDragOver={(e) => dragStartHandler(e)}
                            >
                                   {
                                          dragEvent? 'DROP' : 'PULL FILE'
                                   }
                            </div>
                            <Button
                                   onClick={() => {}}
                                   styles=''
                            >
                                   ADD
                            </Button>
                     </form>
                     
              </div>
       )
}

export default AddNews