export interface IChar {
    id: string
    name: string
    server: string
    portrait: string | null
    fraction: string
    createdAt: number
    updatedAt: number
    earnings?: EarningType[]
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

export interface ICharsStore {
    chars: IChar[]
    selectedChars: IChar[]
    getChars: () => void
    addNewChar: (name: string, server: string, fraction: string, portrait: string | null) => Promise<boolean>
    selectChar: (selChar: IChar) => void
}