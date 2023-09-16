import { formatDate } from '../utils/formatDate';
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
  const res = await fetch(baseURL + 'stats', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).catch();
  const allEarnings: IEarning[] = await res.json();
  let earningsInTime = allEarnings.filter((pr) => {
    const date = new Date(pr.date);
    return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime();
  });

  if (chars.length > 0) {
    const ids = chars.map((ch) => ch.id);
    earningsInTime = earningsInTime.filter((pr) => {
      return ids.includes(pr.belongTo);
    });
  }
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
    if (err instanceof Error) console.log('add error', err.message);
    return false;
  }
}

export async function updateCharacter(
  id: string,
  name: string,
  server: string,
  fraction: string,
  portrait: string | null,
) {
  try {
    const res = await fetch(baseURL + 'chars/' + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, server, fraction, portrait }),
    });
    return res.ok;
  } catch (err) {
    if (err instanceof Error) {
      console.log('update error', err.message);
    }
    return false;
  }
}

export async function addNewEarning(charId: string, date: Date, amount: number) {
  console.log('date inside apicall -> ', date);
  try {
    const res = await fetch(baseURL + 'stats', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        date: formatDate(date),
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
