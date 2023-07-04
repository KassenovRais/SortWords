import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import TextArea from 'antd/es/input/TextArea'
import {  useState } from 'react'
import Tags from '../Component/Tag'
import { nanoid } from 'nanoid'
import './Audio.css'


interface IWord {
    value:string
    isBlur:boolean
    id:string
}


const Audio = () => {

    const [show , setShow] = useState(false)

    const [value , setValue] = useState<string>('')

    const [copyValue , setCopy] = useState<Omit<IWord , 'isBlur'>[]> ([])

    const [checkArr , setCheck] = useState<IWord[]>([])

    const tranformToArray = () => {

        const copy: IWord[] = []

        value.split(' ').map((val) => {
            copy.push({value: val , isBlur :false ,id: nanoid()})
        })

        setCheck(copy)

    }


   
    const specValue = (e:string , id :string) => {

        const reg = new RegExp(/[^a-zA-Zа-яА-Я0-9\s]/g, "");
 

        if(!reg.test(e)) {

            const copy: IWord[] = [...checkArr]

            const index  = copy.findIndex((idObj) => idObj.id === id)

            if(index >= 0) {

                copy[index] = {...copy[index] , isBlur:true}

                setCheck(copy)
    
                setCopy([...copyValue , {value:e , id:id}])
            }

            
        }

    }

    const deleteWord = (e:string) => {

        console.log(copyValue);

        const index  = checkArr.findIndex((obj) => obj.id === e)

        const wordIndex = copyValue.findIndex((obj) => obj.id === e)

        if(index >= 0 && wordIndex >= 0) {
            
            let copy = [...checkArr] 

            copy[index].isBlur = false 

            setCheck(copy)

            // copy

            // setCopy((prev) => {
            //     return prev = copyValue.splice(wordIndex ,1)
            // })


            
        }
        

    }




    return (
        <>
            {
                !show ?
                <div>
                    <TextArea
                        maxLength={300}
                        style={{ height: '40vh', margin:'3% auto' , width:'50%' ,resize: 'none' }}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                            tranformToArray()
                        }}
                    /> 
                    <button
                        onClick={() => setShow(!show)}
                    >
                        Далее
                    </button>
                </div>
            :<>
                <div>
                    {
                        checkArr.map((val , index) => {
                            return <span 
                                    onClick={() => specValue(val.value , val.id)} 
                                    className={val.isBlur ? 'blur' : 'show'} 
                                    key={index}> {val.value}  
                                </span>
                        } )
                    }
                </div>
                <div>
                {
                    copyValue.map((val) => {
                        return <Tags
                            
                            key={Math.random()}
                            onClose={() => deleteWord(val.id)}
                            label={val.value}
                            closable={true}
                            
                            />
                    })
                }
                </div>
                <button
                        onClick={() => setShow(!show)}
                    >
                        Редактировать
                </button>
            </>
            }
        </>

    )
}

export default Audio