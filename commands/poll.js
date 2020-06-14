// Команда !poll отвечает за проведение голосований

// Импорт
const str     = require('../utils/str');
const utils   = require('../utils/utils');
const Discord = require('discord.js');


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
                    return utils.MsgReplyAndDelete(message, str.POLL_EMPTY_ANSWERS);

                // Получим необходимое количество рандомных эмоджи
                let randomEmojis = utils.GetRandomEmojis(answers.length);

                // Получим варианты ответа
                let strAnswers = '';
                answers.forEach(function(part, index) {
                    strAnswers += `${randomEmojis[index]} ${part}\n`
                });

                // Создадим блок с информацией
                const pollEmbed = new Discord.MessageEmbed()
                    .setColor('#92D7A5')
                    .setDescription(strAnswers)
                    .setTimestamp();

                // Добавим текст голосования
                message.channel.send(`${str.POLL_EMOJI}  **${args[0]}**`, {
                    embed : pollEmbed
                })
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