var TelegramBot = require('node-telegram-bot-api');
var token = '407746111:AAHVdXn2hC0jh7pxuMDUptgMpm7hRi_FQGw';
var bot = new TelegramBot(token, {polling: true});

function sum(){
    if(digits.length >= 2){
        return digits[0] + digits[1];
    }

    return 0;
}
function mul(){
    if(digits.length >= 2){
        return digits[0] * digits[1];
    }

    return 0;
}
function sub(){
    if(digits.length >= 2){
        return digits[0] - digits[1];
    }

    return 0;
}
function div(){
    if(digits.length >= 2){
        return digits[0] / digits[1];
    }

    return 0;
}

let commands = ['/sum', '/mul', '/sub', '/div', '/start'];
let operations = [
    {command: '/sum', operation: sum},
    {command: '/mul', operation: mul},
    {command: '/sub', operation: sub},
    {command: '/div', operation: div}
]
let hints = [
    {command: '', text: 'Введіть перше число'}, 
    {command: '', text: 'Введіть друге число'}, 
    {command: '', text: 'Не вірні вхідні дані. Введіть число'}, 
    {command: '', text: 'Команда не вибрана! Виберіть команду.'}, 
    {command: '/sum', text: 'Сума: '}, 
    {command: '/mul', text: 'Добуток: '}, 
    {command: '/sub', text: 'Різниця: '}, 
    {command: '/div', text: 'Частка: '}
];

let previewCommand = '';

let d1 = 0;
let d2 = 0;
let digits = [];
bot.onText(/\/sum/, function onPhotoText(msg) {
    //console.log(msg);
    var chatId = msg.chat.id;
    previewCommand = msg.text;
    digits = [];
    bot.sendMessage(chatId, hints[0].text, {caption: "I'm a bot!"});
});

bot.onText(/\/mul/, function onPhotoText(msg) {
    //console.log(msg);
    var chatId = msg.chat.id;
    previewCommand = msg.text;
    digits = [];
    bot.sendMessage(chatId, hints[0].text, {caption: "I'm a bot!"});
});

bot.onText(/\/sub/, function onPhotoText(msg) {
    //console.log(msg);
    var chatId = msg.chat.id;
    previewCommand = msg.text;
    digits = [];
    bot.sendMessage(chatId, hints[0].text, {caption: "I'm a bot!"});
});

bot.onText(/\/div/, function onPhotoText(msg) {
    //console.log(msg);
    var chatId = msg.chat.id;
    previewCommand = msg.text;
    digits = [];
    bot.sendMessage(chatId, hints[0].text, {caption: "I'm a bot!"});
});

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    if(commands.includes(msg.text) === false){      
        let a = +msg.text;
        if(!isNaN(a)){
            digits.push(a);
            
            if(digits.length === 1){
                bot.sendMessage(chatId, `${hints[1].text}`, {caption: "I'm a bot!"});
            }
            else if(digits.length === 2){
                for(let i = 0; i < operations.length; i++){
                    if(operations[i].command === previewCommand){

                        let result =  operations[i].operation();
                        
                        let text = '';
                        for(let i = 0; i < hints.length; i++){
                            if(hints[i].command === previewCommand){
                                text = hints[i].text;
                                break;
                            }
                        }

                        if(text !== ''){
                            previewCommand = '';
                            bot.sendMessage(chatId, `\n${text} ${result}`, {caption: "I'm a bot!"});
                        }
                        break;
                    }
                }
            }
        }
        else if (previewCommand !== ''){
            bot.sendMessage(chatId, `${hints[2].text}`, {caption: "I'm a bot!"});
        }  
        else {
            bot.sendMessage(chatId, `${hints[3].text}`, {caption: "I'm a bot!"});
        }                 
    }   
});