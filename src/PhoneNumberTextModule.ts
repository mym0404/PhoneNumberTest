/*
 * This function is a transformer. Receive prev string to cur string
 * @param prev previous raw string for phone number
 * @param cur changed raw string for phone number
 * @return valid phone number formmated with hyphen pattern e.g.) 010-0000-0000
 * @author you
 * */
export default function _______EDIT_________THIS_______ONLY__________(
  prev: string,
  cur: string,
): string {
  if (cur.length === prev.length + 1) {
    // added

    // no need change
    if (cur.length === 13) {
      return cur;
    }

    // upper length
    if (cur.length > 13) {
      return prev;
    }

    // list 1,2,5,6,7,10,11,12 means no need hyphen appended
    if ([1, 2, 5, 6, 7, 10, 11, 12].includes(cur.length)) {
      return cur;
    }
    // list 3,8 means it needs hyphen appended
    if ([3, 8].includes(cur.length)) {
      return cur + '-';
    }
  } else if (cur.length === prev.length - 1) {
    // removed
    if (cur.length === 0) {
      return '';
    }

    if ([4, 9].includes(prev.length)) {
      return cur.substring(0, cur.length - 1);
    }

    return cur;
  }

  return '';
}
