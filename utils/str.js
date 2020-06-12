// Строковые константы

const { max_poll_answers } = require('../config/config.json');


module.exports = {

    POLL_HELP                   : 'Введите, пожалуйста, аргументы голосования. Например:\n' +
                                  '1) !poll "Нравится ли вам работа в нашей команде?"\n' +
                                  '2) !poll "Сколько будет 2 + 2 * 2?" "8;6;Не знаю"',

    POLL_EMOJI                  : ':scales:',

    POLL_EMPTY_ANSWERS          : 'Укажите хотя бы 1 вариант ответа',

    POLL_OVERFLOW_ANSWERS       : `Количество вариантов ответа превышает максимальное (${max_poll_answers})`,

    // Формируется так: *Тип действия* *активность*
    // Типы действий: WATCHING, PLAYING, STREAMING, LISTENING
    BOT_ACTIVITY                : 'критичные баги',
    BOT_ACTIVITY_TYPE           : 'WATCHING',
    
    COMMAND_NOT_SUPPORT         : 'Данная команда не поддерживается',

    COMMAND_OVERFLOW            : 'Вы ввели слишком много аргументов',

    COMMAND_ERROR               : 'При выполнении команды произошла ошибка!',
}



