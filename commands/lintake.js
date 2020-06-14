// Команда !lintake отвечает за "взятие" виртуалки

// Импорт
const str     = require('../utils/str');
const utils   = require('../utils/utils');
const { isNull } = require('util');


module.exports = {
    name: 'lintake',
    description: 'Занять Linux виртуалку',
    args: true,
    max_args: 1,

    execute(message, args) {
        
        // Найдем виртуалку
        let car = utils.GetLinuxCar(args[0]);

        // Проверим, есть ли такая виртуалка
        if (isNull(car))
            return utils.MsgReplyAndDelete(message, str.LININFO_BAD_ID);

        // Если виртуалка уже занята, то сообщим
        if (!car.Free)
            return utils.MsgReplyAndDelete(message, `${str.LINCAR_BUSY} [${car.CurrentUser}]`);
        
        // Получим имя автора
        const member = message.guild.member(message.author);
        const nickname = member ? member.displayName : str.BAD_MEMBERNAME;

        // Займем виртуалку
        utils.TakeLinuxCar(car, nickname)

        // Отправим на канал
        message.channel.send(`**${nickname}** занял виртуалку #${carID}`);
    }
};