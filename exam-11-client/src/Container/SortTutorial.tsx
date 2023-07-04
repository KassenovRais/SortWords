import  { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import Button from 'antd/es/button/button'
import Tags from '../Component/Tag'
import { nanoid } from 'nanoid'
import './SortTutorial.css'
import axios from 'axios'
import { ISortObject, IWordSortTutorial } from '../Interface/SortWords'
import ModalByLessons from '../Component/ModalByLessons/Modal.by.lessons'



const SortTutorial = () => {

    const [valueArea , setArea] = useState<string> ('')

    const [showModal , setModal] = useState<boolean> (false)

    const [isShow ,  setShow] = useState<boolean>(false)

    const [sortObject , setSortObject] = useState<ISortObject>({
        id: nanoid(),
        title: 'AWD',
        description: 'AWD',
        lessons: {
            arrWords: [],
            checkedWord: []
        },
        transit_time:'DWAWDA'
    })

    
    const parseWords = () => {
        setShow(!isShow)

        const copyValue: IWordSortTutorial[] = valueArea.split(' ').map((val) => {

            return {value :val , id: nanoid() , isDrable : false ,styleHandler: false}

        })

        setSortObject({...sortObject , lessons: {
            ...sortObject.lessons , 
            arrWords: copyValue
        }})
        
    }

    const addWord = (val:IWordSortTutorial) => {

        const index:number = sortObject.lessons.arrWords.findIndex((obj) => obj.id === val.id)

        const includet: boolean = sortObject.lessons.checkedWord.map((obj) => obj.id).includes(val.id)


        if(index >= 0 && !includet) {
            

            const copy : ISortObject = {...sortObject}

            copy.lessons.arrWords[index] = {...copy.lessons.arrWords[index] ,
                isDrable:true , 
                styleHandler: true 
            }

            copy.lessons.checkedWord = [...copy.lessons.checkedWord , {...val ,isDrable:true , 
                styleHandler: true , id: nanoid() }]
        
            setSortObject(copy)
        }

    }

    const removeWord = (val:IWordSortTutorial ) => {

        const index:number = sortObject.lessons.arrWords.findIndex((obj) => obj.id === val.id)

        const indexChecked:number = sortObject.lessons.checkedWord.findIndex((obj) => obj.id === val.id)

        if(index >= 0 && indexChecked >= 0) {

            const copy : ISortObject = {...sortObject}

            copy.lessons.arrWords[index] = {...copy.lessons.arrWords[index] ,
                isDrable:false , 
                styleHandler: false 
            }

            copy.lessons.checkedWord = [...copy.lessons.checkedWord.splice(indexChecked , 1)]

            setSortObject(copy)

        }

    }

    const addNewLessons = async() => {

        try {

            const response = await axios.post('http://localhost:8000/sortTutorial' , 
            
                sortObject,
                
            )
            
        } catch (error) {
            console.log('FUK');
  
    }}
    

    return (
        <div>
            {
                !isShow ? 
                    <>  
                        
                        <TextArea
                            maxLength={300}
                            style={{ height: '40vh', margin:'3% auto' , width:'50%' ,resize: 'none' }}
                            value={valueArea}
                            onChange={(e) => {
                                setArea(e.target.value)
                            }} 
                        /> 
                        <Button
                            type='primary'
                            onClick={parseWords}
                        >
                            Выборка
                        </Button>
                    </>
                    :
                    <>
                        <div>
                            {
                                sortObject.lessons.arrWords.map((val) => {
                                    return <span
                                        className={!val.isDrable ? 'stock' : 'blur'}
                                        key={val.id}
                                        onClick={() => addWord(val)}
                                        >{val.value}</span>
                                })
                            }
                        </div>
                        {
                            sortObject.lessons.checkedWord.map((val) => {
                                return <Tags
                                    key={val.id}
                                    onClose={() => removeWord(val)}
                                    label={val.value}
                                    closable={true}
                                    
                                    />
                            })
                        }

                        <Button
                            type='primary'
                            onClick={() => setShow(!isShow)}
                        >
                            Редактировать
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => addNewLessons()}
                        >
                            Сохранить
                        </Button>
                    </>
            }
            {/* <ModalByLessons
                value={sortObject}
                open={showModal}
                close={() => setModal(!showModal)}
            /> */}
        </div>
    )
}

export default SortTutorial