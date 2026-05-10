"use client";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useRef } from "react";

type Props = {
  records: Array<{
    date: Date;
    hours: number | null;
  }>;
};

type CumulativeData = {
  date: string;
  hours: number;
  cumulative: number;
};

const BAR_PX = 60;
const VISIBLE_BARS = 10;
const Y_AXIS_W = 80;
const CHART_H = 360;

export function BarChart({ records }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const getAllCumulativeData = () => {
    const sortedRecords = [...records].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const cumulativeData: CumulativeData[] = [];
    let cumulativeHours = 0;

    sortedRecords.forEach((record) => {
      const hours = record.hours || 0;
      cumulativeHours += hours;
      cumulativeData.push({
        date: new Date(record.date).toLocaleDateString("ja-JP", {
          month: "numeric",
          day: "numeric",
        }),
        hours,
        cumulative: cumulativeHours,
      });
    });

    return cumulativeData;
  };

  const data = getAllCumulativeData();
  const chartWidth = Math.max(data.length, VISIBLE_BARS) * BAR_PX;
  const yMax = Math.max(...data.map((d) => Math.max(d.hours, d.cumulative)));

  return (
    <div className="w-full flex flex-col border items-center p-2">
      <h2 className="text-2xl font-bold">これまでの累計取り組み時間</h2>

      {/* Legend を外に固定 */}
      <div className="flex items-center gap-6 mb-2 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-blue-500" />
          当日取り組み時間
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-emerald-500" />
          累計時間
        </span>
      </div>

      <div className="relative w-full overflow-hidden" style={{ height: CHART_H }}>

        {/* Y軸固定レイヤー: ダミーBarを追加してtickを描画させる */}
        <div
          className="absolute top-0 left-0 z-10 bg-white"
          style={{ width: Y_AXIS_W, height: CHART_H }}
        >
          <RechartsBarChart
            width={Y_AXIS_W}
            height={CHART_H}
            data={data}
            margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
          >
            {/* tickを描画させるためにダミーBarが必要 */}
            <Bar dataKey="hours" fill="transparent" />
            <YAxis
              domain={[0, yMax]}
              label={{
                value: "時間（h）",
                angle: -90,
                position: "insideLeft",
                offset: 20,
              }}
            />
          </RechartsBarChart>
        </div>

        {/* バーエリア */}
        <div
          ref={scrollerRef}
          className="absolute top-0 right-0 overflow-x-auto overflow-y-hidden"
          style={{ left: Y_AXIS_W, height: CHART_H }}
        >
          <RechartsBarChart
            width={chartWidth}
            height={CHART_H}
            data={data}
            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={50} // ラベルの描画領域のみ。margin.bottomと合わせて余白を制御
            />
            <YAxis hide domain={[0, yMax]} />
            <Tooltip
              formatter={(value) => `${value}h`}
              labelFormatter={(label) => `日付: ${label}`}
            />
            <Bar
              dataKey="hours"
              fill="#3b82f6"
              name="当日取り組み時間"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="cumulative"
              fill="#10b981"
              name="累計時間"
              radius={[8, 8, 0, 0]}
            />
          </RechartsBarChart>
        </div>
      </div>
    </div>
  );
}
