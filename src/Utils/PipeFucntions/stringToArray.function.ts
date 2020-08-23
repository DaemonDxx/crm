
//Todo Заменить на регулярные выражения
export const ParseArray = (arr: string): string[] => {
  let result = arr.replace('[', '');
  result = result.replace(']', '');
  result = result.replace(/\s+/g,'');
  return result.split(',');
}