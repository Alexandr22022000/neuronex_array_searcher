document.addEventListener('keydown', e => {
    if ((!e.ctrlKey && !e.altKey) || !e.shiftKey || e.code !== 'KeyF') return;

    // FIXME: duplicated code (used for hotkeys)
    chrome.storage.sync.get('words', ({words}) => {
        if (!words) words = [];

        const text = document.body.innerHTML;
        words = words.filter(word => text.indexOf(word) !== -1);

        if (!words.length) return alert('Not found!');
        words = words.filter((item, index) => words.indexOf(item) === index);
        alert('Found!!!!!!!!!!!\n' + words.join(', '));
    });
}, true);
