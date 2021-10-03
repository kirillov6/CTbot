"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linux = void 0;
const tslib_1 = require("tslib");
const discord_1 = require("@typeit/discord");
const discord_js_1 = require("discord.js");
const fs = require("fs");
const Const_1 = require("../utils/Const");
const Utils_1 = require("../utils/Utils");
const LinuxCarsFile = `${process.cwd()}/res/json/linuxcars.json`;
const { linStatusSheetIndex } = require('./config.json');
class Linux {
    async linStatus(message) {
        // Получим данные о виртуалках из файла
        const LinuxCars = JSON.parse(fs.readFileSync(LinuxCarsFile).toString());
        // Получим данные о состоянии занятости виртуалок из Google-таблицы
        const LinuxCurrentUsers = await this.getLinuxAllUsers();
        // Создадим блок с информацией
        const linEmbed = new discord_js_1.MessageEmbed()
            .setColor('#DB97D9')
            .setTitle('Состояние виртуалок Linux')
            .setTimestamp();
        // Добавим поля в блок
        for (var key in LinuxCars) {
            if (LinuxCars.hasOwnProperty(key)) {
                let car = LinuxCars[key];
                let fieldText = "";
                if (car.Addition)
                    fieldText = `**(${car.Addition})**\n`;
                let currentUser = LinuxCurrentUsers[car.ID - 1];
                if (currentUser.userId)
                    fieldText += `⛔️ Занята [${currentUser.userName}]`;
                else
                    fieldText += '✅ Свободна';
                linEmbed.addField(`***[${car.ID}] ${car.Type} ${car.Ip}***`, fieldText);
            }
            ;
        }
        ;
        // Отправим на канал
        message.channel.send({ embed: linEmbed });
    }
    async linInfo(message) {
        const { carId } = message.args;
        if (!(typeof carId === 'number')) {
            Utils_1.Utils.msgReplyAndDelete(message, Const_1.Consts.Str.COMMAND_BADFORMAT_ARGS);
            return;
        }
        // Найдем виртуалку
        let car = await this.getLinuxCar(carId);
        // Проверим, есть ли такая виртуалка
        if (car === null) {
            Utils_1.Utils.msgReplyAndDelete(message, Const_1.Consts.Str.LININFO_BAD_ID);
            return;
        }
        // Получим текущего пользователя
        const currentUser = await this.getLinuxCurrentUser(carId);
        // Создадим блок с информацией
        const carEmbed = new discord_js_1.MessageEmbed()
            .setColor('#ED685F')
            .setTitle(`**Виртуалка #${carId}**`)
            .setTimestamp();
        // Добавим информацию о виртуалке
        carEmbed.addFields({
            name: '**Тип**',
            value: car.Type
        }, {
            name: '**IP**',
            value: car.Ip
        });
        // Добавим дополнительную информацию
        if (car.Addition)
            carEmbed.addField('**Дополнительно**', `${car.Addition}`);
        // Добавим данные пользователей
        if (car.Admin)
            carEmbed.addField('**Данные администратора**', `Логин: ${car.Admin.Login}\nПароль: ${car.Admin.Password}`);
        if (car.User)
            carEmbed.addField('**Данные пользователя**', `Логин: ${car.User.Login}\nПароль: ${car.User.Password}`);
        // Добавим состояние
        if (currentUser.userId)
            carEmbed.addField('**Состояние**', `Занята [${currentUser.userName}]`);
        else
            carEmbed.addField('**Состояние**', 'Свободна');
        // Отправим на канал
        message.channel.send({ embed: carEmbed });
    }
    async linTake(message) {
        const { carId } = message.args;
        if (!(typeof carId === 'number')) {
            Utils_1.Utils.msgReplyAndDelete(message, Const_1.Consts.Str.COMMAND_BADFORMAT_ARGS);
            return;
        }
        // Найдем виртуалку
        let car = await this.getLinuxCar(carId);
        // Проверим, есть ли такая виртуалка
        if (car === null) {
            Utils_1.Utils.msgReplyAndDelete(message, Const_1.Consts.Str.LININFO_BAD_ID);
            return;
        }
        // Получим текущего пользователя
        const currentUser = await this.getLinuxCurrentUser(carId);
        // Если виртуалка уже занята, то сообщим
        if (currentUser.userId) {
            Utils_1.Utils.msgReplyAndDelete(message, `${Const_1.Consts.Str.LINCAR_BUSY} [${currentUser.userName}]`);
            return;
        }
        // Получим данные автора
        const member = message.guild.member(message.author);
        const memberId = member ? member.id : '-1';
        const memberName = member ? member.displayName : Const_1.Consts.Str.BAD_MEMBERNAME;
        // Займем виртуалку
        await this.updateLinuxCurrentUser(carId, memberId, memberName);
        // Отправим на канал
        message.channel.send(`**${memberName}** занял(а) виртуалку #${carId}`);
    }
    async linFree(message) {
        const { carId } = message.args;
        if (!(typeof carId === 'number')) {
            Utils_1.Utils.msgReplyAndDelete(message, Const_1.Consts.Str.COMMAND_BADFORMAT_ARGS);
            return;
        }
        // Найдем виртуалку
        let car = await this.getLinuxCar(carId);
        // Проверим, есть ли такая виртуалка
        if (car === null) {
            Utils_1.Utils.msgReplyAndDelete(message, Const_1.Consts.Str.LININFO_BAD_ID);
            return;
        }
        // Получим текущего пользователя
        const currentUser = await this.getLinuxCurrentUser(carId);
        // Если виртуалка уже свободна, то сообщим
        if (!currentUser.userId)
            return Utils_1.Utils.msgReplyAndDelete(message, Const_1.Consts.Str.LINCAR_FREE);
        // Получим данные автора
        const member = message.guild.member(message.author);
        const memberId = member ? member.id : -1;
        const memberName = member ? member.displayName : Const_1.Consts.Str.BAD_MEMBERNAME;
        // Проверим, может ли автор освободить виртуалку
        if (currentUser.userId != memberId)
            return Utils_1.Utils.msgReplyAndDelete(message, Const_1.Consts.Str.LINCAR_FREE_BADUSER);
        // Освободим виртуалку
        await this.updateLinuxCurrentUser(carId, "", "");
        // Отправим на канал
        message.channel.send(`**${memberName}** освободил(а) виртуалку #${carId}`);
    }
    // Получить всех текущих пользователей виртуалок из Google-таблицы
    async getLinuxAllUsers() {
        // Получим нужный лист
        const sheet = await Utils_1.Utils.getGoogleSheet(linStatusSheetIndex);
        // Получим все строки
        const rows = await sheet.getRows();
        let allUsers = [];
        rows.forEach(row => {
            allUsers.push({
                userId: row.UserID,
                userName: row.UserName
            });
        });
        return allUsers;
    }
    // Получить текущего пользователя виртуалки из Google-таблицы
    async getLinuxCurrentUser(carId) {
        // Получим всех пользователей
        const allUsers = await this.getLinuxAllUsers();
        return allUsers[carId - 1];
    }
    // Обновить информацию о текущем пользователе виртуалки в Google-таблице
    async updateLinuxCurrentUser(carId, userId, userName) {
        // Получим нужный лист
        const sheet = await Utils_1.Utils.getGoogleSheet(linStatusSheetIndex);
        // Получим все строки
        const rows = await sheet.getRows();
        // Изменим необходимую строку
        rows[carId - 1].UserId = userId;
        rows[carId - 1].UserName = userName;
        await rows[carId - 1].save();
    }
    // Найти виртуалку по айдишнику
    async getLinuxCar(carId) {
        // Получим данные из файла
        let LinuxCars = JSON.parse(fs.readFileSync(LinuxCarsFile).toString());
        // Найдем виртуалку
        for (var key in LinuxCars) {
            if (LinuxCars.hasOwnProperty(key)) {
                let car = LinuxCars[key];
                if (car.ID == carId)
                    return car;
            }
        }
        return null;
    }
}
(0, tslib_1.__decorate)([
    (0, discord_1.Command)('linstatus'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_1.CommandMessage]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], Linux.prototype, "linStatus", null);
(0, tslib_1.__decorate)([
    (0, discord_1.Command)('lininfo :carId'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_1.CommandMessage]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], Linux.prototype, "linInfo", null);
(0, tslib_1.__decorate)([
    (0, discord_1.Command)('lintake :carId'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_1.CommandMessage]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], Linux.prototype, "linTake", null);
(0, tslib_1.__decorate)([
    (0, discord_1.Command)('linfree :carId'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_1.CommandMessage]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], Linux.prototype, "linFree", null);
exports.Linux = Linux;
