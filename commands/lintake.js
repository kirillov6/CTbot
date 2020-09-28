// Команда !lintake отвечает за "взятие" виртуалки

// Импорт
const { isNull } = require('util');
const str = require('../utils/str');
const utils = require('../utils/utils');


module.exports = {
    name: 'lintake',
    description: 'Занять Linux виртуалку',
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

        // Если виртуалка уже занята, то сообщим
        if (currentUser.userID)
            return utils.MsgReplyAndDelete(message, `${str.LINCAR_BUSY} [${currentUser.userName}]`);
        
        // Получим данные автора
        const member = message.guild.member(message.author);
        const memberId = member ? member.id : -1;
        const memberName = member ? member.displayName : str.BAD_MEMBERNAME;

        // Займем виртуалку
        await utils.TakeLinuxCar(carID, memberId, memberName);

        // Отправим на канал
        message.channel.send(`**${memberName}** занял(а) виртуалку #${carID}`);
    }
};