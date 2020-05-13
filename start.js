var colors = require('colors');
var fs = require('fs'),
path = require('path'), //работа с путями файлов
dir = process.cwd(), // текущая директория
files = fs.readdirSync(dir); // считываем все файлы из текущего каталога в синхронном режиме, т.к. надо сперва получить список, а потом приступить к анализу



console.log('Name \t Size \t Date \t');

files.forEach(function(filename){
	var fullName = path.join(dir, filename),
	stats = fs.statSync(fullName); // пишем информацию о текущем файле
	
	if(stats.isDirectory()) {
		console.log(filename + '\t DIR \t' + stats.mtime + '\n');
	} else {
		console.log(filename + '\t' + stats.size + '\t' + stats.mtime + '\n');
	}
	
});

process.on('exit', function(){
	console.log('bye');
});