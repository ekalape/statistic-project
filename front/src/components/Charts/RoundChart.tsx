import { useEffect, useState } from 'react';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { chartEarningsType } from './ChartsContainer';

type RoundChartType = {
  confrontedProfits: chartEarningsType[];
  colors: string[];
};

const RoundChart = (props: RoundChartType) => {
  const { confrontedProfits, colors } = props;
  const [data, setData] = useState<chartEarningsType[]>(confrontedProfits);

  useEffect(() => {
    setData(confrontedProfits);
    console.log('roundChar', data);
  }, [confrontedProfits]);

  return (
    <ResponsiveContainer minWidth={46} aspect={2}>
      <PieChart>
        <Pie
          data={data}
          dataKey='earnings'
          nameKey='charname'
          cx='50%'
          cy='50%'
          innerRadius={30}
          outerRadius={70}
          label={(entry) => `${entry.charname}: ${entry.earnings}`}
          isAnimationActive={true}>
          {confrontedProfits.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RoundChart;
