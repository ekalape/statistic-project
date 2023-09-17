import { create } from 'zustand';
import { IChar, ICharsStore } from '../utils/interfaces';
import { persist } from 'zustand/middleware';
import { getAllCharacters, getOneCharacter } from './apiCalls';

const useCharsStore = create<ICharsStore>()(
  persist(
    (set) => ({
      chars: [],
      selectedChars: [],
      selectedSingleChar: null,
      timeSign: new Date(),

      getChars: async () => {
        const chars = await getAllCharacters();
        set({ chars: chars });
      },

      selectAllChars: (newchars: IChar[]) => {
        set({ selectedChars: newchars });
      },

      deleteOneFromSelected: (selChar: IChar | null) => {
        set((state) => ({
          selectedChars: state.selectedChars.filter((sc) => sc.id !== selChar?.id),
        }));
      },

      selectChar: (selChar: IChar | null) => {
        if (selChar === null) set({ selectedSingleChar: null });
        else {
          set((state) => {
            const ch = state.selectedChars.find((c) => c.id === selChar.id);
            if (ch) {
              return {
                selectedChars: state.selectedChars.filter((sc) => sc.id !== selChar.id),
              };
            } else {
              return {
                selectedChars: [...state.selectedChars, selChar],
              };
            }
          });
        }
      },
      updateSelectedChar: async (charId: string) => {
        set({
          selectedSingleChar: await getOneCharacter(charId),
        });
      },

      setSelectedSingleChar: (char: IChar | null) => {
        if (char === null) set({ selectedSingleChar: null });
        else {
          set((state) => ({ ...state, selectedSingleChar: char }));
        }
      },

      setTimeSign: (sign: Date) => {
        set((state) => ({ ...state, timeSign: sign }));
      },
    }),
    {
      name: 'chars-storage',
      partialize: (state) => ({
        selectedChars: state.selectedChars,
        selectedSingleChar: state.selectedSingleChar,
        timeSign: state.timeSign,
      }),
    },
  ),
);

export { useCharsStore };
