import { Schedule, Restaurant } from "../../sequelize/sequelize";
import { Model } from "sequelize";

interface scheduleProps{
    idUser: string,
    monIsOpen: boolean,
    tueIsOpen: boolean,
    wedIsOpen: boolean,
    thuIsOpen: boolean,
    friIsOpen: boolean,
    satIsOpen: boolean,
    sunIsOpen: boolean,
    monDescription: string,
    tueDescription: string,
    wedDescription: string,
    thuDescription: string,
    friDescription: string,
    satDescription: string,
    sunDescription: string,
    display: boolean,
}

class UpdateScheduleService{

    async excetute({
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
    }: scheduleProps){

        // identificar id do restaurante a partir do id do user recebido no request
        const restaurant: Model<any, any> | null = await Restaurant.findOne({
            where: {
                user_idUser: idUser
            },
            attributes: ['idRestaurant']
        })

        // a partir do id do restaurante, identificar registro de 'schedule' associado a ele e fazer o update
        const idRestaurant = restaurant.get("idRestaurant") as number;

        const schedule = await Schedule.update({
            idUser: idUser,
            monIsOpen: monIsOpen,
            tueIsOpen: tueIsOpen,
            wedIsOpen: wedIsOpen,
            thuIsOpen: thuIsOpen,
            friIsOpen: friIsOpen,
            satIsOpen: satIsOpen,
            sunIsOpen: sunIsOpen,
            monDescription: monDescription,
            tueDescription: tueDescription,
            wedDescription: wedDescription,
            thuDescription: thuDescription,
            friDescription: friDescription,
            satDescription: satDescription,
            sunDescription: sunDescription,
            display: display
        },
        {
            where: {
                restaurant_idRestaurant: idRestaurant
            }
        });

        return(schedule)

    }
}

export { UpdateScheduleService }