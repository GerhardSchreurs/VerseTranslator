//IMPORTS
import { callApi, searchBible } from './ApiController.js';
import { ArrayBibleBooks } from './ArrayBibleBooks.js'
import { ArrayBibleTranslations } from './ArrayBibleTranslations.js';

let divVerses = null
let divVersePicker = null;
let selectBook = null;
let selectChapter = null;	

async function getVerses() {


}

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

	divVersePicker.innerHTML = ''; // Clear existing verse buttons
}

function setDefaults() {
	divVersePicker = document.getElementById('versePicker');
	divVerses = document.getElementById('verses');
	selectBook = document.getElementById('selectBook');
	selectChapter = document.getElementById('selectChapter');	

	setDefaultOption(selectBook, '== kies een bijbelboek ==');
	setDefaultOption(selectChapter, '== kies een hoofdstuk ==');
}

function populateBookPicker() {
		var arrBooks = ArrayBibleBooks.flatMap(testament => testament.books);

		arrBooks.forEach(book => {
			const option = document.createElement('option');
			option.value = book.book;
			option.textContent = book.translation || book.book;
			selectBook.appendChild(option);
		});

		selectBook.addEventListener('change', populateChapterPicker);
}

function populateChapterPicker() {
	setDefaultOption(selectChapter, '== kies een hoofdstuk ==');
	const bookObj = ArrayBibleBooks.flatMap(testament => testament.books).find(book => book.book === selectBook.value);
	
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
  const objBook = ArrayBibleBooks.flatMap(t => t.books).find(b => b.book === selectBook.value);
  const intChapter = parseInt(selectChapter.value, 10);
  const arrVerses = objBook?.verses?.[intChapter - 1] ?? null;

  divVersePicker.innerHTML = ''; // Clear existing verse buttons

  if (!objBook || isNaN(intChapter) || intChapter < 1 || intChapter > objBook.chapters || !arrVerses) return;

  function createVerseButton(i) {
    const button = document.createElement('button');
    button.textContent = i;
    button.id = `verse_${i}`;
    button.className = 'verse-button';
    button.addEventListener('click', handleButtonClick);
    return button;
  }

  function handleButtonClick(e) {
    const button = e.currentTarget;
    const buttonIndex = parseInt(button.id.split('_')[1], 10);
    const selectedButtons = document.querySelectorAll('.verse-button.selected');
    const selectedIndexes = Array.from(selectedButtons).map(btn =>
      parseInt(btn.id.split('_')[1], 10)
    );

    const toggleL = buttonIndex + 1 === selectedIndexes[0];
    const toggleR = buttonIndex - 1 === selectedIndexes[selectedIndexes.length - 1];
    const isAdjacent = toggleL || toggleR;
    const noSelected = selectedIndexes.length === 0;

    if (!isAdjacent && !noSelected) {
      selectedButtons.forEach(btn => btn.classList.remove('selected'));
    }

    button.classList.toggle('selected');

    const arrVerses = noSelected
      ? [buttonIndex]
      : isAdjacent
        ? [
            ...(toggleL ? [buttonIndex] : []),
            ...selectedIndexes,
            ...(toggleR ? [buttonIndex] : []),
          ]
        : [buttonIndex];

    updateVerses(objBook, intChapter, arrVerses);
  }

  for (let i = 1; i <= arrVerses; i++) {
    divVersePicker.appendChild(createVerseButton(i));
  }
}

async function updateVerses(objBook, intChapter, arrIndexes) {
    divVerses.innerHTML = ''; // Clear previous results

    const requests = ArrayBibleTranslations.map(async (translation) => {
        let queryL = `${objBook.abbr.toLowerCase()}.${intChapter}.${arrIndexes[0]}`;
        let queryR = `${objBook.abbr.toLowerCase()}.${intChapter}.${arrIndexes[arrIndexes.length - 1]}`;
        let query = `/${translation.id}/${queryL}`;
        if (arrIndexes.length > 1) {
            query += `-${queryR}`;
        }
        console.log(query);

        try {
            const data = await searchBible(translation.id, query);
            if (!data || data.verseCount === 0 || !data.passages || data.passages.length === 0) return;

            data.passages.forEach(passage => {
                const verseElement = document.createElement('p');
                verseElement.innerHTML = passage.content;
                divVerses.appendChild(verseElement);
            });
        } catch (error) {
            console.error(`Error fetching verses for query ${query}:`, error);
        }
    });

    await Promise.all(requests);
}

async function doSomething() {
	// try {
  //   const versions = await getBibleVersions();
  //   console.log('Bible versions:', versions);
  // } catch (error) {
  //   console.error('Error fetching Bible versions:', error.message);
  // }
	try {
		const data = await searchBible('de4e12af7f28f599-02', 'gen.1.1-gen.1.2');
		console.log('Search results:', data);
	} catch (error) {
  	console.error('Error fetching Bible versions:', error.message);
	}
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

window.doSomething = doSomething;

window.addEventListener('DOMContentLoaded', handleOnDOMContentLoaded);