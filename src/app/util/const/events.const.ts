import { Category } from "../enums/categories.enum"
import { REPEAT_PERIOD } from "../enums/repeat-period.enum"

let date = new Date('2023-05-20')
export class Events {
    public static events = {
        none: [
            {
                startDate: new Date('2023-05-20'),
                endDate: new Date('2023-05-20'),
                id: 100000000+date.getFullYear()*1000 + date.getMonth()*100+20,
                repeat: REPEAT_PERIOD.NONE,
                category: Category.HOME,
                name: 'Buy food'
            },
            {
                startDate: new Date('2023-05-21'),
                endDate: new Date('2023-05-21'),
                id: 100000000+date.getFullYear()*1000 + date.getMonth()*100+21,
                repeat: REPEAT_PERIOD.NONE,
                category: Category.HOME,
                name: 'Cleaning'
            },
            {
                startDate: new Date('2023-05-22'),
                endDate: new Date('2023-05-22'),
                id: 100000000+date.getFullYear()*1000 + date.getMonth()*100+22,
                repeat: REPEAT_PERIOD.NONE,
                category: Category.HEALTH,
                name: 'Visit doctor'
            },
            {
                startDate: new Date('2023-05-22'),
                endDate: new Date('2023-05-22'),
                id: 100000000+date.getFullYear()*1000 + date.getMonth()*100+23,
                repeat: REPEAT_PERIOD.NONE,
                category: Category.RELATIONSHIPS,
                name: 'Dinner',
                participants: 'Nik'
            }
        ],
        everyday: [
            {
                startDate: new Date('2023-05-19'),
                endDate: undefined,
                id: 20000000 + date.getFullYear()*1000 + date.getMonth()*100+19,
                repeat: REPEAT_PERIOD.EVERYDAY,
                category: Category.EDUCATION,
                name: 'Book reading'
            }
        ],
        weekly: [],
        monthly: [],
        yearly: []
    }
}