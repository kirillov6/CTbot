// Команда !linfree отвечает за "освобождение" виртуалки

// Импорт
const { isNull } = require('util');
const str = require('../utils/str');
const utils = require('../utils/utils');
const config = require('../json/config.json');
const path = require('../utils/path');


module.exports = {
    name: 'linfree',
    description: 'Освободить Linux виртуалку',
    args: true,
    max_args: 1,

    execute(message, args) {
        
        // Проверим аргумент на корректность
        carID = Number(args[0]);
        if (isNaN(carID))
            return utils.MsgReplyAndDelete(message, str.COMMAND_BADFORMAT_ARGS);

        // Найдем виртуалку
        let car = utils.GetLinuxCar(args[0], path.LINUXCARS);

        // Проверим, есть ли такая виртуалка
        if (isNull(car))
            return utils.MsgReplyAndDelete(message, str.LININFO_BAD_ID);

        // Скачаем файл о статусе занятости из гугл-диска
        utils.DownloadGoogleDriveFile(config.linStatusFileId, path.TMP_LINUXCARS_STATUS);

        // Получим данные о занятости виртуалки
        let carStatus = utils.GetLinuxCar(args[0], path.TMP_LINUXCARS_STATUS);

        // Получим текущего пользователя
        currentUser = carStatus.CurrentUser;

        // Если виртуалка уже свободна, то сообщим
        if (!currentUser.ID)
            return utils.MsgReplyAndDelete(message, str.LINCAR_FREE);

        // Получим данные автора
        const member = message.guild.member(message.author);
        const memberId = member ? member.id : -1;
        const memberName = member ? member.displayName : str.BAD_MEMBERNAME;

        // Проверим, может ли автор освободить виртуалку
        if (currentUser.ID != memberId)
            return utils.MsgReplyAndDelete(message, str.LINCAR_FREE_BADUSER);

        // Освободим виртуалку
        utils.FreeLinuxCar(car);

        // Отправим на канал
        message.channel.send(`**${memberName}** освободил виртуалку #${carID}`);
    }
};