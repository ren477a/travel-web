import { AngularSrcPage } from './app.po';

describe('angular-src App', () => {
  let page: AngularSrcPage;

  beforeEach(() => {
    page = new AngularSrcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
