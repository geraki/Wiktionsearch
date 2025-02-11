chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "wiktionarySearch",
        title: "Search in Wiktionary",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "wiktionarySearch" && info.selectionText) {
        chrome.i18n.getAcceptLanguages(languages => {
            let userLang = languages[0].split('-')[0]; // Get primary language code
            let wiktionaryUrl = `https://${userLang}.wiktionary.org/wiki/${encodeURIComponent(info.selectionText)}`;
            chrome.tabs.create({ url: wiktionaryUrl });
        });
    }
});
