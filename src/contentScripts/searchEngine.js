chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.type !== 'SEARCH') return;
    chrome.runtime.sendMessage({type: 'START'});

    chrome.storage.sync.get('words', ({words}) => {
        if (!words) words = [];

        const text = document.body.innerHTML;
        words = words.filter(word => text.indexOf(word) !== -1);
        chrome.runtime.sendMessage({type: 'END', results: words});
    });
});
