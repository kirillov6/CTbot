// Команда !rules отвечает за получение правил команды

// Импорт
const path = require('../utils/path');
const FS  = require('fs');


module.exports = {
    name: 'rules',
    description: 'Получить правила команды',
    args: false,

    execute(message, args) {
        
        // Считаем все правила
        var rules = FS.readFileSync(path.RULES, 'utf8');
        var splitRules = rules.split('-----');

        // Отправим на сервер
        splitRules.forEach(function(part, index) {
            message.channel.send(part);
            
            if (index != splitRules.length - 1)
                message.channel.send('👀');
        });
    }
};