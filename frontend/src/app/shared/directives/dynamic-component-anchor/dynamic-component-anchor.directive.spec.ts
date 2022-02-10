import { inject } from '@angular/core/testing';
import { DynamicComponentAnchor } from './dynamic-component-anchor.directive';

describe('DynamicComponentAnchor', () => {
  it('should create an instance', () => {
    const directive = new DynamicComponentAnchor();
    expect(directive).toBeTruthy();
  });
});
