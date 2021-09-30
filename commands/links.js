// Команда !links отвечает за получение списка полезных ссылок

// Импорт
const path    = require('../utils/path');
const Discord = require('discord.js');
const FS      = require('fs');


module.exports = {
    name: 'links',
    description: 'Получить список полезных ссылок',
    turnedOn: true,     // Включить/Выключить доступность команды
    args: false,        // Есть ли аргументы

    async execute(message, args) {
        
        // Получим данные из файла
        let Links = JSON.parse(FS.readFileSync(path.LINKS));

        // Пробежимся по всем группам ссылок
        for (var groupKey in Links) {
            if (Links.hasOwnProperty(groupKey)) {
                // Получим группу ссылок
                let LinkGroup = Links[groupKey];
                
                // Получим наименование группы
                var title = `**${LinkGroup.Name}**`;
                
                 // Создадим блок с информацией
                 const linksEmbed = new Discord.MessageEmbed()
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
                await message.channel.send({ embed : linksEmbed });
            };
        };
    }
};