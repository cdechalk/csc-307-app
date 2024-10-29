// module.test.js
import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});



test('Testing div -- success', () => {
    const expected = 30;
    const got = mut.div(60, 2);
    expect(got).toBe(expected);
});

test('Testing div -- by 0', () => {
    const expected = Infinity;
    const got = mut.div(60, 0);
    expect(got).toBe(expected);
});

test('Testing div -- one negative', () => {
    const expected = -5;
    const got = mut.div(-10, 2);
    expect(got).toBe(expected);
});

test('Testing div -- both negative', () => {
    const expected = 5;
    const got = mut.div(-10, -2);
    expect(got).toBe(expected);
});

test('Testing div -- 0 numerator', () => {
    const expected = 0;
    const got = mut.div(0, 20);
    expect(got).toBe(expected);
});

test('Testing div -- floats', () => {
    const expected = 3;
    const got = mut.div(7.5, 2.5);
    expect(got).toBe(expected);
});

test('Testing div -- large nums', () => {
    const expected = 5e9;
    const got = mut.div(1e10, 2);
    expect(got).toBe(expected);
});

test('Testing div -- NaN divisor', () => {
    const got = mut.div(10, NaN);
    expect(got).toBeNaN();
});

test('Testing div -- NaN numerator', () => {
    const got = mut.div(NaN, 10);
    expect(got).toBeNaN();
});



test('Testing containsNumbers -- all nums', () => {
    const expected = true;
    const got = mut.containsNumbers('12345');
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- no nums', () => {
    const expected = false;
    const got = mut.containsNumbers('abcdefghijklmnopqrstuvwxyz');
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- float', () => {
    const expected = true;
    const got = mut.containsNumbers('11.5');
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- zero', () => {
    const expected = true;
    const got = mut.containsNumbers('0');
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- both', () => {
    const expected = true;
    const got = mut.containsNumbers('abc123def');
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- characters', () => {
    const expected = false;
    const got = mut.containsNumbers('@#$%^&*()_={[]!?+-:;}');
    expect(got).toBe(expected);
});

test('Testing containsNumbers -- space', () => {
    const expected = false;
    const got = mut.containsNumbers('  ');
    expect(got).toBe(expected);
});



