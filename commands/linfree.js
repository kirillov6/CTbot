// Команда !linfree отвечает за "освобождение" виртуалки

// Импорт
const str     = require('../utils/str');
const utils   = require('../utils/utils');
const { isNull } = require('util');


module.exports = {
    name: 'linfree',
    description: 'Освободить Linux виртуалку',
    args: true,
    max_args: 1,

    execute(message, args) {
        
        // Найдем виртуалку
        let car = utils.GetLinuxCar(args[0]);

        // Проверим, есть ли такая виртуалка
        if (isNull(car))
            return utils.MsgReplyAndDelete(message, str.LININFO_BAD_ID);

        // Если виртуалка уже свободна, то сообщим
        if (car.Free)
            return utils.MsgReplyAndDelete(message, str.LINCAR_FREE);

        // Получим имя автора
        const member = message.guild.member(message.author);
        const nickname = member ? member.displayName : str.BAD_MEMBERNAME;

        // Проверим, может ли автор освободить виртуалку
        if (car.CurrentUser != nickname)
            return utils.MsgReplyAndDelete(message, str.LINCAR_FREE_BADUSER);

        // Освободим виртуалку
        utils.FreeLinuxCar(car);

        // Отправим на канал
        message.channel.send(`**${nickname}** освободил виртуалку #${carID}`);
    }
};