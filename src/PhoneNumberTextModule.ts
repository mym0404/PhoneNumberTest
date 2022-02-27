/*
 * This function is a transformer.
 * @param arg1 previous raw string for phone number
 * @param arg2 changed raw string for phone number
 * @return valid phone number formmated with hyphen pattern e.g.) 010-0000-0000
 * @author you
 * @link https://github.com/reactjs/reactjs.org/issues/3896
 * */
export default function __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(
  arg1: string,
  arg2: string,
): string {
  const getStringLength = (str: string) => str.length;

  let phoneNumberFormatted = '';

  if (getStringLength(arg2) === getStringLength(arg1) + 1) {
    // added

    // no need change
    if (getStringLength(arg2) === 13) {
      phoneNumberFormatted = arg2;
    } else if (getStringLength(arg2) > 13) {
      phoneNumberFormatted = arg1;
    } else if ([1, 2, 5, 6, 7, 10, 11, 12].includes(getStringLength(arg2))) {
      // list 1,2,5,6,7,10,11,12 means no need hyphen appended
      phoneNumberFormatted = arg2;
    } else if ([3, 8].includes(getStringLength(arg2))) {
      // list 3,8 means it needs hyphen appended
      phoneNumberFormatted = arg2 + '-';
    }
  } else if (getStringLength(arg2) === getStringLength(arg1) - 1) {
    // removed
    if (getStringLength(arg2) === 0) {
      phoneNumberFormatted = '';
    } else if ([4, 9].includes(getStringLength(arg1))) {
      phoneNumberFormatted = arg2.substring(0, getStringLength(arg2) - 1);
    } else {
      phoneNumberFormatted = arg2;
    }
  }

  return phoneNumberFormatted;
}
