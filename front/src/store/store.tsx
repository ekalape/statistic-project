import { create } from 'zustand';
import { temp_chars } from '../assets/temp_chars';
import { IChar, ICharsStore } from '../utils/interfaces';
import { persist } from 'zustand/middleware';

const useCharsStore = create<ICharsStore>()(
  persist(
    (set) => ({
      chars: [],
      selectedChars: [],

      getChars: async () => {
        const chars: IChar[] = temp_chars;
        /*     const res = await fetch('localhost:4040/chars', {
      method: "GET",
      headers: {
        'Content-type': "application/json"
      }
    }).catch();
    const chars = await res.json(); */
        set({ chars: chars });
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
              ...state,
              selectedChars: state.selectedChars.filter((sc) => sc.id !== selChar.id),
            };
          } else {
            return {
              ...state,
              selectedChars: [...state.selectedChars, selChar],
            };
          }
        });
      },
    }),
    {
      name: 'chars-storage',
      partialize: (state) => ({ selectedChars: state.selectedChars }),
    },
  ),
);

export { useCharsStore };
