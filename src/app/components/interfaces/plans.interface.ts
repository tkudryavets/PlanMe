import { IEvent } from "./IDay.interface";

export interface IPlans {
    none: IEvent[],
    everyday: IEvent[],
    weekly: IEvent[],
    twice_a_month: IEvent[],
    monthly: IEvent[],
    yearly: IEvent[],
}