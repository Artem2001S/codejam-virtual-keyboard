import Key from './Key.js';

export default class Keyboard {
  constructor() {
    this.currentLanguage = localStorage.getItem('currentLanguage') === null ? 'Ru' : localStorage.getItem('currentLanguage');
    this.isCapsActive = false;

    this.pressedLeftControl = false;
    this.pressedLeftAlt = false;

    this.keys = [
      [
        new Key('Backquote', 'ё', '`', 'Ё', '~'), new Key('Digit1', '1', '1', '!', '!'), new Key('Digit2', '2', '2', '"', '@'), new Key('Digit3', '3', '3', '№', '#'),
        new Key('Digit4', '4', '4', ';', '$'), new Key('Digit5', '5', '5', '%', '%'), new Key('Digit6', '6', '6', ':', '^'), new Key('Digit7', '7', '7', '?', '&'), new Key('Digit8', '8', '8', '*', '*'),
        new Key('Digit9', '9', '9', '(', '('), new Key('Digit0', '0', '0', ')', ')'),
        new Key('Minus', '-', '-', '_', '_'), new Key('Equal', '=', '=', '+', '+'), new Key('Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', '4', true),
      ],

      [
        new Key('Tab', 'Tab', 'Tab', 'Tab', 'Tab', '1', true), new Key('KeyQ', 'й', 'q'), new Key('KeyW', 'ц', 'w'),
        new Key('KeyE', 'у', 'e'), new Key('KeyR', 'к', 'r'), new Key('KeyT', 'е', 't'), new Key('KeyY', 'н', 'y'),
        new Key('KeyU', 'г', 'u'), new Key('KeyI', 'ш', 'i'), new Key('KeyO', 'щ', 'o'),
        new Key('KeyP', 'з', 'p'), new Key('BracketLeft', 'х', '[', 'Х', '{'),
        new Key('BracketRight', 'ъ', ']', 'Ъ', '}'), new Key('Backslash', '\\', '\\', '/', '|'),
        new Key('Delete', 'Del', 'Del', 'Del', 'Del', '', true),
      ],

      [
        new Key('CapsLock', 'Capslock', 'Capslock', 'Capslock', 'Capslock', '3', true), new Key('KeyA', 'ф', 'a'), new Key('KeyS', 'ы', 's'),
        new Key('KeyD', 'в', 'd'), new Key('KeyF', 'а', 'f'), new Key('KeyG', 'п', 'g'),
        new Key('KeyH', 'р', 'h'), new Key('KeyJ', 'о', 'j'), new Key('KeyK', 'л', 'k'),
        new Key('KeyL', 'д', 'l'), new Key('Semicolon', 'ж', ';', 'Ж', ':'),
        new Key('Quote', 'э', '\'', 'Э', '"'), new Key('Enter', 'Enter', 'Enter', 'Enter', 'Enter', '4', true),
      ],
      [
        new Key('ShiftLeft', 'ShiftLeft', 'ShiftLeft', 'ShiftLeft', 'ShiftLeft', '3', true),
        new Key('KeyZ', 'я', 'z'), new Key('KeyX', 'ч', 'x'), new Key('KeyC', 'с', 'c'), new Key('KeyV', 'м', 'v'),
        new Key('KeyB', 'и', 'b'), new Key('KeyN', 'т', 'n'), new Key('KeyM', 'ь', 'm'),
        new Key('Comma', 'б', ',', 'Б', '<'), new Key('Period', 'ю', '.', 'Ю', '>'),
        new Key('Slash', '.', '/', ',', '?'), new Key('ArrowUp', '↑', '↑', '↑', '↑', '', true),
        new Key('ShiftRight', 'ShiftRight', 'ShiftRight', 'ShiftRight', 'ShiftRight', '4', true),
      ],
      [
        new Key('ControlLeft', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', '', true),
        new Key('MetaLeft', 'Win', 'Win', 'Win', 'Win', '', true),
        new Key('AltLeft', 'Alt', 'Alt', 'Alt', 'Alt', '', true),
        new Key('Space', 'Space', 'Space', 'Space', 'Space', 'space'),
        new Key('AltRight', 'Alt', 'Alt', 'Alt', 'Alt', '', true),
        new Key('ArrowLeft', '←', '←', '←', '←', '', true),
        new Key('ArrowDown', '↓', '↓', '↓', '↓', '', true),
        new Key('ArrowRight', '→', '→', '→', '→', '', true),
        new Key('ControlRight', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', '1', true),
      ],
    ];
  }

  init() {
    // create textarea
    const textarea = document.createElement('textarea');
    textarea.setAttribute('name', 'textArea');
    textarea.setAttribute('id', 'textArea');
    textarea.setAttribute('cols', '30');
    textarea.setAttribute('rows', '10');
    document.body.append(textarea);

    // create keyboard
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');

    // add keyboard elements
    this.keys.forEach((el) => {
      const keyRow = document.createElement('div');
      keyRow.classList.add('keyboard-row');
      el.forEach((key) => {
        const keyDiv = document.createElement('div');

        keyDiv.classList.add('key');
        keyDiv.textContent = key[`key${this.currentLanguage}`];

        keyDiv.dataset.keyCode = key.keyCode;
        keyDiv.dataset.currentLetter = key[`key${this.currentLanguage}`];

        if (key.size !== '') keyDiv.classList.add(`size-${key.size}`);
        if (key.isFunctional) keyDiv.classList.add('functional-key');
        keyRow.append(keyDiv);
      });
      keyboard.append(keyRow);
    });

    document.body.append(keyboard);
  }

  changeKeyboard(whatNeedChange) {
    // get keyboard
    const keyboard = document.querySelector('.keyboard');

    // get keys (DOM Elements)
    keyboard.childNodes.forEach((row, index) => {
      const keysRow = this.keys[index];
      row.childNodes.forEach((key, col) => {
        const myKey = key;
        let objectKey = '';
        if (whatNeedChange === 'caps') {
          objectKey = `key${this.isCapsActive ? '' : 'Caps'}${this.currentLanguage}`;
        }
        if (whatNeedChange === 'lang' || whatNeedChange === 'shift') {
          objectKey = `key${this.isCapsActive ? 'Caps' : ''}${this.currentLanguage}`;
        }
        myKey.dataset.currentLetter = keysRow[col][objectKey];
        myKey.textContent = myKey.dataset.currentLetter;
      });
    });
  }

  changeLanguage() {
    if (this.currentLanguage === 'Ru') this.currentLanguage = 'En';
    else this.currentLanguage = 'Ru';

    localStorage.setItem('currentLanguage', this.currentLanguage);

    this.changeKeyboard('lang');
  }

  animateClick(element) {
    element.classList.add('pressed-btn');
    setTimeout(() => {
      element.classList.remove('pressed-btn');
    }, 300);
  }

  capsLockClick(pressed) {
    this.changeKeyboard('caps');
    if (this.isCapsActive) {
      pressed.classList.remove('pressed-btn');
    } else {
      pressed.classList.add('pressed-btn');
    }
    this.isCapsActive = !this.isCapsActive;
  }

  deleteClick(textArea) {
    const ta = textArea;
    if (ta.selectionStart < ta.value.length) {
      const selectionStartTmp = ta.selectionStart;
      ta.value = ta.value.slice(0, ta.selectionStart)
+ ta.value.slice(ta.selectionStart + 1, ta.value.length);
      ta.selectionStart = selectionStartTmp;
    }
  }

  createNewLine(textArea) {
    const ta = textArea;
    ta.value += '\n';
  }

  addMouseEvent() {
    const keyboard = document.querySelector('.keyboard');
    keyboard.addEventListener('mouseup', (event) => {
			const textArea = document.querySelector('#textArea');
      // check is this a key ?
			if (event.target.className === 'keyboard') return;
			if (event.target.className === 'keyboard-row') return;
      // get keyCode
      const code = event.target.dataset.keyCode;
      // get key (DOM-element)
      const pressed = document.querySelector(`div[data-key-code=${code}]`);

      switch (code) {
        case 'Backspace':
          textArea.value = textArea.value.slice(0, textArea.value.length - 1);
          this.animateClick(pressed);
          return;

        case 'Delete':
          this.deleteClick(textArea);
          this.animateClick(pressed);
          return;

        case 'Enter':
          this.createNewLine(textArea);
          this.animateClick(pressed);
          return;

        case 'Tab':
          textArea.value += '\t';
          this.animateClick(pressed);
          return;

        case 'Space':
          textArea.value += ' ';
          this.animateClick(pressed);
          return;

        case 'MetaLeft':
        case 'AltRight':
        case 'ControlRight':
          this.animateClick(pressed);
          return;

        case 'ControlLeft':
          this.animateClick(pressed);
          this.pressedLeftControl = true;
          return;

        case 'AltLeft':
          this.pressedLeftAlt = true;
          this.animateClick(pressed);
          return;

        case 'ShiftLeft':
        case 'ShiftRight':
          pressed.classList.add('pressed-btn');
          this.changeKeyboard('caps');
          setTimeout(() => {
            this.changeKeyboard('shift');
            pressed.classList.remove('pressed-btn');
          }, 300);
          return;

        case 'CapsLock':
          this.capsLockClick(pressed);
          return;
        default:
          break;
      }
      textArea.value += pressed.dataset.currentLetter;
      this.animateClick(pressed);
    });
  }

  addKeyUpEvent() {
    document.addEventListener('keyup', (event) => {
      const pressed = document.querySelector(`div[data-key-code=${event.code}]`);
			if (pressed === null) return;
      switch (event.code) {
        case 'CapsLock':
          this.capsLockClick(pressed);
          return;
        case 'ShiftLeft':
        case 'ShiftRight':
          pressed.classList.remove('pressed-btn');
          this.changeKeyboard('shift');
          return;
        default:
          break;
      }

      // change language
      if (this.pressedLeftControl && this.pressedLeftAlt) {
        this.changeLanguage();
        this.pressedLeftControl = false;
        this.pressedLeftAlt = false;
      }
      pressed.classList.remove('pressed-btn');
    });
  }

  addKeyDownEvent() {
    document.addEventListener('keydown', (event) => {
      const textArea = document.querySelector('#textArea');
      const pressed = document.querySelector(`div[data-key-code=${event.code}]`);
      if (pressed === null) return;
      event.preventDefault();
      pressed.classList.add('pressed-btn');

      switch (event.code) {
        case 'Backspace':
          textArea.value = textArea.value.slice(0, textArea.value.length - 1);
          return;
        case 'Delete':
          this.deleteClick(textArea);
          return;
        case 'Enter':
          this.createNewLine(textArea);
          return;
        case 'Tab':
          textArea.value += '\t';
          return;
        case 'Space':
          textArea.value += ' ';
          return;
        case 'MetaLeft':
          return;
        case 'ControlLeft':
          this.pressedLeftControl = true;
          return;
        case 'ControlRight':
        case 'AltRight':
        case 'CapsLock':
          return;
        case 'AltLeft':
          this.pressedLeftAlt = true;
          return;
        case 'ShiftLeft':
          this.changeKeyboard('caps');
          return;
        case 'ShiftRight':
          this.changeKeyboard('caps');
          return;
        default:
          break;
      }

      textArea.value += pressed.dataset.currentLetter;
    });
  }
}
