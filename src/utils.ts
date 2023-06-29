export function arrToMap<T = any>(key: string, arr: T[]): Record<string, T> {
  const map: Record<string, T> = {}
  arr.forEach((data: any) => {
    map[data[key]] = data
  })
  return map
}
