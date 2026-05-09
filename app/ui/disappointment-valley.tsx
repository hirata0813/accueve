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

// 期待: 線形 / 実際: 指数関数的成長（序盤ほぼ0、後半急上昇）
const generateData = () => {
  const points = [];
  for (let t = 0; t <= 110; t += 1) {
    const expected = t;
    // 指数関数: e^(kt) を正規化して0-100スケールに
    const k = 0.055;
    const actual = (Math.exp(k * t) - 1) / (Math.exp(k * 100) - 1) * 100;
    points.push({
      t,
      expected: Math.max(0, expected),
      actual: Math.max(0, actual),
    });
  }
  return points;
};

const data = generateData();

// 失望の谷: 差が最大になる点
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
console.log("data", data);

export function DisappointmentValley() {
  return (
    <div className="h-70 flex flex-col mx-0.5 my-0.5 border rounded-sm bg-white px-2 pt-3 pb-1">
      <div className="flex-1">
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
              <Label value="時間" position="insideBottomRight" offset={-4} fontSize={11} fill="#374151" />
            </XAxis>
            <YAxis
              domain={[0, 110]}
              axisLine={{ stroke: "#374151", strokeWidth: 1.5 }}
              tick={false}
              tickLine={false}
            >
              <Label value="結果" position="insideTopLeft" offset={-4} fontSize={11} fill="#374151" />
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
              label={
                (({ viewBox }: any) =>
                  viewBox?.x > 0 ? (
                    <text
                      x={viewBox.x - 70}
                      y={viewBox.y - 6}
                      fontSize={10}
                      fill="#3b82f6"
                      fontWeight="bold"
                    >
                      期待している進歩
                    </text>
                  ) : null) as any
              }
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

            {/* 失望の谷ラベル＋実際の進捗ラベル */}
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
                    <line x1={x} y1={y} x2={x + 18} y2={y + 36}
                      stroke="#374151" strokeWidth={1} strokeDasharray="3 3" />
                    <text x={x + 20} y={y + 46} fontSize={10} fill="#374151" fontWeight="bold">
                      失望の谷
                    </text>
                    <text x={x + 60} y={y - 30} fontSize={10} fill="#ef4444" fontWeight="bold">
                      実際の進捗
                    </text>
                    <line x1={x + 58} y1={y - 24} x2={x + 40} y2={y - 10}
                      stroke="#ef4444" strokeWidth={1} strokeDasharray="3 3" />
                  </g>
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
