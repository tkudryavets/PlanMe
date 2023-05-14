import { CATEGORIES } from "src/app/util/const/categories.const";

export interface IDay {
    id?: number,
    date: string | Date,
    advent: string,
    participants: string,
    repeat: {text: string, days: number},
    category?: CATEGORIES
}