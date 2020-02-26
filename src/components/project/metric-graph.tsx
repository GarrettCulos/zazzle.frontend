import React, { useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LineGraphInterface {
  data: { x: any; [y: string]: number }[];
  yKeys: { name: string; color: string }[];
  width: number;
  height: number;
}

export const LineGraph: React.FC<LineGraphInterface> = ({ data, width, height, yKeys }: LineGraphInterface) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <LineChart
        width={width}
        height={height}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        <Tooltip />
        {/* <Legend /> */}
        {yKeys.map(key => (
          <Line type="monotone" key={key.name} dataKey={key.name} stroke={key.color} />
        ))}
      </LineChart>
    </div>
  );
};
