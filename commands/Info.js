// import {
//     Command,
//     CommandMessage
// } from '@typeit/discord';
// import {
//     MessageEmbed,
//     MessageAttachment
// } from 'discord.js'
// import fs = require('fs');
// import { Consts } from '../utils/Const';
// import { Utils } from '../utils/Utils';
// interface Link {
//     Description: string;
//     Link: string;
// }
// interface LinkGroup {
//     Name: string,
//     Links: Link[];
// }
// interface RepoInfo {
//     Database: string,
//     Server: string,
//     Login: string,
//     Password: string,
//     CheckRegister: boolean
// }
// export abstract class Info {
//     @Command('links')
//     async links(message: CommandMessage) {
//         // Получим данные из файла
//         let Links = <LinkGroup[]>JSON.parse(fs.readFileSync(`${process.cwd()}/res/json/links.json`).toString());
//         // Пробежимся по всем группам ссылок
//         for (var groupKey in Links) {
//             if (Links.hasOwnProperty(groupKey)) {
//                 // Получим группу ссылок
//                 let LinkGroup = Links[groupKey];
//                 // Получим наименование группы
//                 var title = `**${LinkGroup.Name}**`;
//                  // Создадим блок с информацией
//                  const linksEmbed = new MessageEmbed()
//                  .setTitle(title)
//                  .setColor('#F7D065');
//                 var links = "";
//                 // Добавим каждую ссылку из группы
//                 for (var linkKey in LinkGroup.Links) {
//                     if (LinkGroup.Links.hasOwnProperty(linkKey)) {
//                         // Получим ссылку
//                         var link = LinkGroup.Links[linkKey];
//                         // Добавим ссылку
//                         if (link.Link.startsWith("\\\\"))
//                             links += `${linkKey}. ${link.Description}:\n\\${link.Link}\n`;
//                         else
//                             links += `${linkKey}. [${link.Description}](${link.Link})\n`;
//                     };
//                 };
//                 // Добавим ссылки
//                 linksEmbed.setDescription(links);
//                 // Отправим сообщение на канал
//                 await message.channel.send({ embed : linksEmbed });
//             };
//         };
//     }
//     @Command('repo')
//     async repo(message: CommandMessage) {
//         // Получим данные из файла
//         let RepoInfo = <RepoInfo>JSON.parse(fs.readFileSync(`${process.cwd()}/res/json/repo.json`).toString());
//         // Создадим блок с информацией
//         const repoEmbed = new MessageEmbed()
//             .setColor('#F59E42')
//             .setTitle('Информация о репозитории')
//             .setTimestamp();
//         // Добавим поля в блок
//         repoEmbed.addFields(
//             {
//                 name: '**БД**',
//                 value: RepoInfo.Database
//             },
//             {
//                 name: '**Сервер**',
//                 value: RepoInfo.Server
//             },
//             {
//                 name: '**Логин**',
//                 value: RepoInfo.Login
//             },
//             {
//                 name: '**Пароль**',
//                 value: RepoInfo.Password
//             }
//         );
//         // Добавим чек "Учитывать регистр"
//         if (RepoInfo.CheckRegister)
//             repoEmbed.addField('Чек "Учитывать регистр"', '✅');
//         else
//             repoEmbed.addField('Чек "Учитывать регистр"', '⛔️');
//         // Отправим на канал
//         await message.channel.send({embed: repoEmbed});
//     }
//     @Command('rules :command')
//     async rules(message: CommandMessage) {
//         var filePath = '';
//         switch (message.args.length) {
//             case 0:
//                 filePath = `${process.cwd()}/res/txt/rules.txt`;
//                 break;
//             case 1:
//                 const { command } = message.args;
//                 if (command == 'dev')
//                     filePath = `${process.cwd()}/res/txt/rules_dev.txt`;
//                 else if (command == 'vis')
//                     filePath = `${process.cwd()}/res/txt/rules_vis.txt`;
//                 else {
//                     Utils.msgReplyAndDelete(message, Consts.Str.COMMAND_BADFORMAT_ARGS);
//                     return;
//                 }
//                 break;
//             default:
//                 Utils.msgReplyAndDelete(message, Consts.Str.COMMAND_OVERFLOW_ARGS);
//                 return;
//         }
//         // Считаем все правила
//         var rules = fs.readFileSync(filePath, 'utf8');
//         // Если длина файла больше допустимой, обрежем и отправим частями
//         if (rules.length >= 2000)
//         {
//             var splitRules = rules.split('\n');
//             var res: string[] = [];
//             var oneMsg = '';
//             splitRules.forEach(part => {
//                 var tmp = oneMsg + part + '\n';
//                 if (tmp.length >= 2000)
//                 {
//                     res.push(oneMsg);
//                     oneMsg = part + '\n';
//                 }
//                 else
//                     oneMsg = tmp;
//             });
//             if (oneMsg.length > 0)
//                 res.push(oneMsg);
//             res.forEach(async function(part) {
//                 await message.channel.send(part);
//             });
//         }
//         else
//             await message.channel.send(rules);
//     }
//     @Command('scheme')
//     async scheme(message: CommandMessage) {
//         // Создадим вложение
//         const attach = new MessageAttachment(`${__dirname}/res/img/${Consts.File.WI_SCHEME}`);
//         // Отправим на канал
//         await message.channel.send(attach);
//     }
// }
