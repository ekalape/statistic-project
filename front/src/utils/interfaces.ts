export interface IChar {
    id: string
    name: string
    server: string
    portrait: string | null
    fraction: string
    createdAt: number
    updatedAt: number
    earnings: EarningType[]
}

export interface IEarning {
    id?: string;
    day: number;
    month: number;
    year: number;
    amount: number;
    belongTo: string;

}

export type EarningType = Pick<IEarning, "amount">

export interface ICharsStore {
    chars: IChar[]
    selectedChars: IChar[]
    selectedSingleChar: IChar | null
    timeSign: Date
    getChars: () => void
    addEarning: (earning: IEarning) => void
    addNewChar: (name: string, server: string, fraction: string, portrait: string | null) => Promise<boolean>
    selectChar: (selChar: IChar) => void
    selectAllChars: (newchars: IChar[]) => void
    setSelectedSingleChar: (char: IChar) => void
    setTimeSign: (sign: Date) => void


}