// Команда !poll отвечает за проведение голосований

// Импорт
const { prefix, max_poll_answers } = require('../config/config.json');
const str        = require('../utils/str');
const utils      = require('../utils/utils');


module.exports = {
    name: 'poll',
    description: 'Провести голосование',

    execute(message, args) {
        
        switch (args.length) {
            case 0:
                message.reply(str.POLL_HELP)
                .then(msg => {msg.delete({ timeout: 10000 }) }) // Удалим ответ
                .then(() => message.delete({ timeout: 10000 })) // Удалим команду
                .catch(console.error);
                break;
            case 1:
                // Добавим текст голосования
                message.channel.send(str.POLL_EMOJI + '  **' + args[0] + '**')
                // Добавим реакты
                .then(async messageReaction => {
                    await messageReaction.react('👍');
                    await messageReaction.react('👎');
                    await messageReaction.react('🤷‍♂️');
                    
                    // Удалим команду
                    message.delete({ timeout: 1000 })
                    .catch(console.error);
                });
                break;
            case 2:
                // Получим варианты ответа
                let answers = args[1].split(';');
                
                // Проверим, сколько непустых вариантов ответа
                let answersCount = utils.CheckPollEmptyAnswers(answers);

                // Если все варианты ответа были пустые, то сообщим
                if (!answersCount)
                {
                    message.reply(str.POLL_EMPTY_ANSWERS);
                    return;
                };

                // Если вариантов ответа больше допустимых, то сообщим
                if (answersCount > max_poll_answers) {
                    message.reply(str.POLL_OVERFLOW_ANSWERS);
                    return;
                };

                // Добавим текст голосования
                message.channel.send(str.POLL_EMOJI + '  **' + args[0] + '**')
                // Добавим реакты
                .then(messageReaction => {
                    let curIndex = 0;
                    
                    answers.forEach(function(part, index, object) {
                        if (part.length){
                            let emoji = ':regional_indicator_' + String.fromCharCode('a'.charCodeAt(0) + curIndex++) + ':';
                            messageReaction.react(emoji);
                        };                            
                    });
                    
                    // Удалим команду
                    message.delete({ timeout: 1000 })
                    .catch(console.error);
                });                
                break;
            default:
                message.reply(str.COMMAND_OVERFLOW);
                break;
        }
    }
};