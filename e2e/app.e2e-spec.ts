import { ShadersPage } from './app.po';

describe('shaders App', () => {
  let page: ShadersPage;

  beforeEach(() => {
    page = new ShadersPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
