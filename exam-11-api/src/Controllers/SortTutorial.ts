import sequelize from "@src/config/db.config";
import SortTutorial from "@src/DTO/SortTutorial";
import LessonsModel from "@src/Models/lessons";
import { Router , Request , Response } from "express";


const SortTutorialController: Router = Router()


SortTutorialController.get( '/' , async(req:Request , res:Response) => {

    const response = await LessonsModel.findAll()
    
    res.send(response)

})

SortTutorialController.post('/' , async(req:Request , res:Response) => {

    const {title , description , lessons ,transit_time} = req.body as SortTutorial

    try {

        const tutorial = new SortTutorial(title , description , lessons ,transit_time)

        const response = await LessonsModel.create({...tutorial})

        response.save()

        res.send(response)

    } catch (error) {

        res.status(400).send('FAQ')
        
    }


})

export default SortTutorialController