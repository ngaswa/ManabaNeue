const reloadButton = document.querySelector('#reload_button')
reloadButton.addEventListener('click', () => chrome.tabs.reload())

const iframeEnabledSwitch = document.querySelector('#iframe_enabled')
chrome.storage.local.get('iframe_enabled', function (value) {
  iframeEnabledSwitch.checked = value.iframe_enabled;
});

iframeEnabledSwitch.addEventListener('click', (event) => {
  const iframeEnabled = event.target.checked
  chrome.storage.local.set({ 'iframe_enabled': iframeEnabled })
})

const autosaveEnabledSwitch = document.querySelector('#autosave_enabled')
chrome.storage.local.get('autosave_enabled', function (value) {
  autosaveEnabledSwitch.checked = value.autosave_enabled;
});

autosaveEnabledSwitch.addEventListener('click', (event) => {
  const autosaveEnabled = event.target.checked
  chrome.storage.local.set({ 'autosave_enabled': autosaveEnabled })
})
