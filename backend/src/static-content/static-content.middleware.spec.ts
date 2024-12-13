import { StaticContentMiddleware } from './static-content.middleware';

describe('StaticContentMiddleware', () => {
  it('should be defined', () => {
    expect(new StaticContentMiddleware()).toBeDefined();
  });
});
