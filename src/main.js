//IMPORTS
import { callApi, searchBible } from './ApiController.js';
import { ArrayBibleBooks } from './ArrayBibleBooks.js'
import { ArrayBibleTranslations } from './ArrayBibleTranslations.js';


let divVerses = null;
let divVersePicker = null;
let selectBook = null;
let selectChapter = null;
let updateVersesAbortController = null;

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
    // If buttons are disabled, ignore clicks
    if (divVersePicker.getAttribute('data-disabled') === 'true') return;
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


function removeVerseNumberSpans(html) {
    // Remove <span data-number="..." class="v">...</span>
    return html.replace(/<span[^>]*data-number="\d+"[^>]*class="v"[^>]*>\d+<\/span>/g, '');
}

function injectPassage(translation, passage) {
    // Create a container div for flex layout
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'flex-start';
    container.style.justifyContent = 'space-between';
    container.style.marginBottom = '0.5em';

    // Text content (left)
    const textDiv = document.createElement('div');
    textDiv.style.flex = '1';
    textDiv.style.textAlign = 'left';
    const language = translation.language.name;
    const localName = translation.abbreviationLocal;
    const text = removeVerseNumberSpans(passage.content);
    let html = `<b>${language} - (${localName})</b>${text}`;
    textDiv.innerHTML = html;

    // Copy button (right)
    const copyBtn = document.createElement('button');
    copyBtn.textContent = '📋';
    copyBtn.title = 'Copy verse text';
    copyBtn.style.marginLeft = '1em';
    copyBtn.style.alignSelf = 'flex-start';
    copyBtn.style.cursor = 'pointer';
    copyBtn.style.background = 'none';
    copyBtn.style.border = 'none';
    copyBtn.style.fontSize = '1.2em';
    copyBtn.style.color = '#333';
    copyBtn.addEventListener('click', () => {
        // Only copy the plain verse text (no language/abbreviation)
        const temp = document.createElement('div');
        temp.innerHTML = text;
        const textToCopy = temp.innerText || temp.textContent;
        navigator.clipboard.writeText(textToCopy);
        copyBtn.textContent = '✅';
        setTimeout(() => { copyBtn.textContent = '📋'; }, 1200);
    });

    container.appendChild(textDiv);
    container.appendChild(copyBtn);
    divVerses.appendChild(container);
}


async function updateVerses(objBook, intChapter, arrIndexes) {
    // Abort previous updateVerses if running
    if (updateVersesAbortController) {
        updateVersesAbortController.abort();
    }
		
    const abortController = new AbortController();
    updateVersesAbortController = abortController;

    // Disable verse picker buttons
    divVersePicker.setAttribute('data-disabled', 'true');
    Array.from(divVersePicker.querySelectorAll('button')).forEach(btn => btn.disabled = true);

    divVerses.innerHTML = ''; // Clear previous results
    const arrFums = [];

    try {
        for (const translation of ArrayBibleTranslations) {
            if (abortController.signal.aborted) return;
            let queryL = `${objBook.abbr.toLowerCase()}.${intChapter}.${arrIndexes[0]}`;
            let queryR = `${arrIndexes[arrIndexes.length - 1]}`;
            let query = `/${translation.id}/${queryL}`;
            if (arrIndexes.length > 1) {
                query += `-${queryR}`;
            }
            try {
                const json = await searchBible(translation.id, query);
                if (!json) continue;
                if (!json.meta) continue;
                if (!json.data) continue;
                const fums = json.meta;
                const data = json.data;
                if (fums.fumsToken) arrFums.push(fums.fumsToken);
                if (data.verseCount === 0 || !data.passages || data.passages.length === 0) continue;
                data.passages.forEach(passage => {
                    injectPassage(translation, passage);
                });
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.error(`Error fetching verses for query ${query}:`, error);
                }
            }
        }
    } finally {
        // Re-enable verse picker buttons
        divVersePicker.removeAttribute('data-disabled');
        Array.from(divVersePicker.querySelectorAll('button')).forEach(btn => btn.disabled = false);
        // Only track if not aborted
        if (!abortController.signal.aborted) {
            fums('trackView', arrFums);
        }
        // Clear controller if this is the last run
        if (updateVersesAbortController === abortController) {
            updateVersesAbortController = null;
        }
    }
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