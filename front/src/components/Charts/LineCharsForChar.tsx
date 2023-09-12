import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { LineChartType } from './ChartsContainer';

type LineChartPropsType = {
  confrontedProfits: LineChartType[];
  colors: string[];
  dates: string[];
};

function LineCharsForChar(props: LineChartPropsType) {
  const { confrontedProfits, colors, dates } = props;
  const [data, setData] = useState<LineChartType[]>();

  useEffect(() => {
    const combinedData = confrontedProfits.map((s) => ({
      charname: s.charname,
      earnings: dates.map((date) => ({
        date,
        amount: s.earnings.find((earning) => earning.date === date)?.amount || 0,
      })),
    }));
    setData(combinedData);
  }, [confrontedProfits]);
  return (
    <ResponsiveContainer minWidth={44} aspect={2}>
      <AreaChart>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' type='category' allowDuplicatedCategory={false} />
        <YAxis dataKey='amount' />
        <Legend />
        {data?.map((s, idx) => (
          <Area
            type='monotone'
            dataKey='amount'
            data={s.earnings}
            name={s.charname}
            key={s.charname}
            stroke={colors[idx]}
            strokeWidth={2}
            fill={colors[idx]}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default LineCharsForChar;
