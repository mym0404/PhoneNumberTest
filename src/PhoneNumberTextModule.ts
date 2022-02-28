export default function formatPhoneNumber(
  previous: string,
  current: string,
): string {
  if (!isValidArguments(previous, current) || noChange(previous, current)) {
    return previous;
  }

  if (shouldLastNumberBePopped()) {
    current = popBack(current);
  }

  return format(current);

  function shouldLastNumberBePopped() {
    return isPopped() && current.length > 0 && getBack(previous) === '-';
  }

  function isPopped() {
    return isPrefixOf(current, previous);
  }
}

function isValidArguments(previous: any, current: any): boolean {
  if (
    isNotString(previous) ||
    isNotString(current) ||
    overMaxLength(previous) ||
    overMaxLength(current) ||
    includesInvalidCharacters(previous) ||
    includesInvalidCharacters(current)
  ) {
    return false;
  }
  return true;

  function isNotString(str: any): boolean {
    const ret = typeof str;
    return ret !== 'string';
  }

  function overMaxLength(str: string): boolean {
    return str.length > 13;
  }

  function includesInvalidCharacters(str: string) {
    const compare = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'];
    for (let i = 0; i < str.length; i++) {
      if (!compare.includes(str.charAt(i))) {
        return true;
      }
    }
    return false;
  }
}

function noChange(previous: string, current: string): boolean {
  return previous === current;
}

function format(str: string): string {
  return insertHyphen(eraseHyphen(str));
  function eraseHyphen(str: string): string {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) !== '-') {
        result += str.charAt(i);
      }
    }
    return result;
  }

  function insertHyphen(str: string): string {
    const hyphenPos = [2, 6];
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += str.charAt(i);
      if (hyphenPos.includes(i)) {
        result += '-';
      }
    }
    return result;
  }
}

function isPrefixOf(check: string, source: string): boolean {
  if (check.length > source.length) {
    return false;
  }
  for (let i = 0; i < check.length; i++) {
    if (check.charAt(i) !== source.charAt(i)) {
      return false;
    }
  }
  return true;
}

function getBack(str: string) {
  return str.charAt(str.length - 1);
}

function popBack(str: string): string {
  if (str.length > 0) {
    return str.slice(0, str.length - 1);
  } else {
    throw new Error("can't pop back string");
  }
}
