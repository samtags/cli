import app from '../src';
import { mockFn } from '../src/services/functions/start';

describe('Should invoke functions', () => {
  it('Should invoke function when user passed start --functions', () => {
    const cliUserParams = {
      _: ['start'],
      functions: true,
    };

    app(cliUserParams);
    expect(mockFn).toBeCalled();
    expect(mockFn).toBeCalledTimes(1);
  });
});

describe('Should return error when docker is not existed in system', () => {
  //
});

describe('Should return error when project is a function', () => {
  //
});
