import React, { useRef, useMemo } from 'react';
import styled from 'styled-components';
import { LineChart, Line, Tooltip } from 'recharts';

const LineChartContainer = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--border-color);
`;

interface LineGraphInterface {
  data: { x: any; [y: string]: number }[];
  yKeys: { name: string; color: string }[];
  width: number;
  height: number;
}

export const LineGraph: React.FC<LineGraphInterface> = ({ data, yKeys }: LineGraphInterface) => {
  const ref = useRef<HTMLDivElement>(null);
  const [fullWidth, fullHeight]: [number, number] = useMemo(() => {
    if (ref && ref.current) {
      const { clientWidth, clientHeight } = ref.current;
      return [clientWidth, clientHeight];
    }
    return [550, 200];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return (
    <LineChartContainer ref={ref}>
      <LineChart
        width={fullWidth}
        height={fullHeight}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5
        }}
      >
        {/* <XAxis dataKey="name" /> */}
        {/* <XAxis dataKey="name" /> */}
        {/* <YAxis /> */}
        <Tooltip />
        {yKeys.map(key => (
          <Line type="monotone" key={key.name} dataKey={key.name} stroke={key.color} />
        ))}
      </LineChart>
    </LineChartContainer>
  );
};
