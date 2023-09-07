import { create } from 'zustand';
import { temp_chars } from '../assets/temp_chars';
import { IChar, ICharsStore, IEarning } from '../utils/interfaces';
import { persist } from 'zustand/middleware';
import { getAllCharacters } from './apiCalls';

const useCharsStore = create<ICharsStore>()(
  persist(
    (set) => ({
      chars: [],
      selectedChars: [],
      selectedSingleChar: null,

      getChars: async () => {
        const chars = await getAllCharacters();
        set({ chars: chars });
      },
      addEarning: async (profit: IEarning) => {
        const char = temp_chars.find((ch) => ch.id === profit.belongTo);
        if (!char) throw new Error('Character not found');
        char.earnings?.push({ amount: profit.amount });

        /*         set((state) => ({
          chars: state.chars.map((ch) => {
            if (ch.id === profit.belongTo) {
              return { ...ch, earnings: [...(ch.earnings || []), { amount: profit.amount }] };
            }
            return ch;
          }),
        })); */

        if (true) {
          async (state: ICharsStore) => await state.getChars();

          set((state) => ({
            selectedSingleChar:
              state.chars.find((ch) => ch.id === state.selectedSingleChar?.id) || null,
          }));
        }
      },
      addNewChar: async (
        name: string,
        server: string,
        fraction: string,
        portrait: string | null,
      ) => {
        const newChar: IChar = {
          id: '1111111',
          name,
          server,
          fraction,
          portrait,
          createdAt: 11111111,
          updatedAt: 11111111,
          earnings: [],
        };
        set((state) => ({ chars: [...state.chars, newChar] }));

        temp_chars.push(newChar);

        /* const res = await fetch('https://cuberun-server.onrender.com/auth/registration', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, server, fraction }),
    }).catch(); */

        if (/* res.ok */ true) {
          set((state) => ({ chars: [...state.chars, newChar] }));
          /* (state: ICharsStore) => state.getChars(); */
        }
        return /* res.ok */ true;
      },
      selectChar: (selChar: IChar) => {
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
      },
      setSelectedSingleChar: (char: IChar) => {
        set((state) => ({ ...state, selectedSingleChar: char }));
      },
    }),
    {
      name: 'chars-storage',
      partialize: (state) => ({
        selectedChars: state.selectedChars,
        selectedSingleChar: state.selectedSingleChar,
      }),
    },
  ),
);

export { useCharsStore };
