export const ParseDate = (str: string): number => {
  const temp = new Date(str);
  return temp.setHours(temp.getHours()+12);
}