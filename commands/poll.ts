import { 
    Discord,
    SimpleCommand,
    SimpleCommandMessage
 } from "discordx";

import { MessageEmbed } from 'discord.js'
import { Str } from "../utils/consts";
import { Utils } from "../utils/utils";

const { prefix } = require('../config.json');

@Discord()
export abstract class Poll {
    @SimpleCommand("poll", { 
        description: "Создание голосования"
    })
    poll(command: SimpleCommandMessage) {
        let message = command.message;

        let args = message.content.slice(prefix.length).match(/"(\\.|[^"\\])*"/g); // Регулярное выражние - берем все подстроки в кавычках

        if (!args)
            return Utils.msgReplyAndDelete(message, Str.COMMAND_NOTENOUGH_ARGS);

        // Удаление кавычек из аргументов
        if (args) {
            args.forEach(function(_, index) {
                args[index] = args[index].replace(/"/g, '');
            });
        };

        if (!args[0].length || (args.length > 1 && !args[1].length))
            return Utils.msgReplyAndDelete(message, Str.COMMAND_BADFORMAT_ARGS);
        
        if (args.length > 2)
            return Utils.msgReplyAndDelete(message, Str.COMMAND_OVERFLOW_ARGS);

        const pollHeading = `${Str.POLL_EMOJI}  **${args[0]}**`;
        
        if (args.length == 1) {
            // Добавим текст голосования
            message.channel.send(pollHeading)
            // Добавим реакции
            .then(async pollMsg => {
                await pollMsg.react('👍');
                await pollMsg.react('👎');
                await pollMsg.react('🤷‍♂️');
            })
            .catch(error => { console.error(error) });
        }
        else {
            // Получим варианты ответа
            let answerslist = args[1].split(';');
            
            // Почистим список ответов от пустых
            answerslist = answerslist.filter(el => {
                return el != '';
            });

            // Если все варианты ответа были пустые, то сообщим
            if (!answerslist.length)
                return Utils.msgReplyAndDelete(message, Str.POLL_EMPTY_ANSWERS);

            // Получим необходимое количество рандомных эмоджи
            const randomEmojis = GetRandomEmojis(answerslist.length);

            // Получим варианты ответа
            let strAnswers = '';
            answerslist.forEach(function(part, index) {
                strAnswers += `${randomEmojis[index]} ${part}\n`
            });

            // Создадим блок с информацией
            const pollEmbed = new MessageEmbed()
                .setColor('#92D7A5')
                .setDescription(strAnswers)
                .setTimestamp();

            // Добавим текст голосования
            message.channel.send({ content: pollHeading, embeds: [pollEmbed] })
            // Добавим реакты
            .then(pollMsg => {
                answerslist.forEach(async function(_, index) {
                    await pollMsg.react(randomEmojis[index]);                         
                });
            })
            .catch(error => { console.error(error) });
        }
    }
}


// Эмоджи:)
const emojis = [
	'😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞',
    '😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷',
    '😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳',
    '👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿',
    '😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨',
    '👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏',
    '☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅',
    '👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙',
    '💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘',
    '💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷',
    '🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜',
    '🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕',
    '🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁',
    '🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔',
    '🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄',
    '⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁',
    '🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠',
    '📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑',
    '🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪',
    '💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬',
    '📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎',
    '✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬',
    '🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽',
    '⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼',
    '🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚',
    '🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏',
    '🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣',
    '🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅',
    '🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞',
    '🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓',
    '🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨',
    '🗿','🎪','🎭','📍','🚩'
];

// Получить 'count' рандомных эмоджи
function GetRandomEmojis(count: number) {
    let result = [];
    let copyEmojis = emojis;

    for (let i = 0; i < count; i++) {
        let emojiIndex = Math.floor(Math.random() * copyEmojis.length); // Получим индекс
        result.push(copyEmojis[emojiIndex]); // Добавим в результат
        copyEmojis.splice(emojiIndex, 1); // Удалим, чтобы не повторялось
    };
    
    return result;
}