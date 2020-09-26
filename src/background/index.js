chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined,() => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({})],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.runtime.onMessage.addListener((msg, sender) => {
    chrome.tabs.query({active: true, currentWindow: true},(tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, msg, {});
    });
});
