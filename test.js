const ora = require('ora');
const chalkAnimation = require('chalk-animation');
const { setInterval } = require('timers');

const spinner = ora(' ');
const rainbow = chalkAnimation.rainbow('Lorem ipsum dolor sit amet').stop();

// const s = setInterval(function () {
//     spinner.text = rainbow.frame().substring(11);
//     spinner.render();
//     // spinner.succeed();
// }, 50);


var ProgressBar = require('progress');

var len = parseInt(res.headers['content-length'], 10);

console.log();
var bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: len
});

res.on('data', function (chunk) {
    bar.tick(chunk.length);
});

res.on('end', function () {
    console.log('\n');
});

// setTimeout(() => {
//     // clearInterval(s);
//     spinner.succeed();
// }, 1000);