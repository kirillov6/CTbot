// Команда !poll отвечает за проведение голосований

// Импорт
const str   = require('../utils/str');
const utils = require('../utils/utils');


module.exports = {
    name: 'poll',
    description: 'Провести голосование',
    args: true,
    max_args: 2,

    execute(message, args) {
        
        switch (args.length) {
            case 1:
                // Добавим текст голосования
                message.channel.send(str.POLL_EMOJI + '  **' + args[0] + '**')
                // Добавим реакты
                .then(async messageReaction => {
                    await messageReaction.react('👍');
                    await messageReaction.react('👎');
                    await messageReaction.react('🤷‍♂️');
                })
                .catch(console.error);
                break;
            case 2:
                // Получим варианты ответа
                let answers = args[1].split(';');
                
                // Почистим список ответов от пустых
                answers = utils.CheckPollEmptyAnswers(answers);

                // Если все варианты ответа были пустые, то сообщим
                if (!answers.length)
                    return utils.MsgReplyAndDelete(message, str.POLL_EMPTY_ANSWERS, 6);

                // Получим необходимое количество рандомных эмоджи
                let randomEmojis = utils.GetRandomEmojis(answers.length);

                // Добавим текст голосования
                message.channel.send(str.POLL_EMOJI + '  **' + args[0] + '**')
                // Добавим реакты
                .then(messageReaction => {
                    answers.forEach(async function(part, index) {
                        await messageReaction.react(randomEmojis[index]);                         
                    });
                })
                .catch(console.error);
                break;
            default:
                break;
        }
    }
};