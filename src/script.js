const API_KEY = '8f948d8fa23613a62dde602681a64a96';

// Bible books array with verses per chapter for the first three books
const arrBible = [
	{
		testament: "old",
		books: [
			{ book: "Genesis", chapters: 50, translation: "Genesis", verses: [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26] },
			{ book: "Exodus", chapters: 40, translation: "Exodus", verses: [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 38, 29, 31, 43, 38] },
			{ book: "Leviticus", chapters: 27, translation: "Leviticus", verses: [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34] },
			{ book: "Numbers", chapters: 36, translation: "Numeri", verses: [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 39, 17, 54, 42, 56, 29, 34, 13] },
			{ book: "Deuteronomy", chapters: 34, translation: "Deuteronomium", verses: [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 19, 68, 29, 20, 30, 52, 29, 12] },
			{ book: "Joshua", chapters: 24, translation: "Joshua", verses: [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33] },
			{ book: "Judges", chapters: 21, translation: "Richteren", verses: [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25] },
			{ book: "Ruth", chapters: 4, translation: "Ruth", verses: [22, 23, 18, 22] },
			{ book: "1 Samuel", chapters: 31, translation: "1 Samuel", verses: [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13] },
			{ book: "2 Samuel", chapters: 24, translation: "2 Samuel", verses: [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33, 43, 26, 22, 51, 39, 25] },
			{ book: "1 Kings", chapters: 22, translation: "1 Koningen", verses: [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 24, 31, 34, 24, 34, 24, 46, 21, 43, 29, 53] },
			{ book: "2 Kings", chapters: 25, translation: "2 Koningen", verses: [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 18, 37, 21, 26, 20, 37, 20, 30] },
			{ book: "1 Chronicles", chapters: 29, translation: "1 Kronieken", verses: [54, 17, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 31, 32, 30] },
			{ book: "2 Chronicles", chapters: 36, translation: "2 Kronieken", verses: [18, 17, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23] },
			{ book: "Ezra", chapters: 10, translation: "Ezra", verses: [11, 70, 13, 24, 17, 22, 28, 36, 15, 44] },
			{ book: "Nehemiah", chapters: 13, translation: "Nehemia", verses: [11, 20, 32, 23, 19, 19, 73, 18, 37, 40, 36, 47, 31] },
			{ book: "Esther", chapters: 10, translation: "Esther", verses: [22, 23, 15, 17, 14, 14, 10, 17, 32, 3] },
			{ book: "Job", chapters: 42, translation: "Job", verses: [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 21, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17] },
			{ book: "Psalms", chapters: 150, translation: "Psalmen", verses: [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 9, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 15, 21, 72, 13, 20, 17, 8, 19, 13, 14, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 14, 10, 8, 12, 15, 21, 10, 20, 14, 9, 6] },
			{ book: "Proverbs", chapters: 31, translation: "Spreuken", verses: [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31] },
			{ book: "Ecclesiastes", chapters: 12, translation: "Prediker", verses: [18, 26, 22, 16, 16, 12, 29, 17, 18, 20, 10, 14] },
			{ book: "Song of Solomon", chapters: 8, translation: "Hooglied", verses: [17, 17, 11, 16, 16, 13, 13, 14] },
			{ book: "Isaiah", chapters: 66, translation: "Jesaja", verses: [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 15, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 11, 12, 19, 12, 25, 24, 23] },
			{ book: "Jeremiah", chapters: 52, translation: "Jeremia", verses: [19, 37, 25, 31, 31, 30, 34, 22, 25, 25, 23, 17, 27, 22, 21, 21, 27, 23, 20, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34] },
			{ book: "Lamentations", chapters: 5, translation: "Klaagliederen", verses: [22, 22, 66, 22, 22] },
			{ book: "Ezekiel", chapters: 48, translation: "Ezechiël", verses: [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 44, 37, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35] },
			{ book: "Daniel", chapters: 12, translation: "Daniel", verses: [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13] },
			{ book: "Hosea", chapters: 14, translation: "Hosea", verses: [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9] },
			{ book: "Joel", chapters: 3, translation: "Joel", verses: [20, 32, 21] },
			{ book: "Amos", chapters: 9, translation: "Amos", verses: [15, 16, 15, 13, 27, 14, 17, 14, 15] },
			{ book: "Obadiah", chapters: 1, translation: "Obadja", verses: [21] },
			{ book: "Jonah", chapters: 4, translation: "Jona", verses: [17, 10, 10, 11] },
			{ book: "Micah", chapters: 7, translation: "Micha", verses: [16, 13, 12, 13, 15, 16, 20] },
			{ book: "Nahum", chapters: 3, translation: "Nahum", verses: [15, 13, 19] },
			{ book: "Habakkuk", chapters: 3, translation: "Habakuk", verses: [17, 20, 19] },
			{ book: "Zephaniah", chapters: 3, translation: "Zefanja", verses: [18, 15, 20] },
			{ book: "Haggai", chapters: 2, translation: "Haggai", verses: [15, 23] },
			{ book: "Zechariah", chapters: 14, translation: "Zacharia", verses: [21, 17, 10, 14, 14, 15, 14, 23, 17, 12, 17, 14, 9, 21] },
			{ book: "Malachi", chapters: 4, translation: "Maleachi", verses: [14, 17, 18, 6] }
		]
	},
	{
		testament: "new",
		books: [
			{ book: "Matthew", chapters: 28, translation: "Mattheüs", verses: [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34] },
			{ book: "Mark", chapters: 16, translation: "Marcus", verses: [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20] },
			{ book: "Luke", chapters: 24, translation: "Lucas", verses: [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53] },
			{ book: "John", chapters: 21, translation: "Johannes", verses: [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25] },
			{ book: "Acts", chapters: 28, translation: "Handelingen", verses: [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 40, 38, 40, 30, 35, 27, 27, 32, 44, 31] },
			{ book: "Romans", chapters: 16, translation: "Romeinen", verses: [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27] },
			{ book: "1 Corinthians", chapters: 16, translation: "1 Korintiërs", verses: [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24] },
			{ book: "2 Corinthians", chapters: 13, translation: "2 Korintiërs", verses: [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14] },
			{ book: "Galatians", chapters: 6, translation: "Galaten", verses: [24, 21, 29, 31, 26, 18] },
			{ book: "Ephesians", chapters: 6, translation: "Efeziërs", verses: [23, 22, 21, 32, 33, 24] },
			{ book: "Philippians", chapters: 4, translation: "Filippenzen", verses: [30, 30, 21, 23] },
			{ book: "Colossians", chapters: 4, translation: "Kolossenzen", verses: [29, 23, 25, 18] },
			{ book: "1 Thessalonians", chapters: 5, translation: "1 Thessalonicenzen", verses: [10, 20, 13, 18, 28] },
			{ book: "2 Thessalonians", chapters: 3, translation: "2 Thessalonicenzen", verses: [12, 17, 18] },
			{ book: "1 Timothy", chapters: 6, translation: "1 Timoteüs", verses: [20, 15, 16, 16, 25, 21] },
			{ book: "2 Timothy", chapters: 4, translation: "2 Timoteüs", verses: [18, 26, 17, 22] },
			{ book: "Titus", chapters: 3, translation: "Titus", verses: [16, 15, 15] },
			{ book: "Philemon", chapters: 1, translation: "Filemon", verses: [25] },
			{ book: "Hebrews", chapters: 13, translation: "Hebreeën", verses: [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25] },
			{ book: "James", chapters: 5, translation: "Jakobus", verses: [27, 26, 18, 17, 20] },
			{ book: "1 Peter", chapters: 5, translation: "1 Petrus", verses: [25, 25, 22, 19, 14] },
			{ book: "2 Peter", chapters: 3, translation: "2 Petrus", verses: [21, 22, 18] },
			{ book: "1 John", chapters: 5, translation: "1 Johannes", verses: [10, 29, 24, 21, 21] },
			{ book: "2 John", chapters: 1, translation: "2 Johannes", verses: [13] },
			{ book: "3 John", chapters: 1, translation: "3 Johannes", verses: [14] },
			{ book: "Jude", chapters: 1, translation: "Judas", verses: [25] },
			{ book: "Revelation", chapters: 22, translation: "Openbaring", verses: [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21] }
		]
	}
];


const arrTranslations = [
	//ALBANIA
	{
		"id": "44cb4cae1cae773f-01",
		"dblId": "44cb4cae1cae773f",
		"relatedDbl": null,
		"name": "Aromanian Frasherot Bible",
		"nameLocal": "Bibla tu limba Rrãmãnã",
		"abbreviation": "RUPF",
		"abbreviationLocal": "BLRR",
		"description": "The Aromanian prestige dialect spoken in central and southern Albania.",
		"descriptionLocal": "Bibla në gjuhën Arumune",
		"language": {
			"id": "rup",
			"name": "Aromanian",
			"nameLocal": "Armãneashti/Arumanisht",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "AL",
				"name": "Albania",
				"nameLocal": "Albania"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T16:59:12.000Z",
		"audioBibles": []
	},
	//ARAMAIC OR Ethiopic
	{
		"id": "4aa6a1001d427a40-01",
		"dblId": "4aa6a1001d427a40",
		"relatedDbl": null,
		"name": "New Oromo Contemporary Version, Western, Ethiopic 2022",
		"nameLocal": "ክታበ ቁልቁሉ፣ ሂካ አመያ ሃራ",
		"abbreviation": "NOCV",
		"abbreviationLocal": "ሂአሃ",
		"description": "Holy Bible",
		"descriptionLocal": "ክታበ ቁልቁሉ",
		"language": {
			"id": "gaz",
			"name": "Oromo, West Central",
			"nameLocal": "Oromo, West Central",
			"script": "Ethiopic",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "ET",
				"name": "Ethiopia",
				"nameLocal": "Ethiopia"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T17:17:07.000Z",
		"audioBibles": []
	},
	//ARABIC
	{
		"id": "b17e246951402e50-01",
		"dblId": "b17e246951402e50",
		"relatedDbl": null,
		"name": "Biblica® Open New Arabic Version 2012",
		"nameLocal": "كتاب الحياة مجانى",
		"abbreviation": "ONAV",
		"abbreviationLocal": "KEHM",
		"description": "Holy Bible",
		"descriptionLocal": "ا‫لكتاب المقدس",
		"language": {
			"id": "arb",
			"name": "Arabic, Standard",
			"nameLocal": "العربية",
			"script": "Arabic",
			"scriptDirection": "RTL"
		},
		"countries": [
			{
				"id": "EG",
				"name": "Egypt",
				"nameLocal": "Egypt"
			},
			{
				"id": "SA",
				"name": "Saudi Arabia",
				"nameLocal": "Saudi Arabia"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T23:55:37.000Z",
		"audioBibles": []
	},
	//ARMENIAN MISSING
	//BULGARIAN MISSING
	//CROATIAN NEW TESTAMENT
	{
		"id": "b00de703b3d02a5a-01",
		"dblId": "b00de703b3d02a5a",
		"relatedDbl": null,
		"name": "Biblica® Open Croatian Living New Testament 2000",
		"nameLocal": "Biblica® Open Knjiga O Kristu",
		"abbreviation": "OKOK",
		"abbreviationLocal": "OKOK",
		"description": "New Testament",
		"descriptionLocal": "Novi Zavjet",
		"language": {
			"id": "hrv",
			"name": "Croatian",
			"nameLocal": "Hrvatski",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "HR",
				"name": "Croatia",
				"nameLocal": "Croatia"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T23:50:25.000Z",
		"audioBibles": []
	},
	//ENGISH
	{	
		"id": "de4e12af7f28f599-02",
		"dblId": "de4e12af7f28f599",
		"relatedDbl": null,
		"name": "King James (Authorised) Version",
		"nameLocal": "King James Version",
		"abbreviation": "engKJV",
		"abbreviationLocal": "KJV",
		"description": "Protestant",
		"descriptionLocal": "Protestant",
		"language": {
			"id": "eng",
			"name": "English",
			"nameLocal": "English",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "GB",
				"name": "United Kingdom of Great Britain and Northern Ireland",
				"nameLocal": "United Kingdom of Great Britain and Northern Ireland"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-29T04:04:35.000Z",
		"audioBibles": []
	},
	//FRENCH
	{
		"id": "a93a92589195411f-01",
		"dblId": "a93a92589195411f",
		"relatedDbl": null,
		"name": "Bible J.N. Darby",
		"nameLocal": "Bible J.N. Darby",
		"abbreviation": "JND",
		"abbreviationLocal": "JND",
		"description": "German (WLC for OT and NA for NT)",
		"descriptionLocal": "German (WLC pour l'AT et NA pour le NT)",
		"language": {
			"id": "fra",
			"name": "French",
			"nameLocal": "Français",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "FR",
				"name": "France",
				"nameLocal": "France"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T23:17:27.000Z",
		"audioBibles": []
	},
	//ITALIAN
	{
		"id": "41f25b97f468e10b-01",
		"dblId": "41f25b97f468e10b",
		"relatedDbl": null,
		"name": "Diodati Bible 1885",
		"nameLocal": "Diodati Bibbia 1885",
		"abbreviation": "DB1885",
		"abbreviationLocal": "DB1885",
		"description": "Diodati Bible 1885",
		"descriptionLocal": "Diodati Bibbia 1885",
		"language": {
			"id": "ita",
			"name": "Italian",
			"nameLocal": "Italiano",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "IT",
				"name": "Italy",
				"nameLocal": "Italy"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T16:51:00.000Z",
		"audioBibles": []
	},
	//LATVIAN MISSING
	//LITHUANIAN (ONLY Luke-Acts)
	{
		"id": "c6f92d2fda34d59d-01",
		"dblId": "c6f92d2fda34d59d",
		"relatedDbl": null,
		"name": "Biblica® Open Lithuanian Luke-Acts",
		"nameLocal": "Biblica® Naudojimo teisės atviros „Jėzus ir Jo pasekėjai“",
		"abbreviation": "OJJP",
		"abbreviationLocal": "OJJP",
		"description": "Protestant Luke-Acts",
		"descriptionLocal": "Protestant Luke-Acts",
		"language": {
			"id": "lit",
			"name": "Lithuanian",
			"nameLocal": "Lietuvių",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "LT",
				"name": "Lithuania",
				"nameLocal": "Lithuania"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-29T01:46:53.000Z",
		"audioBibles": []
	},
	//PERSIAN - IRANIAN
	{
		"id": "7cd100148df29c08-01",
		"dblId": "7cd100148df29c08",
		"relatedDbl": null,
		"name": "Biblica® Open Persian Contemporary Bible",
		"nameLocal": "ترجمۀ معاصر",
		"abbreviation": "OPCB",
		"abbreviationLocal": "OPCB",
		"description": "Holy Bible",
		"descriptionLocal": "کتاب‌مقدّس",
		"language": {
			"id": "pes",
			"name": "Persian, Iranian",
			"nameLocal": "فارسی",
			"script": "Arabic",
			"scriptDirection": "RTL"
		},
		"countries": [
			{
				"id": "IR",
				"name": "Iran, Islamic Republic of",
				"nameLocal": "Iran, Islamic Republic of"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T20:17:17.000Z",
		"audioBibles": []
	},
	//POLISH
	{
		"id": "1c9761e0230da6e0-01",
		"dblId": "1c9761e0230da6e0",
		"relatedDbl": null,
		"name": "Updated Gdansk Bible",
		"nameLocal": "UWSPÓŁCZEŚNIONA BIBLIA GDAŃSKA",
		"abbreviation": "polUBG",
		"abbreviationLocal": "UBG",
		"description": "Common",
		"descriptionLocal": "pospolity",
		"language": {
			"id": "pol",
			"name": "Polish",
			"nameLocal": "Polski",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "PL",
				"name": "Poland",
				"nameLocal": "Poland"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T14:46:38.000Z",
		"audioBibles": []
	},
	//PORTUGUESE
	{
		"id": "d63894c8d9a7a503-01",
		"dblId": "d63894c8d9a7a503",
		"relatedDbl": null,
		"name": "Biblia Livre Para Todos",
		"nameLocal": "Biblia Livre Para Todos",
		"abbreviation": "BLT",
		"abbreviationLocal": "BLT",
		"description": null,
		"descriptionLocal": null,
		"language": {
			"id": "por",
			"name": "Portuguese",
			"nameLocal": "Português",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "BR",
				"name": "Brazil",
				"nameLocal": "Brazil"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-29T03:13:31.000Z",
		"audioBibles": []
	},
	//PASHTO MISSING
	//ROMANIAN (INCOMPLETE)
	{
		"id": "33ac978af36830fa-02",
		"dblId": "33ac978af36830fa",
		"relatedDbl": null,
		"name": "Carpathian Romani 2021",
		"nameLocal": "Le Devleskero Lav Andre Romaňi Čhib Slovensko 2021",
		"abbreviation": "RMC",
		"abbreviationLocal": "RMC",
		"description": "The Carpathian Romani Bible. Contains full NT and parts of OT that have been completed. Protestant canon.",
		"descriptionLocal": "Le Devleskero Lav Andre Romaňi Čhib Slovensko 2021",
		"language": {
			"id": "rmc",
			"name": "Romani, Carpathian",
			"nameLocal": "Romanes",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "SK",
				"name": "Slovakia",
				"nameLocal": "Slovakia"
			},
			{
				"id": "CZ",
				"name": "Czechia",
				"nameLocal": "Czechia"
			},
			{
				"id": "UA",
				"name": "Ukraine",
				"nameLocal": "Ukraine"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T16:08:33.000Z",
		"audioBibles": [
			{
				"id": "f888eedc342711e7-01",
				"name": "Romani, Carpathian - The Word for the World Version (NT)",
				"nameLocal": "Romani, Carpathian - The Word for the World Version (NT)",
				"dblId": "f888eedc342711e7"
			}
		]
	},
	//SLOVAK (NT)
	{
		"id": "7d49326ef827c7d1-01",
		"dblId": "7d49326ef827c7d1",
		"relatedDbl": null,
		"name": "Biblica® Open Slovak Hope for All New Testament",
		"nameLocal": "Biblica® Nádej pre každého, verejne dostupné",
		"abbreviation": "ONPK",
		"abbreviationLocal": "ONPK",
		"description": "Protestant NT",
		"descriptionLocal": "Protestant NT",
		"language": {
			"id": "slk",
			"name": "Slovak",
			"nameLocal": "Slovenčina",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "SK",
				"name": "Slovakia",
				"nameLocal": "Slovakia"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T20:18:36.000Z",
		"audioBibles": []
	},
	//SPANISH
	{
		"id": "482ddd53705278cc-02",
		"dblId": "482ddd53705278cc",
		"relatedDbl": null,
		"name": "Versión Biblia Libre",
		"nameLocal": "Versión Biblia Libre",
		"abbreviation": "VBL",
		"abbreviationLocal": "VBL",
		"description": "Protestant",
		"descriptionLocal": "Protestant",
		"language": {
			"id": "spa",
			"name": "Spanish",
			"nameLocal": "Español",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "ES",
				"name": "Spain",
				"nameLocal": "Spain"
			},
			{
				"id": "MX",
				"name": "Mexico",
				"nameLocal": "Mexico"
			},
			{
				"id": "PY",
				"name": "Paraguay",
				"nameLocal": "Paraguay"
			},
			{
				"id": "CO",
				"name": "Colombia",
				"nameLocal": "Colombia"
			},
			{
				"id": "CL",
				"name": "Chile",
				"nameLocal": "Chile"
			},
			{
				"id": "EC",
				"name": "Ecuador",
				"nameLocal": "Ecuador"
			},
			{
				"id": "HN",
				"name": "Honduras",
				"nameLocal": "Honduras"
			},
			{
				"id": "NI",
				"name": "Nicaragua",
				"nameLocal": "Nicaragua"
			},
			{
				"id": "PE",
				"name": "Peru",
				"nameLocal": "Peru"
			},
			{
				"id": "PA",
				"name": "Panama",
				"nameLocal": "Panama"
			},
			{
				"id": "CU",
				"name": "Cuba",
				"nameLocal": "Cuba"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T17:10:29.000Z",
		"audioBibles": []
	},
	//TIGRINIA MISSING (Eritrea)
	//TURKISH
	{
		"id": "085defac6e17b9eb-01",
		"dblId": "085defac6e17b9eb",
		"relatedDbl": null,
		"name": "New Turkish Bible Translation (YTC)",
		"nameLocal": "Yeni Türkçe Kutsal Kitap Çevirisi (YTC)",
		"abbreviation": "turytc",
		"abbreviationLocal": "YTC",
		"description": "The Holy Bible in the Turkish Language, translated from the World English Bible",
		"descriptionLocal": "Kutsal İncil'in Türkçe dilinde, Dünya İngilizce İncil'inden tercümesi",
		"language": {
			"id": "tur",
			"name": "Turkish",
			"nameLocal": "Türkçe",
			"script": "Latin",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "TR",
				"name": "Turkey",
				"nameLocal": "Turkey"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-28T13:45:32.000Z",
		"audioBibles": []
	},
	//URDU
	{
		"id": "de0270810140edf9-01",
		"dblId": "de0270810140edf9",
		"relatedDbl": null,
		"name": "Indian Revised Version (IRV) Urdu - 2019",
		"nameLocal": "इंडियन रिवाइज्ड वर्जन (IRV) उर्दू - 2019",
		"abbreviation": "IRVUrd",
		"abbreviationLocal": "IRVUrd",
		"description": "Urdu Bible for All",
		"descriptionLocal": "Urdu Bible for All",
		"language": {
			"id": "urd",
			"name": "Urdu",
			"nameLocal": "اردو",
			"script": "Devanagari",
			"scriptDirection": "LTR"
		},
		"countries": [
			{
				"id": "IN",
				"name": "India",
				"nameLocal": "India"
			}
		],
		"type": "text",
		"updatedAt": "2024-06-29T03:58:31.000Z",
		"audioBibles": [
			{
				"id": "9e11d376e401469c-01",
				"name": "Urdu Indian Revised Version (IRV)",
				"nameLocal": "Urdu Indian Revised Version (IRV)",
				"dblId": "9e11d376e401469c"
			}
		]
	},
];


// Populate the book picker
window.addEventListener('DOMContentLoaded', () => {
	const bookSelect = document.getElementById('chapterBook');
	arrBible.forEach(book => {
		const option = document.createElement('option');
		option.value = book.book;
		option.textContent = book.translation || book.book;
		bookSelect.appendChild(option);
	});
});

function doSomething() {
	const bookSelect = document.getElementById('chapterBook');
	const selectedBook = bookSelect.value;
	const bookObj = arrBible.find(book => book.book === selectedBook);
	let output = `Selected Book: ${selectedBook}\nChapters: ${bookObj.chapters}`;
	if (bookObj.verses) {
		output += `\nVerses per chapter: ${bookObj.verses.join(', ')}`;
	}
	alert(output);
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