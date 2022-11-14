
import { 
    Discord,
    SimpleCommand,
    SimpleCommandMessage,
    SimpleCommandOption
} from "discordx";

import { MessageEmbed } from "discord.js"
import fs = require('fs');
import { Str } from '../utils/consts';
import { Helpers } from '../utils/helpers';

const VMFile = `${__dirname}/../res/json/virtualmachines.json`;
const { VMStatusSheetIndex } = require('../config.json');


interface VMUser {
    userId?: string;
    userName?: string;
}

interface VM {
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

@Discord()
export abstract class VirtualMachines {
    description = "Работа с виртуальными машинами";

    @SimpleCommand("vmstatus", { 
        description: "Состояние виртуальных машин"
    })
    async vmStatus(command: SimpleCommandMessage) {
        // Отправим на канал
        command.message.channel.send({ embeds: [await this.getVMStatus()] });
    }

    @SimpleCommand("vminfo", { 
        description: "Данные виртуальной машины"
    })
    async vmInfo(
        @SimpleCommandOption("id", { type: "INTEGER" }) id: number,
        command: SimpleCommandMessage
    ) {
        const message = command.message;

        if (!id)
            return Helpers.msgReplyAndDelete(message, Str.COMMAND_NOTENOUGH_ARGS);

        // Найдем виртуалку
        let vm = await this.getVM(id);

        // Проверим, есть ли такая виртуалка
        if (!vm)
            return Helpers.msgReplyAndDelete(message, Str.VMINFO_BAD_ID);

        // Получим текущего пользователя
        const currentUser = await this.getVMCurrentUser(id);

        // Создадим блок с информацией
        const vmEmbed = new MessageEmbed()
            .setColor('#ED685F')
            .setTitle(`**Виртуалка #${id}**`)
            .setTimestamp();

        // Добавим информацию о виртуалке
        vmEmbed.addFields(
            {
                name: '**Тип**',
                value: vm.Type
            },
            {
                name: '**IP**',
                value: vm.Ip
            }
        );

        // Добавим дополнительную информацию
        if (vm.Addition)
            vmEmbed.addField('**Дополнительно**', `${vm.Addition}`);

        // Добавим данные пользователей
        if (vm.Admin)
            vmEmbed.addField('**Данные администратора**', `Логин: ${vm.Admin.Login}\nПароль: ${vm.Admin.Password}`);

        if (vm.User)
        vmEmbed.addField('**Данные пользователя**', `Логин: ${vm.User.Login}\nПароль: ${vm.User.Password}`);

        // Добавим состояние
        if (currentUser.userId)
            vmEmbed.addField('**Состояние**', `Занята [${currentUser.userName}]`);
        else
            vmEmbed.addField('**Состояние**', 'Свободна');

        // Отправим на канал
        message.channel.send({ embeds: [vmEmbed] });
    }

    @SimpleCommand("vmtake", { 
        description: "Занять виртуальную машину"
    })
    async vmTake(
        @SimpleCommandOption("id", { type: "INTEGER" }) id: number,
        command: SimpleCommandMessage
    ) {
        let message = command.message;

        if (!id)
            return Helpers.msgReplyAndDelete(message, Str.COMMAND_NOTENOUGH_ARGS);

        // Найдем виртуалку
        let vm = await this.getVM(id);

        // Проверим, есть ли такая виртуалка
        if (!vm)
            return Helpers.msgReplyAndDelete(message, Str.VMINFO_BAD_ID);

        // Получим текущего пользователя
        const currentUser = await this.getVMCurrentUser(id);

        // Если виртуалка уже занята, то сообщим
        if (currentUser.userId)
            return Helpers.msgReplyAndDelete(message, `${Str.VM_BUSY} [${currentUser.userName}]`);
        
        // Получим данные автора
        message.guild.members.fetch(message.author)
            .then(async member => {
                const memberId = member ? member.id : "-1";
                const memberName = member ? member.displayName : Str.BAD_MEMBERNAME;

                // Займем виртуалку
                await this.updateVMCurrentUser(id, memberId, memberName);

                // Отправим на канал
                await message.channel.send(`**${memberName}** занял(а) виртуалку #${id}`);

                // Отправим статус виртуалок на канал
                await message.channel.send({ embeds: [await this.getVMStatus()] });
            })
            .catch(err => { console.error(err) });
    }

    @SimpleCommand("vmfree", { 
        description: "Освободить виртуальную машину"
    })
    async vmFree(
        @SimpleCommandOption("id", { type: "INTEGER" }) id: number,
        command: SimpleCommandMessage
    ) {
        const message = command.message;

        if (!id)
            return Helpers.msgReplyAndDelete(message, Str.COMMAND_NOTENOUGH_ARGS);

        // Найдем виртуалку
        let vm = await this.getVM(id);

        // Проверим, есть ли такая виртуалка
        if (!vm)
            return Helpers.msgReplyAndDelete(message, Str.VMINFO_BAD_ID);

        // Получим текущего пользователя
        const currentUser = await this.getVMCurrentUser(id);

        // Если виртуалка уже свободна, то сообщим
        if (!currentUser.userId)
            return Helpers.msgReplyAndDelete(message, Str.VM_FREE);

        // Получим данные автора
        message.guild.members.fetch(message.author)
            .then(async member => {
                const memberId = member ? member.id : "-1";
                const memberName = member ? member.displayName : Str.BAD_MEMBERNAME;

                // Проверим, может ли автор освободить виртуалку
                if (currentUser.userId != memberId)
                    return Helpers.msgReplyAndDelete(message, Str.VM_FREE_BADUSER);

                // Освободим виртуалку
                await this.updateVMCurrentUser(id, "", "");

                // Отправим на канал
                await message.channel.send(`**${memberName}** освободил(а) виртуалку #${id}`);

                // Отправим статус виртуалок на канал
                await message.channel.send({ embeds: [await this.getVMStatus()] });
            })
            .catch(err => { console.error(err) });
    }


    // Получить всех текущих пользователей виртуалок из Google-таблицы
    private async getVMAllUsers(): Promise<VMUser[]> {
        // Получим нужный лист
        const sheet = await Helpers.getGoogleSheet(VMStatusSheetIndex);

        // Получим все строки
        const rows = await sheet.getRows();

        let allUsers: VMUser[] = [];
        rows.forEach(row => {
            allUsers.push({
                userId: row.UserID,
                userName: row.UserName
            });
        });

        return allUsers;
    }
    
    // Получить текущего пользователя виртуалки из Google-таблицы
    private async getVMCurrentUser(vmId: number): Promise<VMUser> {
        // Получим всех пользователей
        const allUsers = await this.getVMAllUsers();

        return allUsers[vmId - 1];
    }

    // Обновить информацию о текущем пользователе виртуалки в Google-таблице
    private async updateVMCurrentUser(vmId: number, userId: string, userName: string) {
        // Получим нужный лист
        const sheet = await Helpers.getGoogleSheet(VMStatusSheetIndex);

        // Получим все строки
        const rows = await sheet.getRows();

        // Изменим необходимую строку
        rows[vmId - 1].UserID = userId;
        rows[vmId - 1].UserName = userName;
        await rows[vmId - 1].save();
    }

    // Найти виртуалку по айдишнику
    private async getVM(vmId: number): Promise<VM> {
        // Получим данные из файла
        let VMs = JSON.parse(fs.readFileSync(VMFile).toString());

        // Найдем виртуалку
        for (var key in VMs) {
            if (VMs.hasOwnProperty(key)) {
                let vm = VMs[key];
                if (vm.ID == vmId)
                    return <VM>vm;
            }
        }

        return null;
    }

    private async getVMStatus() : Promise<MessageEmbed> {
        // Получим данные о виртуалках из файла
        const VMs = JSON.parse(fs.readFileSync(VMFile).toString());

        // Получим данные о состоянии занятости виртуалок из Google-таблицы
        const VMCurrentUsers = await this.getVMAllUsers();

        // Создадим блок с информацией
        const vmEmbed = new MessageEmbed()
            .setColor('#DB97D9')
            .setTitle('Состояние виртуальных машин')
            .setTimestamp();

        // Добавим поля в блок
        for (var key in VMs) {
            if (VMs.hasOwnProperty(key)) {
                let vm = VMs[key];

                let fieldText = "";
                if (vm.Addition)
                    fieldText = `**(${vm.Addition})**\n`;

                let currentUser = VMCurrentUsers[vm.ID - 1];
                if (currentUser.userId)
                    fieldText += `⛔️ Занята [${currentUser.userName}]`;
                else
                    fieldText += '✅ Свободна';
                
                    vmEmbed.addField(`***[${vm.ID}] ${vm.Type} ${vm.Ip}***`, fieldText);
            };
        };

        return vmEmbed;
    }
}