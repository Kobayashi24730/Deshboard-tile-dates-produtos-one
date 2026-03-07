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
import "../../styles/GraficosStyles.css";

interface Props{
  data: ChartData[];
}

export default function LinearChartComponents({data}: Props){
  return(
    <div className="graficos-grid">
      <div className="div-graficos-one">
        <div className="chart-container">
          <ResponsiveContainer  width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome"/>
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="div-graficos-one">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome"/>
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="div-graficos-one">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome"/>
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
