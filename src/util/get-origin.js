export default function getOrigin(url) {
  if (url.substr(0, 2) === '//') {
    url = window.location.protocol + url;
  }

  return url.split('/').slice(0, 3).join('/');
};
