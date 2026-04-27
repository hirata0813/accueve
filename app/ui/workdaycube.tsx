"use client";

type Props = {
  worked: boolean;
  day: number | undefined;
  color: string;
};

export function WorkDayCube({ worked, day, color }: Props) {
  return (
    <div
      className="w-6 h-6 flex mx-0.5 my-0.5 items-center justify-center text-xs font-bold border rounded-sm"
      style={{
        backgroundColor: worked ? color : "#f0f0f0",
        color: worked ? "white" : "#666666",
        borderColor: worked ? color : "#cccccc"
      }}
    >
      {day}
    </div>
  );
}
