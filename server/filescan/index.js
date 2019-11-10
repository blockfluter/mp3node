"use strict"

const fs = require('fs')

const filescan = (basedir, dir, filelist) => {
	const files = fs.readdirSync(dir);
	filelist = filelist || [];
	files.forEach((file) => {
		const path = `${dir}${file}`;
		if (fs.statSync(path).isDirectory()) {
			filelist.push({ path: path.replace(basedir,''), file: null });
			filelist = filescan(basedir, `${path}/`, filelist);
		}
		else {
			filelist.push({ path: path.replace(basedir,''), file });
		}
	});
	return filelist;
}

module.exports = filescan
