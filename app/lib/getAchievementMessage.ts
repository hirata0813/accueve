export function getAchievementMessage(totalHours: number): { title: string; message: string; } {
  let title:string;
  let message:string;

  if (totalHours < 30) {
      title = "🌱 種まき期間";
      message =
        "今は成果よりも習慣を作る時期です．毎日30分でいいので，続けることを目標にしましょう．";
  } else if (totalHours < 60) {
      title = "📈 成長の準備期間";
      message =
        "力は付いていますが，まだ目に見える変化は少ないです．モチベに左右されず，規律として取り組みましょう．";
  } else if (totalHours < 80) {
      title = "🏔️ 失望の谷";
      message =
        "失望の谷では，期待と実際のギャップが最も大きくなります．ここでやるかやらないかが，後々大きな違いを生みます．";
  } else if (totalHours < 100) {
      title = "🚀 飛躍直前";
      message =
        "積み重ねた努力が成果として現れ始める段階です．もう少しで大きな成長を実感できるでしょう．";
  } else {
      title = "✨ 成長の表面化";
      message =
        "継続によって確かな実力が身についています．ここまでよく頑張りました！";
  }
  return {title, message};
}
