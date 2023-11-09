// Note: import explicitly to use the types shiped with jest.
import {describe, it, expect} from '@jest/globals';

describe('truth', () => {
  it('is true', () => {
    expect(true).toEqual(true);
  });
});
