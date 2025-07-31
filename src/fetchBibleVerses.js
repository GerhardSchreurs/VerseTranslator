// Save this as fetchBibleVerses.js and run with: node fetchBibleVerses.js

const fetch = require('node-fetch');
const fs = require('fs');

const books = [
  // Add all book names here, e.g. "Genesis", "Exodus", ...
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah",
  "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah",
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah",
  "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians",
  "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter",
  "1 John", "2 John", "3 John", "Jude", "Revelation"
];

async function getVerseCounts(book) {
  let chapters = [];
  let chapter = 1;
  while (true) {
    const url = `https://bible-api.com/${book}+${chapter}`;
    try {
      const res = await fetch(url);
      if (!res.ok) break;
      const data = await res.json();
      if (!data.verses || data.verses.length === 0) break;
      chapters.push(data.verses.length);
      chapter++;
    } catch (e) {
      break;
    }
  }
  return chapters;
}

(async () => {
  let bibleData = {};
  for (const book of books) {
    console.log(`Fetching: ${book}`);
    const verses = await getVerseCounts(book);
    bibleData[book] = verses;
  }
  fs.writeFileSync('bible_verse_counts.json', JSON.stringify(bibleData, null, 2));
  console.log('Done! Data saved to bible_verse_counts.json');
})();