import {
    Command,
    CommandMessage
} from '@typeit/discord';

import { MessageEmbed } from 'discord.js'

import fs = require('fs');
import { Consts } from '../utils/Const';
import { Utils } from '../utils/Utils';


const LinuxCarsFile = `${process.cwd()}/res/json/linuxcars.json`;
const { linStatusSheetIndex } = require('./config.json');


interface LinuxUser {
    userId?: string;
    userName?: string;
}

interface LinuxCar {
    ID: number,
    Type: string,
    Addition?: string,
    Ip: string,
    Admin: {
        Login: string,
        Password: string
    },
    User?: {
        Login: string,
        Password: string
    }
}

export abstract class Linux {
    @Command('linstatus')
    private async linStatus(message: CommandMessage) {
        // Получим данные о виртуалках из файла
        const LinuxCars = JSON.parse(fs.readFileSync(LinuxCarsFile).toString());

        // Получим данные о состоянии занятости виртуалок из Google-таблицы
        const LinuxCurrentUsers = await this.getLinuxAllUsers();

        // Создадим блок с информацией
        const linEmbed = new MessageEmbed()
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
            };
        };

        // Отправим на канал
        message.channel.send({embed: linEmbed});
    }

    @Command('lininfo :carId')
    private async linInfo(message: CommandMessage) {
        const { carId } = message.args;
        if (!(typeof carId === 'number')) {
            Utils.msgReplyAndDelete(message, Consts.Str.COMMAND_BADFORMAT_ARGS);
            return;
        }

        // Найдем виртуалку
        let car = await this.getLinuxCar(carId);

        // Проверим, есть ли такая виртуалка
        if (car === null) {
            Utils.msgReplyAndDelete(message, Consts.Str.LININFO_BAD_ID);
            return;
        }

        // Получим текущего пользователя
        const currentUser = await this.getLinuxCurrentUser(carId);

        // Создадим блок с информацией
        const carEmbed = new MessageEmbed()
            .setColor('#ED685F')
            .setTitle(`**Виртуалка #${carId}**`)
            .setTimestamp();

        // Добавим информацию о виртуалке
        carEmbed.addFields(
            {
                name: '**Тип**',
                value: car.Type
            },
            {
                name: '**IP**',
                value: car.Ip
            }
        );

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
        message.channel.send({embed: carEmbed});
    }

    @Command('lintake :carId')
    private async linTake(message: CommandMessage) {
        const { carId } = message.args;
        if (!(typeof carId === 'number')) {
            Utils.msgReplyAndDelete(message, Consts.Str.COMMAND_BADFORMAT_ARGS);
            return;
        }

        // Найдем виртуалку
        let car = await this.getLinuxCar(carId);

        // Проверим, есть ли такая виртуалка
        if (car === null) {
            Utils.msgReplyAndDelete(message, Consts.Str.LININFO_BAD_ID);
            return;
        }

        // Получим текущего пользователя
        const currentUser = await this.getLinuxCurrentUser(carId);

        // Если виртуалка уже занята, то сообщим
        if (currentUser.userId) {
            Utils.msgReplyAndDelete(message, `${Consts.Str.LINCAR_BUSY} [${currentUser.userName}]`);
            return;
        }
        
        // Получим данные автора
        const member = message.guild.member(message.author);
        const memberId = member ? member.id : '-1';
        const memberName = member ? member.displayName : Consts.Str.BAD_MEMBERNAME;

        // Займем виртуалку
        await this.updateLinuxCurrentUser(carId, memberId, memberName);

        // Отправим на канал
        message.channel.send(`**${memberName}** занял(а) виртуалку #${carId}`);
    }

    @Command('linfree :carId')
    private async linFree(message: CommandMessage) {
        const { carId } = message.args;
        if (!(typeof carId === 'number')) {
            Utils.msgReplyAndDelete(message, Consts.Str.COMMAND_BADFORMAT_ARGS);
            return;
        }

        // Найдем виртуалку
        let car = await this.getLinuxCar(carId);

        // Проверим, есть ли такая виртуалка
        if (car === null) {
            Utils.msgReplyAndDelete(message, Consts.Str.LININFO_BAD_ID);
            return;
        }

        // Получим текущего пользователя
        const currentUser = await this.getLinuxCurrentUser(carId);

        // Если виртуалка уже свободна, то сообщим
        if (!currentUser.userId)
            return Utils.msgReplyAndDelete(message, Consts.Str.LINCAR_FREE);

        // Получим данные автора
        const member = message.guild.member(message.author);
        const memberId = member ? member.id : -1;
        const memberName = member ? member.displayName : Consts.Str.BAD_MEMBERNAME;

        // Проверим, может ли автор освободить виртуалку
        if (currentUser.userId != memberId)
            return Utils.msgReplyAndDelete(message, Consts.Str.LINCAR_FREE_BADUSER);

        // Освободим виртуалку
        await this.updateLinuxCurrentUser(carId, "", "");

        // Отправим на канал
        message.channel.send(`**${memberName}** освободил(а) виртуалку #${carId}`);
    }


    // Получить всех текущих пользователей виртуалок из Google-таблицы
    private async getLinuxAllUsers(): Promise<LinuxUser[]> {
        // Получим нужный лист
        const sheet = await Utils.getGoogleSheet(linStatusSheetIndex);

        // Получим все строки
        const rows = await sheet.getRows();

        let allUsers: LinuxUser[] = [];
        rows.forEach(row => {
            allUsers.push({
                userId: row.UserID,
                userName: row.UserName
            });
        });

        return allUsers;
    }
    
    // Получить текущего пользователя виртуалки из Google-таблицы
    private async getLinuxCurrentUser(carId: number): Promise<LinuxUser> {
        // Получим всех пользователей
        const allUsers = await this.getLinuxAllUsers();

        return allUsers[carId - 1];
    }

    // Обновить информацию о текущем пользователе виртуалки в Google-таблице
    private async updateLinuxCurrentUser(carId: number, userId: string, userName: string) {
        // Получим нужный лист
        const sheet = await Utils.getGoogleSheet(linStatusSheetIndex);

        // Получим все строки
        const rows = await sheet.getRows();

        // Изменим необходимую строку
        rows[carId - 1].UserId = userId;
        rows[carId - 1].UserName = userName;
        await rows[carId - 1].save();
    }

    // Найти виртуалку по айдишнику
    private async getLinuxCar(carId): Promise<LinuxCar> {
        // Получим данные из файла
        let LinuxCars = JSON.parse(fs.readFileSync(LinuxCarsFile).toString());

        // Найдем виртуалку
        for (var key in LinuxCars) {
            if (LinuxCars.hasOwnProperty(key)) {
                let car = LinuxCars[key];
                if (car.ID == carId)
                    return <LinuxCar>car;
            }
        }

        return null;
    }
}