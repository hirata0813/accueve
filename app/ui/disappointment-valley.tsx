"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceDot,
  Label,
} from "recharts";

type Props = {
  totalHours: number; // 累計取り組み時間
};

// 成長曲線の描画で利用するデータを生成
const generateGrowthCurveData = () => {
  const points = [];
  for (let t = 0; t <= 110; t += 1) {
    const expected = t; // 期待している進歩は線形
    const base = 40;
    const actual = (Math.pow(base, t / 100) - 1) / (base - 1) * 100; // 実際の進捗は指数関数(f(x) = (a^(x/100) - 1) / (a - 1) * 100)
    points.push({
      t,
      expected: Math.max(0, expected),
      actual: Math.max(0, actual),
    });
  }
  return points;
};

const graphData = generateGrowthCurveData();

// 失望の谷ポイント(期待と実際の差が最大の点)を計算
const disappointmentvalleyPoint = graphData.reduce((max, d) => {
  const gap = d.expected - d.actual;
  return gap > (max.expected - max.actual) ? d : max;
}, graphData[0]);

export function DisappointmentValley({ totalHours }: Props) {
  // totalHours を t として各曲線上の値を取得
  const t = Math.min(Math.max(Math.round(totalHours), 0), 110);
  const markerPoint = graphData.find((d) => d.t === t) ?? graphData[0]; // グラフ上のマーカ位置

  return (
    <div className="flex flex-col border rounded-sm bg-white px-2 pt-2">
      <h2 className="text-2xl font-bold">成長曲線</h2>
      <div style={{ height: 335, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={graphData}
            margin={{ top: 20, right: 60, left: 36, bottom: 20 }}
          >
            <XAxis
              dataKey="t"
              type="number"
              domain={[0, 100]}
              axisLine={{ stroke: "#374151", strokeWidth: 1.5 }}
              tick={false}
              tickLine={false}
            >
              <Label value="累計取り組み時間" position="insideBottomRight" offset={14} fontSize={14} fill="#374151" />
            </XAxis>
            <YAxis
              domain={[0, 110]}
              axisLine={{ stroke: "#374151", strokeWidth: 1.5 }}
              tick={false}
              tickLine={false}
            >
              <Label value="進捗" position="insideTopRight" offset={5} fontSize={14} fill="#374151" />
            </YAxis>

            {/* 期待している進歩（青・線形） */}
            <Line
              dataKey="expected"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={false}
              isAnimationActive={true}
            />

            {/* 実際の進捗（赤・指数関数） */}
            <Line
              dataKey="actual"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              activeDot={false}
              isAnimationActive={true}
            />

            {/* 失望の谷マーカー */}
            <ReferenceDot
              x={disappointmentvalleyPoint.t}
              y={(disappointmentvalleyPoint.expected + disappointmentvalleyPoint.actual) / 2}
              r={5}
              fill="#1f2937"
              stroke="none"
            />

            {/* 失望の谷ラベル専用 */}
            <ReferenceDot
              x={disappointmentvalleyPoint.t}
              y={(disappointmentvalleyPoint.expected + disappointmentvalleyPoint.actual) / 2}
              r={0}
              label={({ viewBox }) => {
                const { x, y } = viewBox;
                return (
                  <g>
                    <text x={x + 10} y={y} fontSize={10} fill="#374151" fontWeight="bold">失望の谷</text>
                  </g>
                );
              }}
            />

            {/* 実際の進捗ラベル専用 */}
            <ReferenceDot
              x={disappointmentvalleyPoint.t}
              y={disappointmentvalleyPoint.actual}
              r={0}
              label={({ viewBox }) => {
                const { x, y } = viewBox;
                return (
                  <g>
                    <text x={x + 60} y={y - 10} fontSize={10} fill="#ef4444" fontWeight="bold">実際の進捗</text>
                  </g>
                );
              }}
            />

            {/* 期待している進歩ラベル専用 */}
            <ReferenceDot
              x={disappointmentvalleyPoint.t}
              y={disappointmentvalleyPoint.expected}
              r={0}
              label={({ viewBox }) => {
                const { x, y } = viewBox;
                return (
                  <g>
                    <text x={x - 70} y={y - 8} fontSize={10} fill="#3b82f6" fontWeight="bold">期待している進歩</text>
                  </g>
                );
              }}
            />

            {/* 現在地マーカー: 期待曲線上 */}
            <ReferenceDot
              x={markerPoint.t}
              y={markerPoint.expected}
              r={6}
              fill="#3b82f6"
              stroke="white"
              strokeWidth={2}
            />

            {/* 現在地マーカー: 実際の進捗曲線上 */}
            <ReferenceDot
              x={markerPoint.t}
              y={markerPoint.actual}
              r={6}
              fill="#ef4444"
              stroke="white"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 bg-gray-50 rounded text-sm text-gray-600">
        <p>テキスト領域</p>
        <p>テキスト領域</p>
      </div>
    </div>
  );
}
