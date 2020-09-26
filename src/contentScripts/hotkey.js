document.addEventListener('keydown', e => {
    if ((!e.ctrlKey && !e.altKey) || !e.shiftKey || e.code !== 'KeyF') return;
    chrome.runtime.sendMessage({type: 'SEARCH'});
}, true);
