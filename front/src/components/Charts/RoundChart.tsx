import { useEffect, useMemo, useState } from 'react';
import { useCharsStore } from '../../store/store';
import { IEarning } from '../../utils/interfaces';
import { getAllProfits } from '../../store/apiCalls';

type RoundChartType = {
  startDate: Date;
  endDate: Date;
};

function RoundChart(props: RoundChartType) {
  const { startDate, endDate } = props;
  const chars = useCharsStore((store) => store.chars);
  const [profits, setProfits] = useState<IEarning[] | null>(null);
  const confrontedProfits = useMemo(() => {
    const earnings = chars.map((ch) => ({ name: ch.name, earning: ch.earnings }));
  }, [chars]);

  useEffect(() => {
    getAllProfits(startDate, endDate, []).then((data: IEarning[]) => {
      const earnings = data.map((pr: IEarning) => ({
        charname: pr.char?.name,
        profits: pr.amount,
      }));

      setProfits(data);
    });
  }, []);

  return <div>RoundChart</div>;
}

export default RoundChart;
