import { Button, Form, Input, Modal, TimePicker } from 'antd'
import  { ChangeEvent, FormEvent, useState } from 'react'
import { ISortObject } from '../../Interface/SortWords';
import dayjs from 'dayjs';
import axios from 'axios';


interface ModalSortWords  {
    value: ISortObject 
    open: boolean
    close: () => void
}


const ModalByLessons = ({value , open ,close}: ModalSortWords) => {

    const [sortObject , setSortObject] = useState<ISortObject>(value)

    const [time , setTime ] = useState<any>(null)

    const onFinish = async(value: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        setSortObject((prev) => {
            return {...prev, value}
        })        

        try {

            // const response = await axios.post('http://localhost:8000/sortTutorial' , 
            
            //     sortObject,
            // )
            console.log(sortObject , value);
            
            
            
        } catch (error) {
            console.log('FUK');
            
        }
    };

    console.log(value);
    
    return (
        <Modal 
            title="Basic Modal" 
            open={open} 
            onCancel={close}
            footer={null}
        >
            
            <Form
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                 
            >
                           
                <Form.Item 
                    name='title'
                    label="Название" 
                    rules={[{ required: true }]}     
                >
                    <Input 
                        value={sortObject.title}                  
                        />
                </Form.Item>

                <Form.Item 
                    name='description' 
                    label="Описание" 
                    rules={[{ required: true }]} 
                >
                    <Input.TextArea
                         
                        value={sortObject.description}     
                    />
                </Form.Item>

                <Form.Item 
                    name="transit_time" 
                    label="Время на прохожденние"   
                    rules={[{ required: true }]}                           
                >
                    <TimePicker
                        value={time}
                        onChange={(e) => {
                            
                            console.log(e);
                            
                        }} 
                        format='mm:ss' 
                    />
                </Form.Item>

                <Button 
                    type="primary"               
                    onClick={close}
                 >
                        Отменить
                    </Button>            
                <Button 
                    type="primary"  
                    htmlType="submit"
                >
                    Сохранить
                </Button>
            </Form>
            
        </Modal>
    )
}

export default ModalByLessons