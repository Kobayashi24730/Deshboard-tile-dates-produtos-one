import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { ChartData } from "../../types/chartTypes.ts";

interface Props{
  data: ChartData[];
}

export default function LinearChartComponents({data}: Props){
  return(
    <ResponsiveContainer with="100%" heigth={300}>
      <linearChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8"/>
      </linearChart>
    </ResponsiveContainer>
  );
}
