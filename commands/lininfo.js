// Команда !lininfo отвечает за получение информации о конкретной Linux виртуалке

// Импорт
const Discord = require('discord.js');
const str = require('../utils/str');
const utils = require('../utils/utils');


module.exports = {
    name: 'lininfo',
    description: 'Получить информацию о конкретной Linux виртуалке',
    turnedOn: true,   // Включить/Выключить доступность команды
    args: true,     // Есть ли аргументы
    min_args: 1,    // Минимальное количество аргументов
    max_args: 1,    // Максимальное количество аргументов

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

        // Создадим блок с информацией
        const carEmbed = new Discord.MessageEmbed()
            .setColor('#ED685F')
            .setTitle(`**Виртуалка #${carID}**`)
            .setTimestamp();

        // Добавим поля в блок
        carEmbed.addFields(
            {
                name: '**Тип**',
                value: car.Type
            },
            {
                name: '**IP**',
                value: car.Ip
            },
            {
                name: '**Логин**',
                value: car.Login
            },
            {
                name: '**Пароль**',
                value: car.Password
            }
        );

        // Добавим состояние
        if (currentUser.userID)
            carEmbed.addField('**Состояние**', `Занята [${currentUser.userName}]`);
        else
            carEmbed.addField('**Состояние**', 'Свободна');

        // Отправим на канал
        message.channel.send({embed: carEmbed});
    }
};