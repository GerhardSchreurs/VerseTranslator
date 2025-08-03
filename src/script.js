//IMPORTS
import { arrBibleBooks } from './arrBibleBooks.js'
import { arrTranslations } from './arrTranslations.js';

//api.bible key
const API_KEY = '8f948d8fa23613a62dde602681a64a96';

function handleOnDOMContentLoaded() {
	setDefaults();
	populateBookPicker();
}

function setDefaultOption(selectElement, text, value = '') {
	selectElement.innerHTML = ''; // Clear existing options
	// Create a default option
	// This option will be disabled and selected by default		
	const option = document.createElement('option');
	option.value = value;
	option.textContent = text;
	option.disabled = true;
	option.selected = true;
	selectElement.appendChild(option);

	document.getElementById('versePicker').innerHTML = ''; // Clear existing verse buttons
}


function setDefaults() {
	const selectBook = document.getElementById('selectBook');
	const selectChapter = document.getElementById('selectChapter');	

	setDefaultOption(selectBook, '== kies een bijbelboek ==');
	setDefaultOption(selectChapter, '== kies een hoofdstuk ==');
}


function populateBookPicker() {
		const selectBook = document.getElementById('selectBook');
		var arrBooks = arrBibleBooks.flatMap(testament => testament.books);

		arrBooks.forEach(book => {
			const option = document.createElement('option');
			option.value = book.book;
			option.textContent = book.translation || book.book;
			selectBook.appendChild(option);
		});

		selectBook.addEventListener('change', populateChapterPicker);
}

function populateChapterPicker() {
	const selectBook = document.getElementById('selectBook');
	const selectChapter = document.getElementById('selectChapter');

	setDefaultOption(selectChapter, '== kies een hoofdstuk ==');

	const bookObj = arrBibleBooks.flatMap(testament => testament.books).find(book => book.book === selectBook.value);
	
	if (!bookObj) {
		selectChapter.innerHTML = ''; // Clear existing options if no book is selected
		return;
	}

	if (bookObj) {
		for (let i = 1; i <= bookObj.chapters; i++) {
			const option = document.createElement('option');
			option.value = i;
			option.textContent = i;
			selectChapter.appendChild(option);
		}
	}

	selectChapter.addEventListener('change', populateVersePicker);
}

function populateVersePicker(e) {
	function innerHandleButtonClick(e) {
		const button = e.currentTarget;
		const buttonIndex = parseInt(button.id.split('_')[1], 10);
		const arrToggled = document.querySelectorAll('.verse-button.selected');

		//are there no toggled buttons?
		if (arrToggled.length === 0) {
			button.classList.toggle('selected');
			return;
		}

		//are there toggled buttons?
		if (arrToggled.length > 0) {
			//is buttonIndex previous or next?
			const selectedButtonId = parseInt(arrToggled[0].id.split('_')[1], 10);
			
			if (buttonIndex === selectedButtonId + 1 || buttonIndex === selectedButtonId - 1) {
				button.classList.toggle('selected');
				return;
			}

			//if not, deselect all toggled buttons
			arrToggled.forEach(btn => btn.classList.remove('selected'));
		}


		button.classList.toggle('selected');
		//const isSelected = button.classList.contains('selected');

		console.log (arrVerses);


		// if (selectedButtonId > -1) {
		// 	let currentSelectedButtonId = parseInt(e.currentTarget.id.split('_')[1]);
			
		// 	if (currentSelectedButtonId === selectedButtonId + 1) {
		// 		button.classList.toggle('selected');
		// 		selectedButtonId = currentSelectedButtonId;
		// 		return
		// 	}

		// 	// If the button is already selected, deselect it
		// 	if (isSelected) {
		// 		button.classList.remove('selected');
		// 		selectedButtonId = -1; // Reset selected button ID
		// 		return;
		// 	}

		// 	e.currentTarget.classList.toggle('selected');
		// 	selectedButtonId = -1; // Reset selected button ID
		// }
	}

	const selectBook = document.getElementById('selectBook');
	const selectChapter = document.getElementById('selectChapter');
	const versePicker = document.getElementById('versePicker');
	const chapter = parseInt(selectChapter.value, 10);
	const book = arrBibleBooks.flatMap(t => t.books).find(book => book.book === selectBook.value);
	const arrVerses = book.verses ? book.verses[chapter - 1] : null; // Get verses for the selected chapter

	//selectChapter.innerHTML = ''; // Clear existing options if chapter is invalid		
	versePicker.innerHTML = ''; // Clear existing verse buttons

	if (!book) return;
	if (isNaN(chapter) || chapter < 1 || chapter > book.chapters) return;
	if (!arrVerses) return;

	for (let i = 1; i <= arrVerses; i++) {
		var button = document.createElement('button');
		button.textContent = i;
		button.id = `verse_${i}`;
		button.className = 'verse-button';

		// button.addEventListener('click', (e) => {	
		// 		alert(`You clicked on verse ${i} of chapter ${chapter} in book ${selectBook.value}`);
		// 		e.currentTarget.classList.toggle('selected');
		// });

		button.addEventListener('click', innerHandleButtonClick);

		versePicker.appendChild(button);
	}






	// console.log('arrChapters', arrChapters);

	// if (!arrChapters) {
	// 	selectChapter.innerHTML = ''; // Clear existing options if no chapter is selected
	// 	return;
	// }

}

// Populate the book picker
// window.addEventListener('DOMContentLoaded', () => {
// });

function doSomething() {
	// const bookSelect = document.getElementById('chapterBook');
	// const selectedBook = bookSelect.value;
	// const bookObj = arrBibleBooks.find(book => book.book === selectedBook);
	// let output = `Selected Book: ${selectedBook}\nChapters: ${bookObj.chapters}`;
	// if (bookObj.verses) {
	// 	output += `\nVerses per chapter: ${bookObj.verses.join(', ')}`;
	// }
	// alert(output);
}

async function retrieveBibleVerseAsync() {
	try {
		const response = await fetch('https://www.bible.com/bible/111/1SA.1.NIV');
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Error fetching verse:', error);
	}
}

window.addEventListener('DOMContentLoaded', handleOnDOMContentLoaded);