import { Time } from "@angular/common";
import { Category } from "src/app/util/enums/categories.enum";
import { REPEAT_PERIOD } from "src/app/util/enums/repeat-period.enum";
import { Status } from "src/app/util/enums/status.enum";

export interface IDay {
    date: string | Date,
    events?: IEvent[]
}

export interface IEvent {
    id?: number,
    name: string,
    startDate: string | Date,
    endDate?: string | Date,
    repeat: REPEAT_PERIOD,
    category: Category
    status?: Status;
}

export class Day implements IDay {
    public  date = '';
    public events = [];

    constructor(day?: IDay){
        if(day)
            Object.assign(this, day)
    } 
}
export class Event implements IEvent {
    public readonly id: number;
    public name = '';
    public startDate: string | Date = '';
    public endDate: string | Date = '';
    public time: Time | undefined;
    public repeat = REPEAT_PERIOD.NONE;
    public category: Category = Category.PERSONAL;
    public status: Status = Status.PROGRESS;

    constructor(event?: IEvent){
        if(event)
            Object.assign(this, event)
        this.id = (event?.startDate as Date).getFullYear()*10000 + (event?.startDate as Date).getMonth()*100 + (event?.startDate as Date).getDate();
    }    
}