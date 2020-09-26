const DEFAULT_SEPARATORS = ['\n'];

document.getElementById('search').onclick = () => {
    chrome.runtime.sendMessage({type: 'SEARCH'});
};

class WordsController {
    static init () {
        this.isWordsOpend = false;

        this.words_show_button = document.getElementById('words_show');
        this.words_div = document.getElementById('words');
        this.words_count_p = document.getElementById('words_count');
        this.words_input_input = document.getElementById('words_input');

        document.getElementById('words_show').onclick = () => {
            this.isWordsOpend = !this.isWordsOpend;
            this.update();
        };
        document.getElementById('words_add').onclick = () => this.onAddWord();
        document.getElementById('words_delete').onclick = () => this.onDelete();

        return this;
    }

    static update () {
        this.words_show_button.innerText = this.isWordsOpend ? 'HIDE' : 'SHOW';

        chrome.storage.sync.get('words', ({words}) => {
            this.words_div.style.display = this.isWordsOpend ? 'block' : 'none';
            this.words_count_p.innerText = (words ? words.length : 0) + ' items';

            if (this.isWordsOpend) {
                if (!words || !words.length) return this.words_div.innerHTML = '<a></a><br/>';
                this.words_div.innerHTML = words.map(word => `<a>${word}</a><br/>`).join('\n');
            }
        });
    }

    static onAddWord () {
        const text = this.words_input_input.value;
        chrome.storage.sync.get('words', ({words}) => {
            if (!words) words = [];
            words = words.concat(this.separate(text));
            chrome.storage.sync.set({words: words},() => {
                this.words_input_input.value = '';
                this.update();
            });
        });
    }

    static onDelete () {
        chrome.storage.sync.set({words: []},() => this.update());
    }

    static separate (text) {
        return text.split('\n');
    }
}

/*
 ---NEW FEATURES---
 */

class SettingsController {
    static init () {
        this.isSettingsOpend = false;

        this.settings_container_div = document.getElementById('settings_container');

        document.getElementById('settings_show').onclick = () => {
            this.isSettingsOpend = !this.isSettingsOpend;
            this.update();
        };

        return this;
    }

    static update () {
        this.settings_container_div.style.display = this.isSettingsOpend ? 'block' : 'none';
        SeparatorsController.update();
    }
}

class SeparatorsController {
    static init () {
        this.separators_container_div = document.getElementById('separators_container');
        this.separators_input_input = document.getElementById('separators_input');

        document.getElementById('separators_add').onclick = () => this.onAdd();
        document.getElementById('separators_reset').onclick = () => this.onReset();

        return this;
    }

    static update () {
        chrome.storage.sync.get('separators', ({separators}) => {
            if (!separators) return this.separators_container_div.innerHTML = '';
            this.separators_container_div.innerHTML = separators.map((item, index) =>
                `<li><p style="display: inline-block; margin: 0 8px 0 0">${item.codePointAt()}</p><button id="separator_delete_${index}">X</button></li>`
            ).join('\n');

            separators.forEach((item, index) => {
                document.getElementById('separator_delete_' + index).onclick = () => this.onDelete(index);
            });
        });
    }

    static onDelete (index) {
        chrome.storage.sync.get('separators', ({separators}) => {
            if (!separators) separators = [];
            separators.splice(index, 1);
            chrome.storage.sync.set({separators: separators},() => this.update());
        });
    }

    static onAdd () {
        const text = this.separators_input_input.value;
        chrome.storage.sync.get('separators', ({separators}) => {
            if (!separators) separators = [];
            separators.push(text);
            chrome.storage.sync.set({separators: separators},() => this.update());
        });
    }

    static onReset () {
        chrome.storage.sync.set({separators: DEFAULT_SEPARATORS},() => this.update());
    }
}

WordsController.init().update();
SettingsController.init().update();
SeparatorsController.init().update();
