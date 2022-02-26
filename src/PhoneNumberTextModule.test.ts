import {ERROR_LIST, black_box_curry as _black_box_curry} from './checker/zz';
import {PhoneNumberTextReplacer} from './PhoneNumberTextModule';

const __black_box_curry = _black_box_curry(PhoneNumberTextReplacer);

type TestCase = [prev: string, cur: string, expectation: string];

function runFunction(prev: string, cur: string) {
  return __black_box_curry(prev, cur);
}

function expectWithTestCases(testCases: TestCase[]) {
  testCases.forEach(expectResultOk);
  expectAssertionCallCount(testCases.length);

  function expectResultOk([prev, cur, expectation]: TestCase) {
    expect(runFunction(prev, cur)).toBe(expectation);
  }

  function expectAssertionCallCount(length: number) {
    expect.assertions(length);
  }
}

describe('CASE 1. ADD', () => {
  it('TEST 1 - ADD WITHOUT HYPHEN', () => {
    const testCases: TestCase[] = [
      ['', '0', '0'],
      ['0', '01', '01'],
      ['010-', '010-0', '010-0'],
      ['010-0', '010-09', '010-09'],
      ['010-09', '010-095', '010-095'],
      ['010-0957-', '010-0957-1', '010-0957-1'],
      ['010-0957-1', '010-0957-12', '010-0957-12'],
      ['010-0957-12', '010-0957-123', '010-0957-123'],
      ['010-0957-123', '010-0957-1234', '010-0957-1234'],
    ];
    expectWithTestCases(testCases);
  });

  it('TEST 2 - ADD WITH HYPHEN', () => {
    const testCases: TestCase[] = [
      ['01', '010', '010-'],
      ['010-095', '010-0957', '010-0957-'],
    ];
    expectWithTestCases(testCases);
  });

  it('TEST 3 - OVER MAX LENGTH', () => {
    const testCases: TestCase[] = [
      ['010-0957-1234', '010-0957-12345', '010-0957-1234'],
    ];
    expectWithTestCases(testCases);
  });
});

describe('CASE 2. REMOVE', () => {
  it('TEST 4 - REMOVE WITHOUT HYPHEN', () => {
    const testCases: TestCase[] = [
      ['0', '', ''],
      ['01', '0', '0'],
      ['010-1', '010-', '010-'],
      ['010-12', '010-1', '010-1'],
      ['010-123', '010-12', '010-12'],
      ['010-1234-1', '010-1234-', '010-1234-'],
      ['010-1234-12', '010-1234-1', '010-1234-1'],
      ['010-1234-123', '010-1234-12', '010-1234-12'],
      ['010-1234-1234', '010-1234-123', '010-1234-123'],
    ];
    expectWithTestCases(testCases);
  });

  it('TEST 5 - REMOVE WITH HYPHEN', () => {
    const testCases: TestCase[] = [
      ['010-', '010', '01'],
      ['010-1234-', '010-1234', '010-123'],
    ];
    expectWithTestCases(testCases);
  });
});

describe("CASE 3. EDGE CASE DOESN'T INVOKE ERROR", () => {
  function expectNotErrorReturnned(ret: string) {
    expect(ERROR_LIST).not.toContain(ret);
  }

  it('TEST 6 - COPY CHARACTER', () => {
    expectNotErrorReturnned(runFunction('', 'asd'));
  });

  it('TEST 7 - COPY PHONE NUMBER WITH HYPHEN', () => {
    expectNotErrorReturnned(runFunction('', '010-1234-1234'));
  });

  it('TEST 8 - COPY PHONE NUMBER WITHOUT HYPHEN', () => {
    expectNotErrorReturnned(runFunction('', '01012341234'));
  });
});

describe('CASE 4. ADVANCED', () => {
  it('TEST 9 - COPY?', () => {
    const testCases: TestCase[] = [
      ['', '010-1234-1234', '010-1234-1234'],
      ['', '01012341234', '010-1234-1234'],
    ];
    expectWithTestCases(testCases);
  });

  it('TEST 10 - CUT?', () => {
    const testCases: TestCase[] = [
      ['010-1234-1234', '010-12', '010-12'], // cut "34-1234"
      ['010-1234-1234', '014-1234', '014-1234-'], // cut "0-123"
      ['010-1234-1234', '0101234', '010-1234-'], // cut "-1234-"
      ['010-1234-1234', '34-1234', '341-234'], // cut "010-12"
    ];
    expectWithTestCases(testCases);
  });

  it('TEST 11 - WHAT ARE YOU DOING?', () => {
    const testCases: TestCase[] = [
      ['010-1234-1234', 'my name is bomb', '010-1234-1234'],
      ['010-12', '010-12a', '010-12'],
    ];
    expectWithTestCases(testCases);
  });
});
