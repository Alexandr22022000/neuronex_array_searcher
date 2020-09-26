let activeNodes = 0,
    results = [];

const showResults = results => {
    if (!results.length) return alert('Not found!');
    results = results.filter((item, index) => results.indexOf(item) === index);
    alert('Found!!!!!!!!!!!\n' + results.join(', '));
};

chrome.runtime.onMessage.addListener((msg, sender) => {
    switch (msg.type) {
        case 'START':
            activeNodes++;
            if (!activeNodes) showResults(results);
            break;

        case 'END':
            activeNodes--;
            results = results.concat(msg.results);
            if (!activeNodes) showResults(results);
            break;

        case 'SEARCH':
            activeNodes = 0;
            results = [];
            break;
    }
});
