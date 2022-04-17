import {
    MessageEmbed,
    MessageAttachment
} from "discord.js"

import { 
    Discord,
    SimpleCommand,
    SimpleCommandMessage,
    SimpleCommandOption
 } from "discordx";

import fs = require('fs');
import { Str, File } from '../utils/consts';
import { Utils } from '../utils/utils';

interface Link {
    Description: string;
    Link: string;
}

interface LinkGroup {
    Name: string,
    Links: Link[];
}

interface RepoInfo {
    Database: string,
    Server: string,
    Login: string,
    Password: string,
    CheckRegister: boolean
}


@Discord()
export abstract class Info {
    @SimpleCommand("links", { 
        description: "Список полезных ссылок"
    })
    async links(command: SimpleCommandMessage) {
        // Получим данные из файла
        let Links = <LinkGroup[]>JSON.parse(fs.readFileSync(`${__dirname}/../res/json/links.json`).toString());

        // Пробежимся по всем группам ссылок
        for (var groupKey in Links) {
            if (Links.hasOwnProperty(groupKey)) {
                // Получим группу ссылок
                let LinkGroup = Links[groupKey];
                
                // Получим наименование группы
                var title = `**${LinkGroup.Name}**`;
                
                 // Создадим блок с информацией
                 const linksEmbed = new MessageEmbed()
                 .setTitle(title)
                 .setColor('#F7D065');

                var links = "";
                // Добавим каждую ссылку из группы
                for (var linkKey in LinkGroup.Links) {
                    if (LinkGroup.Links.hasOwnProperty(linkKey)) {
                        // Получим ссылку
                        var link = LinkGroup.Links[linkKey];

                        // Добавим ссылку
                        if (link.Link.startsWith("\\\\"))
                            links += `${linkKey}. ${link.Description}:\n\\${link.Link}\n`;
                        else
                            links += `${linkKey}. [${link.Description}](${link.Link})\n`;
                    };
                };

                // Добавим ссылки
                linksEmbed.setDescription(links);

                // Отправим сообщение на канал
                await command.message.channel.send({ embeds: [linksEmbed] });
            };
        };
    }

    @SimpleCommand("repo", { 
        description: "Данные командного репозитория"
    })
    repo(command: SimpleCommandMessage) {
        // Получим данные из файла
        let RepoInfo = <RepoInfo>JSON.parse(fs.readFileSync(`${__dirname}/../res/json/repo.json`).toString());

        // Создадим блок с информацией
        const repoEmbed = new MessageEmbed()
            .setColor('#F59E42')
            .setTitle('Информация о репозитории')
            .setTimestamp();

        // Добавим поля в блок
        repoEmbed.addFields(
            {
                name: '**БД**',
                value: RepoInfo.Database
            },
            {
                name: '**Сервер**',
                value: RepoInfo.Server
            },
            {
                name: '**Логин**',
                value: RepoInfo.Login
            },
            {
                name: '**Пароль**',
                value: RepoInfo.Password
            }
        );

        // Добавим чек "Учитывать регистр"
        if (RepoInfo.CheckRegister)
            repoEmbed.addField('Чек "Учитывать регистр"', '✅');
        else
            repoEmbed.addField('Чек "Учитывать регистр"', '⛔️');

        // Отправим на канал
        command.message.channel.send({ embeds: [repoEmbed] });
    }

    @SimpleCommand("rules", { 
        description: "Правила команд"
    })
    async rules(
        @SimpleCommandOption("team", { type: "STRING" }) team: string | undefined,
        command: SimpleCommandMessage
    ) {
        const message = command.message;
        const cwd = __dirname + "/..";

        var filePath = "";

        if (team) {
            if (team == "dev")
                filePath = `${cwd}/res/txt/rules_dev.txt`;
            else if (team == 'vis')
                filePath = `${cwd}/res/txt/rules_vis.txt`;
            else
                return Utils.msgReplyAndDelete(message, Str.COMMAND_BADFORMAT_ARGS);
        }
        else {
            filePath = `${cwd}/res/txt/rules.txt`;
        }

        // Считаем все правила
        var rules = fs.readFileSync(filePath, "utf8");

        const maxMessageLength = 2000; // Максимально допустимая длина сообщения

        // Если длина файла больше допустимой, обрежем и отправим частями
        if (rules.length >= maxMessageLength)
        {
            var splitRules = rules.split("\n");

            var res: string[] = [];
            var oneMsg = "";
            splitRules.forEach(part => {
                
                var tmp = oneMsg + part + "\n";
                if (tmp.length >= maxMessageLength)
                {
                    res.push(oneMsg);
                    oneMsg = part + '\n';
                }
                else
                    oneMsg = tmp;
            });

            if (oneMsg.length > 0)
                res.push(oneMsg);

            res.forEach(async function(part) {
                await message.channel.send(part);
            });
        }
        else
            message.channel.send(rules);
    }
}