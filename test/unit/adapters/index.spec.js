import VimeoAdapter from '../../../lib/adapters/vimeo';
import YouTubeAdapter from '../../../lib/adapters/youtube';
import adapters from '../../../lib/adapters';

describe('Adapters', () => {
  it('should have a Vimeo adapter', () => {
    expect(adapters.vimeo).to.equal(VimeoAdapter);
  });

  it('should have a YouTube adapter', () => {
    expect(adapters.youtube).to.equal(YouTubeAdapter);
  });
});