import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useCharsStore } from '../../store/store';

import { Cell, Pie, PieChart } from 'recharts';
import { getRandomColor } from '../../utils/colors';

type RoundChartType = {
  startDate: Date;
  endDate: Date;
};

type chartEarningsType = {
  charname: string;
  earnings: number;
};

const RoundChart = memo((props: RoundChartType) => {
  const { startDate, endDate } = props;
  const chars = useCharsStore((store) => store.chars);

  const confrontedProfits = chars.map((ch) => ({
    charname: ch.name,
    earnings: ch.earnings.reduce((acc, er) => {
      const earnDate = new Date(er.date);
      if (earnDate >= startDate && earnDate <= endDate) return acc + er.amount;
      else return acc;
    }, 0),
  }));

  const colors = useMemo(() => {
    const len = chars.length;
    const colorsArr: string[] = [];
    for (let i = 0; i < len; i++) {
      colorsArr.push(getRandomColor());
    }
    return colorsArr;
  }, [chars]);

  return (
    <div>
      <PieChart width={530} height={250}>
        <Pie
          data={confrontedProfits}
          dataKey='earnings'
          nameKey='charname'
          cx='50%'
          cy='50%'
          innerRadius={50}
          outerRadius={80}
          fill='#82ca9d'
          label={(entry) => `${entry.charname}: ${entry.earnings}`}
          isAnimationActive={true}>
          {confrontedProfits.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
});

export default RoundChart;
