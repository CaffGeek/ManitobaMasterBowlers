import { BowlerExistsValidator } from './bowler-exists-validator.directive';

describe('BowlerExistsValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new BowlerExistsValidator(null);
    expect(directive).toBeTruthy();
  });
});
