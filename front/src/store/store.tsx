import { create } from 'zustand';
import { temp_chars } from '../assets/temp_chars';
import { IChar, ICharsStore } from '../utils/interfaces';

const useCharsStore = create<ICharsStore>((set, get) => ({
  chars: [],

  getChars: async () => {
    const chars = temp_chars;
    /*     const res = await fetch('localhost:4040/chars', {
      method: "GET",
      headers: {
        'Content-type': "application/json"
      }
    }).catch();
    const chars = await res.json(); */
    set({ chars: chars });
  },
  addNewChar: async (name: string, server: string, fraction: string, portrait: string | null) => {
    const newChar: IChar = {
      id: '1111111',
      name,
      server,
      fraction,
      portrait,
      createdAt: 11111111,
      updatedAt: 11111111,
    };
    temp_chars.push(newChar);
    /* const res = await fetch('https://cuberun-server.onrender.com/auth/registration', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, server, fraction }),
    }).catch(); */

    if (/* res.ok */ true) {
      (state: ICharsStore) => state.getChars();
    }
    return /* res.ok */ true;
  },
}));

export { useCharsStore };
