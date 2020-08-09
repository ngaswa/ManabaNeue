const getLocalStorage = (key = null) => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (item) => {
      key ? resolve(item[key]) : resolve(item);
    });
  });
}

const getValueObject = (elementName) => {
  const data = {};
  $(elementName).each((index, element) => {
    data[element.name] = element.value;
  });

  return data;
}

const getCurrentPageName = () => {
  const currentUrl = location.href.split("/");
  return currentUrl[currentUrl.length - 1];
}

const loadFormValue = async () => {
  const currentPageName = getCurrentPageName();
  chrome.storage.local.get(currentPageName, (item) => {
    const formData = item[currentPageName]

    console.log(formData);

    $('.querybody input[type=radio]').each((index, element) => {
      if (formData.radio[element.name] == element.value) {
        $(element).prop('checked', true);
      }
    })

    $('.querybody textarea').each((index, element) => {
      element.value = formData.textarea[element.name];
    })

    $('.querybody input[type=text]').each((index, element) => {
      element.value = formData.inputText[element.name];
    })
  });
}

const saveFormValue = () => {
  const formData = {
    "radio": getValueObject('.querybody input[type=radio]:checked'),
    "textarea": getValueObject('.querybody textarea'),
    "inputText": getValueObject('.querybody input[type=text]')
  };

  const currentPageName = getCurrentPageName();
  chrome.storage.local.set({ [currentPageName]: formData });
}

$(() => {
  const autosaveEnabled = await getLocalStorage('autosave_enabled');
  if (autosaveEnabled) {
    loadFormValue();
    setInterval(() => saveFormValue(), 1000);
  }
})
