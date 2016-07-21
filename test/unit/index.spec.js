import adapters from '../../src/adapters';
import YouTubeAdapter from '../../src/adapters/youtube';
import playerjsIframe from '../../src';

describe('PlayerJs Iframe', () => {
  context('#create', () => {
    let player;

    before(() => {
      player = playerjsIframe.create({
        'url': 'http://www.youtube.com/watch?v=SYcvS2UCIyk',
        'image': 'https://i.ytimg.com/vi/SYcvS2UCIyk/hqdefault.jpg',
        'videoId': 'SYcvS2UCIyk',
        'key': 'de9ccab7bc3141d9854bc852b198c08a',
        'schema': 'youtube',
        'src': 'https://www.youtube.com/embed/SYcvS2UCIyk?feature=oembed',
        'type': 'text/html'
      });
    });

    it('should return new instance of adapter', () => {
      expect(player.__proto__.constructor.name).to.equal('YouTubeAdapter');
    });
  });

  context('#addAdapter', () => {
    before(() => {
      playerjsIframe.addAdapter('dummy', { foo: 'bar' });
    });

    after(() => {
      delete adapters.dummy;
    });

    it('should add an adapter', () => {
      expect(adapters).to.have.property('dummy');
    });
  });
});
