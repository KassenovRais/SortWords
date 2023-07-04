import { LeftCircleOutlined } from '@ant-design/icons'
import {  Card, Col, Row, Tag, Typography } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useState , DragEvent , CSSProperties} from 'react'
import { ISortObject, IWordSortTutorial } from '../../Interface/SortWords'
import '../SortTutorial.css'
import { dragbleStyle, dragBlur, dragStyle, gridStyle, iconStyle } from './StyleSortWords/Style.style.words'





const SortShowTutorial = () => {

    const [arrSortObject , setArrSort] = useState<ISortObject[]>([])

    const [sortObject , setSortObject] = useState<ISortObject | null>()

    const [copySortArr , setCopyArr] = useState<ISortObject>()

    const [currentWord , setCurrentWord] = useState<IWordSortTutorial > ()

    const [secretWord , setSecretWord] = useState<IWordSortTutorial> ()
  
    const getSortTutorial = async() => {

        try {

            const response = await axios.get<AxiosRequestConfig, AxiosResponse<ISortObject[]>>('http://localhost:8000/sortTutorial')
        
            setArrSort(response.data)

        } catch (error) {
            
        }
        
    }

    const currentArrWords = (e:ISortObject) => {

        setSortObject(e)

        setCopyArr(e)

    }

    const dropHandler = (e: DragEvent<HTMLSpanElement> , val:IWordSortTutorial ) => {

        e.preventDefault()


        if(sortObject && currentWord && val.isDrable) {

            const include: boolean = sortObject.lessons.checkedWord.includes(val)

            const index : number = sortObject.lessons.arrWords.findIndex((obj) => {
                return obj.id === val.id
            })
            const checkedIndex: number = sortObject.lessons.checkedWord.findIndex((currentObj) => {
                return currentObj.id === currentWord.id
            })

            const copy: ISortObject = {...sortObject}
            
            if(index >= 0 && checkedIndex >= 0 && !include)  {
                
                copy.lessons.arrWords[index] = {...copy.lessons.arrWords[index] , 
                    value: currentWord.value  , 
                    isDrable :true , 
                    styleHandler: false 
                }          
                copy.lessons.checkedWord[checkedIndex] = {...copy.lessons.checkedWord[checkedIndex] ,
                    isDrable: false
                }      

                setSortObject(copy)

            }
            
        }

    }
    
    useEffect(() => {

        getSortTutorial().catch((e) => console.log(e))

    }, [])

    return (
        <div>
            
            {
                sortObject && <LeftCircleOutlined
                        style={iconStyle}
                        onClick={() => setSortObject(null)}
                    />
            }
             
            {
                !sortObject ? <Row gutter={16}>
                    {
                            
                        arrSortObject.map((val) => {
                            return <Col 
                                        key={val.id}
                                        onClick={() => currentArrWords(val)}
                                        span={8}>
                                        <Card title={val.title} bordered={false}>
                                            {val.description}
                                        </Card>
                                    </Col>
                                })
                            }
                        </Row>:

                (
                    <Card  >
                        <Typography>
                            <Title>{sortObject.title}</Title>
                                <Paragraph>
                                    {sortObject.description}
                                </Paragraph>
                        </Typography>

                        <Typography>
                            {
                                sortObject.lessons.arrWords.map((val) => {
                                    return <span 
                                            key={val.id} 
                                            draggable={val.isDrable}
                                            onDragStart={() => setSecretWord(val)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {dropHandler(e , val) }} 
                                            style={
                                                val.styleHandler
                                                ?  dragBlur : (val.isDrable ? dragStyle : gridStyle ) }
                                        >{val.value}</span>
                                })
                            }
                        </Typography>
                        {
                        
                            sortObject.lessons.checkedWord.map((val) => {
                                return <Tag 
                                        style={val.isDrable ? gridStyle : dragbleStyle} 
                                        color="#5BC0EB" 
                                        key={val.id} 
                                        draggable={val.isDrable}
                                        onDragStart={(e) => setCurrentWord(val)}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => dropHandler(e , val)}
                                        
                                    >{val.value}</Tag>
                            })
                        }
                    
                </Card>
                
                )
            }
            
        </div>
    )
}

export default SortShowTutorial