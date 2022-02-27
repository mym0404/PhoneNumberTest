/*
 * This function is a transformer.
 * @param arg1 previous raw string for phone number
 * @param arg2 changed raw string for phone number
 * @return valid phone number formmated with hyphen pattern e.g.) 010-0000-0000
 * @author you
 * */
export default function _______EDIT_________THIS_______ONLY__________(
  arg1: string,
  arg2: string,
): string {
  if (arg2.length === arg1.length + 1) {
    // added

    // no need change
    if (arg2.length === 13) {
      return arg2;
    }

    // upper length
    if (arg2.length > 13) {
      return arg1;
    }

    // list 1,2,5,6,7,10,11,12 means no need hyphen appended
    if ([1, 2, 5, 6, 7, 10, 11, 12].includes(arg2.length)) {
      return arg2;
    }
    // list 3,8 means it needs hyphen appended
    if ([3, 8].includes(arg2.length)) {
      return arg2 + '-';
    }
  } else if (arg2.length === arg1.length - 1) {
    // removed
    if (arg2.length === 0) {
      return '';
    }

    if ([4, 9].includes(arg1.length)) {
      return arg2.substring(0, arg2.length - 1);
    }

    return arg2;
  }

  return '';
}
