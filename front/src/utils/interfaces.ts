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
    date: string;
    amount: number;
    belongTo: string;
    char?: { name: string, server: string }

}

export type EarningType = Pick<IEarning, "amount" | "date">

export interface ICharsStore {
    chars: IChar[]
    selectedChars: IChar[]
    selectedSingleChar: IChar | null
    timeSign: Date
    getChars: () => void
    selectChar: (selChar: IChar) => void
    selectAllChars: (newchars: IChar[]) => void
    setSelectedSingleChar: (char: IChar | null) => void
    setTimeSign: (sign: Date) => void
    updateSelectedChar: (charId: string) => void
    deleteOneFromSelected: (selChar: IChar | null) => void



}