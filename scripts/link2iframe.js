const getLocalStorage = (key = null) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (item) => {
      key ? resolve(item[key]) : resolve(item);
    });
  });
}

const link2Iframe = (element) => {
  const escapedLink = $(element).attr('href');
  const link = unescape(escapedLink);

  if (link.match('drive.google.com/file')) {
    const legExp = 'd/.+?/';
    const videoId = link.match(legExp)[0];
    $(element).replaceWith(`<iframe loading="lazy" width="768" height="432" src="https://drive.google.com/file/${videoId}preview"></iframe>`);
  }
  else if (link.match('youtube.com')) {
    const legExp = 'v=.+?$';
    const videoId = link.match(legExp)[0].replace('v=', '').replace('&feature=youtu.be', '');
    $(element).replaceWith(`<iframe loading="lazy" width="768" height="432" src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`);
  }
  else if (link.match('youtu.be')) {
    const legExp = 'youtu.be/.+?$';
    const videoId = link.match(legExp)[0].slice(9);
    $(element).replaceWith(`<iframe loading="lazy" width="768" height="432" src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`);
  }
}

$(async () => {
  const iframeEnabled = await getLocalStorage('iframe_enabled');
  if (iframeEnabled) {
    $(':not(.inlineaf-description) > a').each((index, element) => link2Iframe(element));
  }
})
