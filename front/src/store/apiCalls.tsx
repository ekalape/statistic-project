import { temp_chars } from '../assets/temp_chars';
import { IChar, IEarning } from '../utils/interfaces';

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
export async function getAllProfits(startDate: Date, endDate: Date, chars: IChar[]) {
  const ids = chars.map((ch) => ch.id);

  const res = await fetch('localhost:4040/stats', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).catch();
  const allEarnings: IEarning[] = await res.json();
  const earningsInTime = allEarnings.filter((pr) => {
    const date = new Date(`${pr.year}-${pr.month}-${pr.day}`);
    return date >= startDate && date <= endDate && ids.includes(pr.belongTo);
  });
  return earningsInTime;
}
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
