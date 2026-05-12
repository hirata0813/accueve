// boolean 型配列を受け取って，その中で連続して true が続いている最大の数を返す
export function calcMaxStreak(pastWork: boolean[]): number {
  let max = 0, current = 0;
  for (const worked of pastWork) {
    current = worked ? current + 1 : 0;
    max = Math.max(max, current);
  }
  return max;
}
