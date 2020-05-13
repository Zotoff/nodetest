var readline = require('readline'),
    argv = require('minimist')(process.argv.slice(2)),
    fs = require('fs'),
    mind, count, rl, logfile;

function init() {
    mind = Math.floor(Math.random()*10) + 1;
    count = 0;
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    logfile = argv['_'][0]; // запомним имя файла для логов если есть
}

function game() {
    function log(data){
        if(logfile != undefined) {
            fs.appendFile(logfile, data + "\n");
        }
    }

    function valid(value) {
        if(isNaN(value)) {
            console.log('Введите число');
            return false;
        }
        if(value < 1 || value > 10) {
            console.log('Введите число в заданном диапазоне');
            return false;
        }
        return true;
    }
}

rl.question('Введите любое число от до 10, чтобы угадать задуманное', function(value){
    var a = +value;
    if(!valid(a)) {
        game();
    } else {
        count += 1;
        if(a === mind) {
            console.log('Вы угадали число за %d шаг(ов)', count);
            log('Число угадано за ' + count + 'шагов');
            rl.close();
        } else {
            console.log('Не угадали, еще попытка');
            game();
        }
    }
});

init();
game();