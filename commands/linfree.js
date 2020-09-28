// Команда !linfree отвечает за "освобождение" виртуалки

// Импорт
const str = require('../utils/str');
const utils = require('../utils/utils');
const config = require('../json/config.json');
const path = require('../utils/path');


module.exports = {
    name: 'linfree',
    description: 'Освободить Linux виртуалку',
    args: true,
    min_args: 1,
    max_args: 1,

    async execute(message, args) {
        
        // Проверим аргумент на корректность
        carID = Number(args[0]);
        if (isNaN(carID))
            return utils.MsgReplyAndDelete(message, str.COMMAND_BADFORMAT_ARGS);

        // Найдем виртуалку
        let car = utils.GetLinuxCar(carID);

        // Проверим, есть ли такая виртуалка
        if (car === null)
            return utils.MsgReplyAndDelete(message, str.LININFO_BAD_ID);

        // Получим текущего пользователя
        const currentUser = await utils.GetLinuxCurrentUser(carID);

        // Если виртуалка уже свободна, то сообщим
        if (!currentUser.userID)
            return utils.MsgReplyAndDelete(message, str.LINCAR_FREE);

        // Получим данные автора
        const member = message.guild.member(message.author);
        const memberId = member ? member.id : -1;
        const memberName = member ? member.displayName : str.BAD_MEMBERNAME;

        // Проверим, может ли автор освободить виртуалку
        if (currentUser.userID != memberId)
            return utils.MsgReplyAndDelete(message, str.LINCAR_FREE_BADUSER);

        // Освободим виртуалку
        await utils.FreeLinuxCar(carID);

        // Отправим на канал
        message.channel.send(`**${memberName}** освободил(а) виртуалку #${carID}`);
    }
};