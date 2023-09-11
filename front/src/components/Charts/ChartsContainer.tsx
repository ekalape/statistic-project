import { useEffect, useMemo, useState } from 'react';
import { LineCharsForChar, RoundChart } from '.';
import { EarningType, IChar } from '../../utils/interfaces';
import { useCharsStore } from '../../store/store';

import { flatMap, groupBy, map as lodashMap, range, sumBy } from 'lodash';
import { getRandomColor } from '../../utils/colors';
import { getAllCharacters } from '../../store/apiCalls';

type ChartPropsType = {
  startDate: Date;
  endDate: Date;
};
export type LineChartType = {
  charname: string;
  earnings: EarningType[];
};
export type chartEarningsType = {
  charname: string;
  earnings: number;
};

const ChartsContainer = (props: ChartPropsType) => {
  const { startDate, endDate } = props;
  const chars = useCharsStore((store) => store.chars);
  const selChars = useCharsStore((store) => store.selectedChars);
  const [fullProfits, setFullProfits] = useState<chartEarningsType[]>(
    getProfits(chars, startDate, endDate),
  );
  const [profitsByChars, setProfitsByChars] = useState(
    getProfitsByChar(selChars, startDate, endDate),
  );

  const [loadedRound, setLoadedRound] = useState(false);
  const [loadedLine, setLoadedLine] = useState(false);

  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    getAllCharacters()
      .then((chars) => {
        setFullProfits(getProfits(chars, startDate, endDate));
      })
      .then(() => {
        setLoadedRound(true);
      });

    setDates(generateDates(startDate, endDate));
  }, [startDate, endDate]);

  useEffect(() => {
    getAllCharacters()
      .then((chars) => {
        setProfitsByChars([
          ...getProfitsByChar(selChars, startDate, endDate),
          getFullProfitsByDate(chars, startDate, endDate),
        ]);
      })
      .then(() => setLoadedLine(true));
  }, [selChars, startDate, endDate]);

  useEffect(() => {
    if (fullProfits === null || fullProfits.length === 0) setLoadedRound(false);
    else setLoadedRound(true);
  }, [fullProfits]);

  useEffect(() => {
    if (profitsByChars === null) setLoadedLine(false);
    else setLoadedLine(true);
  }, [profitsByChars]);

  const colors = useMemo(() => {
    const len = chars.length;
    const colorsArr: string[] = [];
    for (let i = 0; i < len; i++) {
      colorsArr.push(getRandomColor());
    }
    return colorsArr;
  }, [chars.length]);

  return (
    <div className={`d-flex flex-column flex-md-row w-100`}>
      {loadedLine && profitsByChars && (
        <LineCharsForChar confrontedProfits={profitsByChars} colors={colors} dates={dates} />
      )}{' '}
      {loadedRound && fullProfits && <RoundChart confrontedProfits={fullProfits} colors={colors} />}
    </div>
  );
};

const generateDates = (start: Date, end: Date) => {
  return range(
    start.getTime(),
    end.getTime() + 24 * 60 * 60 * 1000, // Add 1 day to include the end date
    24 * 60 * 60 * 1000, // 1 day in milliseconds
  ).map((timestamp) => new Date(timestamp).toISOString().slice(0, 10));
};

const getProfits = (chars: IChar[], startDate: Date, endDate: Date) => {
  const profits = chars.map((ch) => ({
    charname: ch.name,
    earnings: ch.earnings.reduce((acc, er) => {
      const earnDate = new Date(er.date);
      if (earnDate >= startDate && earnDate <= endDate) return acc + er.amount;
      else return acc;
    }, 0),
  }));
  return profits;
};

const getProfitsByChar = (selchars: IChar[], startDate: Date, endDate: Date) => {
  const profits = selchars.map((ch) => ({
    charname: ch.name,
    earnings: ch.earnings.filter((earn) => {
      const earnDate = new Date(earn.date);
      if (earnDate >= startDate && earnDate <= endDate) return earn;
    }),
  }));
  return profits;
};

const getFullProfitsByDate = (chars: IChar[], startDate: Date, endDate: Date) => {
  const allPr = getProfitsByChar(chars, startDate, endDate);

  const groupedByDate = groupBy(flatMap(allPr, 'earnings'), 'date');

  const transformedData = {
    charname: 'ALL',
    earnings: lodashMap(groupedByDate, (earnings, date) => ({
      date,
      amount: sumBy(earnings, 'amount'),
    })),
  };
  console.log('gggdgdhd ', transformedData);
  return transformedData;
};

export default ChartsContainer;

/* 
{
  date:string;
  profits:{
    charname:string,
    amount:number
  }[]
}
*/
