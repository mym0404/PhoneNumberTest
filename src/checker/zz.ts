const candidates = ['-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const needNumIdx = [0, 1, 2, 4, 5, 6, 7, 9, 10, 11, 12];
// 010-1234-1234
export const ERROR_NOT_STRING = 'NOT STRING ☠️';
export const ERROR_TOO_LONG = 'TOO LONG ☠️';
export const ERROR_INVALID_CHAR = 'INVALID CHAR ☠️';
export const ERROR_NUM_POS_INVALID = 'NUM POS NOT MATCHED ☠️';
export const ERROR_HYPHEN_POS_INVALID = '- POS NOT MATCHED ☠️';
export const ERROR_UNKNOWN = 'UNKNOWN ☠️';
export const ERROR_LIST = [
  ERROR_NOT_STRING,
  ERROR_TOO_LONG,
  ERROR_INVALID_CHAR,
  ERROR_NUM_POS_INVALID,
  ERROR_HYPHEN_POS_INVALID,
  ERROR_UNKNOWN,
];
function isValidPhoneNumber(zz: any) {
  if (typeof zz !== 'string') {
    throw new Error(ERROR_NOT_STRING);
  }
  if (zz.length > 13) {
    throw new Error(ERROR_TOO_LONG);
  }
  const arr: string[] = [];
  for (let i = 0; i < zz.length; i++) {
    arr.push(zz.charAt(i));
  }
  if (arr.some(num => !candidates.includes(num))) {
    throw new Error(ERROR_INVALID_CHAR);
  }
  for (let i = 0; i < 13; i++) {
    if (zz.length > i) {
      if (needNumIdx.includes(i)) {
        if (!candidates.slice(1).includes(arr[i])) {
          throw new Error(ERROR_NUM_POS_INVALID);
        }
      } else {
        if (arr[i] !== '-') {
          throw new Error(ERROR_HYPHEN_POS_INVALID);
        }
      }
    }
  }
  // all pass!
}
export function black_box_curry(
  fn: (prev: string, cur: string) => string,
): (prev: string, cur: string) => string {
  return (prev: string, cur: string) => {
    let result;
    try {
      result = fn(prev, cur);
    } catch (e) {
      return ERROR_UNKNOWN;
    }

    try {
      isValidPhoneNumber(result);
    } catch (e: any) {
      return e.message;
    }
    return result;
  };
}
