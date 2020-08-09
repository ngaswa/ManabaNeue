$('a[href*="link_iframe_balloon"]').each((index, element) => {
  const newHerf = $(element).text();
  $(element).attr('href', newHerf);
  $(element).attr('target', '_blank');
  $(element).removeAttr('onclick');
})
