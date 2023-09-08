import { temp_chars } from '../assets/temp_chars';
import { IChar, IEarning } from '../utils/interfaces';

const baseURL = 'http://localhost:4040/';

export async function getAllCharacters() {
  try {
    const res = await fetch(baseURL + 'chars', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }).catch();
    const chars = await res.json();
    return chars;
  } catch (err) {
    console.log('error', err);
    return [];
  }
}

export async function getAllProfits(startDate: Date, endDate: Date, chars: IChar[]) {
  const ids = chars.map((ch) => ch.id);

  const res = await fetch(baseURL + 'stats', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).catch();
  const allEarnings: IEarning[] = await res.json();
  const earningsInTime = allEarnings
    .filter((pr) => {
      return ids.includes(pr.belongTo);
    })
    .filter((pr) => {
      const date = new Date(`${pr.year}-${pr.month}-${pr.day}`);
      return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime();
    });
  return earningsInTime;
}

export async function addNewCharacter(
  name: string,
  server: string,
  fraction: string,
  portrait: string | null,
) {
  try {
    const res = await fetch(baseURL + 'chars', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, server, fraction, portrait }),
    });
    return res.ok;
  } catch (err) {
    console.log('err', err);
    return false;
  }
}

export async function addNewEarning(charId: string, day: Date, amount: number) {
  try {
    const dateArr = [day.getDate(), day.getMonth() + 1, day.getFullYear()];
    const res = await fetch(baseURL + 'stats', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        dayData: { day: +dateArr[0], month: +dateArr[1], year: +dateArr[2] },
        amount,
        belongTo: charId,
      }),
    });
    return res.ok;
  } catch (err) {
    console.log('err', err);
    return false;
  }
}

export async function getOneCharacter(charId: string) {
  try {
    const res = await fetch(baseURL + 'chars/' + charId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const char = await res.json();

    return char;
  } catch (err) {
    console.log('err', err);
    return {};
  }
}
