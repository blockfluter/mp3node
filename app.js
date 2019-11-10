const express = require('express')
const app = express()
const port = 3000
const filescan = require('filescan');

app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('mp3'))
app.use(express.static('client'))
app.listen(port)

const basedir = './mp3/';

const makeSortkey = (v) => {
	var matches = v.path.match(/20\d{2}/);
	const year = matches ? matches[0] : 0;
	matches = v.path.match(/(fall|winter|spring)/i);
	const season = { fall: 3, winter: 1, spring: 2 }[matches ? matches[0].toLowerCase() : ''];
	matches = v.path.match(/(batc|one day workshop)/i);
	const event = { batc: 3, 'one day workshop': 2 }[matches ? matches[0].toLowerCase() : ''];
	matches = v.path.match(/\/(\d{2})-/);
	const track = 99 - Number(matches ? matches[1] : '00');
	return `${year}.${season ? season : 0}.${event ? event : 0}.${track}.${v.file ? 0 : 1}`;
}
const addAttributes = (v) => {
	return {
		...v,
		file: v.file ? v.file.replace('.mp3', '') : null,
		path: v.path.replace(basedir, ''),
		download: `/download/${v.path.replace(basedir, '')}`,
		sortkey: makeSortkey(v)
	}
}

app.get('/', (req, res) => {
	const items = filescan(basedir, basedir).map(addAttributes).sort((a, b) => a.sortkey > b.sortkey ? -1 : 1);

	res.render('index', { title: 'Player', items: items })
})
app.get('/download/:folder/:file', function (req, res) {
	const file = `${__dirname}/mp3/${req.params.folder}/${req.params.file}`;
	res.download(file);
})
