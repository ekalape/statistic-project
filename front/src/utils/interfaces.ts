export interface IChar {
    id: string
    name: string
    server: string
    portrait: string
    fraction: string
    createdAt: number
    updatedAt: number
    earnings: EarningType[]
}

export interface IEarning {
    id: string;
    day: number;
    month: number;
    year: number;
    amount: number;
    belongTo: string
}

export type EarningType = Partial<IEarning>