document.addEventListener('DOMContentLoaded', () => {
  [...document.styleSheets].forEach(styleSheet => {
    styleSheet.disabled = true;
  });

  $('body *').removeAttr('style');
  $('svg').remove();
  $('th').removeAttr('width');
  $(':not(.nolink) > td').removeAttr('width');
  $('font').removeAttr('size');
  $('font').removeAttr('face');
  $('font').removeAttr('color');

  $('body :contains("\u00A0")').each((index, element) => {
    $(element).html($(element).html().replace(/&nbsp;/g, ''));
  });
});
