import { Request, Response } from "express";
import { UpdateScheduleService} from "../../services/Restaurant/UpdateScheduleService";

class UpdateScheduleController{

    async handle(req: Request, res: Response){

        const idUser = req.idUser

        const {
            monIsOpen,
            tueIsOpen,
            wedIsOpen,
            thuIsOpen,
            friIsOpen,
            satIsOpen,
            sunIsOpen,
            monDescription,
            tueDescription,
            wedDescription,
            thuDescription,
            friDescription,
            satDescription,
            sunDescription,
            display
        } = req.body

        const updateScheduleService = new UpdateScheduleService()

        const schedule = await updateScheduleService.excetute({
            idUser,
            monIsOpen,
            tueIsOpen,
            wedIsOpen,
            thuIsOpen,
            friIsOpen,
            satIsOpen,
            sunIsOpen,
            monDescription,
            tueDescription,
            wedDescription,
            thuDescription,
            friDescription,
            satDescription,
            sunDescription,
            display
        })

        return res.json(schedule)

    }

}

export { UpdateScheduleController }