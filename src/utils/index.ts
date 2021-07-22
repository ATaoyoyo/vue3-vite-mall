export const getLocal = (name: string): string => {
  return localStorage.getItem(name) as string
}

export const setLocal = (name: string, value: string) => {
  localStorage.setItem(name, value)
}
