function Key(keyCode, keyRu, keyEn, keyCapsRu, keyCapsEn, size = '', isFunctional = false) {
	this.keyCode = keyCode;
	this.keyRu = keyRu;
	this.keyEn = keyEn;
	this.keyCapsRu = keyCapsRu == undefined ? keyRu.toUpperCase() : keyCapsRu;
	this.keyCapsEn = keyCapsEn == undefined ? keyEn.toUpperCase() : keyCapsEn;
	this.size = size;
	this.isFunctional = isFunctional;
}

const keys = [
	[
		new Key('Backquote', 'ё', '`', 'Ё', '~'), new Key('Digit1', '1', '1', '!', '!'), new Key('Digit2', '2', '2', '"', '@'), new Key('Digit3', '3', '3', '№', '#'),
		new Key('Digit4', '4', '4', ';', '$'), new Key('Digit5', '5', '5', '%', '%'), new Key('Digit6', '6', '6', ':', '^'), new Key('Digit7', '7', '7', '?', '&'), new Key('Digit8', '8', '8', '*', '*'),
		new Key('Digit9', '9', '9', '(', '('), new Key('Digit0', '0', '0', ')', ')'),
		new Key('Minus', '-', '-', '_', '_'), new Key('Equal', '=', '=', '+', '+'), new Key('Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace', '4', true)
	],

	[
		new Key('Tab', 'Tab', 'Tab', 'Tab', 'Tab', '1', true), new Key('KeyQ', 'й', 'q'), new Key('KeyW', 'ц', 'w'),
		new Key('KeyE', 'у', 'e'), new Key('KeyR', 'к', 'r'), new Key('KeyT', 'е', 't'), new Key('KeyY', 'н', 'y'),
		new Key('KeyU', 'г', 'u'), new Key('KeyI', 'ш', 'i'), new Key('KeyO', 'щ', 'o'),
		new Key('KeyP', 'з', 'p'), new Key('BracketLeft', 'х', '[', 'Х', '{'),
		new Key('BracketRight', 'ъ', ']', 'Ъ', '}'), new Key('Blackslash', '\\', '\\', '/', '|'),
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
		new Key('ControlRight', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl', '1', true)
	]
];


const init = () => {

	//create textarea
	{
		const textarea = document.createElement('textarea');
		textarea.setAttribute('name', 'textArea');
		textarea.setAttribute('id', 'textArea');
		textarea.setAttribute('cols', '30');
		textarea.setAttribute('rows', '10');
		document.body.append(textarea);
	}
	//create keyboard
	const keyboard = document.createElement('div');
	keyboard.classList.add('keyboard');

	//add keyboard elements
	keys.forEach(el => {
		const keyRow = document.createElement('div');
		keyRow.classList.add('keyboard-row');
		el.forEach(key => {
			const keyDiv = document.createElement('div');

			// TODO: |check language| TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO 
			keyDiv.classList.add('key');
			keyDiv.textContent = key.keyRu;

			keyDiv.dataset.keyCode = key.keyCode;
			keyDiv.dataset.currentLetter = key.keyRu;

			if (key.size !== '') keyDiv.classList.add(`size-${key.size}`);
			if (key.isFunctional) keyDiv.classList.add('functional-key');
			keyRow.append(keyDiv);
		});
		keyboard.append(keyRow);
	});

	document.body.append(keyboard);
}
init();


const textArea = document.querySelector('#textArea');
let isCapsActive = false;

document.addEventListener('keydown', function (event) {
	let pressed = document.querySelector(`div[data-key-code=${event.code}]`);
	if (pressed == null) return;
	event.preventDefault();
	pressed.classList.add('pressed-btn');

	switch (event.code) {
		case 'Backspace':
			textArea.value = textArea.value.slice(0, textArea.value.length - 1);
			return;
		case 'Delete':
			if (textArea.selectionStart < textArea.value.length) {
				let selectionStartTmp = textArea.selectionStart;
				textArea.value = textArea.value.slice(0, textArea.selectionStart) + textArea.value.slice(textArea.selectionStart + 1, textArea.value.length);
				textArea.selectionStart = selectionStartTmp;
			}
			return;
		case 'Enter':
			textArea.value += '\n';
			return;
		case 'Tab':
			textArea.value += '    ';
			return;
		case 'Space':
			textArea.value += ' ';
			return;
		case 'MetaLeft':
			return;
		case 'ControlLeft':
			return;
		case 'ControlRight':
			return;
		case 'AltLeft':
			return;
		case 'AltRight':
			return;
		case 'ShiftLeft':
			return;
		case 'ShiftRight':
			return;
		case 'CapsLock':
			return;
		default:
			break;
	}

	textArea.value += pressed.dataset.currentLetter;
});

document.addEventListener('keyup', function (event) {
	let pressed = document.querySelector(`div[data-key-code=${event.code}]`);
	if (pressed == null) return;

	if (event.code == 'CapsLock') {
			caps()
			if (isCapsActive){
				pressed.classList.remove('pressed-btn');
			}
		isCapsActive = !isCapsActive;
		return;
	}
	pressed.classList.remove('pressed-btn');
});

function caps() {
	//get keyboard
	const keyboard = document.querySelector('.keyboard');

	//get keys
	keyboard.childNodes.forEach((row, index) => {
		let keysRow = keys[index];
		row.childNodes.forEach((key, col) => {
			if (isCapsActive == false) {
				key.dataset.currentLetter = keysRow[index, col].keyCapsRu;
				key.textContent = key.dataset.currentLetter;
			} else {
				key.dataset.currentLetter = keysRow[index, col].keyRu;
				key.textContent = key.dataset.currentLetter;
			}
		});
	});
}



