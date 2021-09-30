// Команда !lintake отвечает за "взятие" виртуалки

// Импорт
const str = require('../utils/str');
const utils = require('../utils/utils');


module.exports = {
    name: 'lintake',
    description: 'Занять Linux виртуалку',
    turnedOn: true,     // Включить/Выключить доступность команды
    args: true,         // Есть ли аргументы
    min_args: 1,        // Минимальное количество аргументов
    max_args: 1,        // Максимальное количество аргументов

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
        await TakeLinuxCar(carID, memberId, memberName);

        // Отправим на канал
        message.channel.send(`**${memberName}** занял(а) виртуалку #${carID}`);
    }
};


// Занять виртуалку
async function TakeLinuxCar(carID, userID, userName) {
    // Изменим данные в Google-таблице
    await utils.UpdateLinuxCurrentUser(carID, userID, userName);
}