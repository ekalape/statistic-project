import { temp_chars } from '../assets/temp_chars';
import { IChar } from '../utils/interfaces';

export async function getAllCharacters() {
  /*   const res = await fetch('localhost:4040/chars', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).catch();
  const chars= await res.json(); */

  const chars: IChar[] = temp_chars;

  return chars;
}
export async function getSingleCharacter() {}
export async function getAllProfits() {}
export async function getProfitsOfSingleChar() {}

export async function addNewCharacter(
  name: string,
  server: string,
  fraction: string,
  portrait: string | null,
) {
  const res = await fetch('https://cuberun-server.onrender.com/auth/registration', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ name, server, fraction }),
  }).catch();
  return res.ok;
}
export async function addNewEarning() {}
