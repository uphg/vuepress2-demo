// 获取分页间隔
export function getIntervallers(max: number, interval: number = 10) {
  const count =
    max % interval === 0
      ? Math.floor(max / interval)
      : Math.floor(max / interval) + 1;
  const arr = [...new Array(count)];
  return arr.map((_, index) => {
    const start = index * interval;
    const end = (index + 1) * interval - 1;
    return [start, end > max ? max : end];
  });
}