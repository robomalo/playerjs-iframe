import VimeoAdapter from '../../../src/adapters/vimeo';
import YouTubeAdapter from '../../../src/adapters/youtube';
import adapters from '../../../src/adapters';

describe('Adapters', () => {
  it('should have a Vimeo adapter', () => {
    expect(adapters.vimeo).to.equal(VimeoAdapter);
  });

  it('should have a YouTube adapter', () => {
    expect(adapters.youtube).to.equal(YouTubeAdapter);
  });
});