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

const generateData = () => {
  const points = [];
  for (let t = 0; t <= 110; t += 1) {
    const expected = t;
    //const k = 0.055;
    //const actual = (Math.exp(k * t) - 1) / (Math.exp(k * 100) - 1) * 100;
    const base = 40;
    const actual = (Math.pow(base, t / 100) - 1) / (base - 1) * 100;
    points.push({
      t,
      expected: Math.max(0, expected),
      actual: Math.max(0, actual),
    });
  }
  return points;
};

const data = generateData();

const valleyPoint = data.reduce((max, d) => {
  const gap = d.expected - d.actual;
  return gap > (max.expected - max.actual) ? d : max;
}, data[0]);

const ArrowDot = ({ cx, cy, index, dataLength, color }: any) => {
  if (index !== dataLength - 1) return null;
  return (
    <polygon
      points={`${cx},${cy - 8} ${cx - 5},${cy + 2} ${cx + 5},${cy + 2}`}
      fill={color}
      transform={`rotate(40, ${cx}, ${cy})`}
    />
  );
};

export function DisappointmentValley({ totalHours }: Props) {
  // totalHours を t として各曲線上の値を取得
  const t = Math.min(Math.max(Math.round(totalHours), 0), 110);
  const markerPoint = data.find((d) => d.t === t) ?? data[0];

  return (
    <div className="flex flex-col mx-0.5 my-0.5 border rounded-sm bg-white px-2 pt-3">
      <h2 className="text-2xl font-bold mb-4">成長曲線</h2>
      <div style={{ height: 335, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
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
              <Label value="累計取り組み時間" position="insideBottomRight" offset={-4} fontSize={11} fill="#374151" />
            </XAxis>
            <YAxis
              domain={[0, 110]}
              axisLine={{ stroke: "#374151", strokeWidth: 1.5 }}
              tick={false}
              tickLine={false}
            >
              <Label value="進捗" position="insideTopLeft" offset={-4} fontSize={11} fill="#374151" />
            </YAxis>

            {/* 期待している進歩（青・線形） */}
            <Line
              dataKey="expected"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={(props: any) => (
                <ArrowDot {...props} dataLength={data.length} color="#3b82f6" />
              )}
              activeDot={false}
              isAnimationActive={true}
            />

            {/* 実際の進捗（赤・指数関数） */}
            <Line
              dataKey="actual"
              stroke="#ef4444"
              strokeWidth={2}
              dot={(props: any) => (
                <ArrowDot {...props} dataLength={data.length} color="#ef4444" />
              )}
              activeDot={false}
              isAnimationActive={true}
            />

            {/* 失望の谷マーカー */}
            <ReferenceDot
              x={valleyPoint.t}
              y={(valleyPoint.expected + valleyPoint.actual) / 2}
              r={5}
              fill="#1f2937"
              stroke="none"
            />

            {/* 失望の谷ラベル＋各曲線ラベル（1回だけSVGで描画） */}
            <ReferenceDot
              x={valleyPoint.t}
              y={(valleyPoint.expected + valleyPoint.actual) / 2}
              r={0}
              fill="none"
              stroke="none"
              label={({ viewBox }: any) => {
                if (!viewBox) return null;
                const { x, y } = viewBox;
                return (
                  <g>
                    {/* 失望の谷ラベル */}
                    <line x1={x} y1={y} x2={x + 18} y2={y + 36}
                      stroke="#374151" strokeWidth={1} strokeDasharray="3 3" />
                    <text x={x + 20} y={y + 46} fontSize={10} fill="#374151" fontWeight="bold">
                      失望の谷
                    </text>
                    {/* 実際の進捗ラベル */}
                    <text x={x + 60} y={y - 30} fontSize={10} fill="#ef4444" fontWeight="bold">
                      実際の進捗
                    </text>
                    <line x1={x + 58} y1={y - 24} x2={x + 40} y2={y - 10}
                      stroke="#ef4444" strokeWidth={1} strokeDasharray="3 3" />
                    {/* 期待している進歩ラベル（青線の中間あたりに固定） */}
                    <text x={x - 60} y={y - 40} fontSize={10} fill="#3b82f6" fontWeight="bold">
                      期待している進歩
                    </text>
                    <line x1={x - 30} y1={y - 36} x2={x - 10} y2={y - 20}
                      stroke="#3b82f6" strokeWidth={1} strokeDasharray="3 3" />
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
              label={({ viewBox }: any) => {
                if (!viewBox) return null;
                const { x, y } = viewBox;
                return (
                  <g>
                    <text x={x + 8} y={y - 6} fontSize={9} fill="#3b82f6" fontWeight="bold">
                    </text>
                  </g>
                );
              }}
            />

            {/* 現在地マーカー: 実際の進捗曲線上 */}
            <ReferenceDot
              x={markerPoint.t}
              y={markerPoint.actual}
              r={6}
              fill="#ef4444"
              stroke="white"
              strokeWidth={2}
              label={({ viewBox }: any) => {
                if (!viewBox) return null;
                const { x, y } = viewBox;
                return (
                  <g>
                    <text x={x + 8} y={y - 6} fontSize={9} fill="#ef4444" fontWeight="bold">
                    </text>
                  </g>
                );
              }}
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
