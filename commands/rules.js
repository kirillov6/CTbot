// Команда !rules отвечает за получение правил команды

// Импорт
const path = require('../utils/path');
const str = require('../utils/str')
const FS = require('fs');
const utils = require('../utils/utils');


module.exports = {
    name: 'rules',
    description: 'Получить правила команды',
    args: true,
    min_args: 0,
    max_args: 1,

    execute(message, args) {
        
        var filePath = "";

        switch (args.length) {
            case 0:
                filePath = path.RULES;
                break;
            case 1:
                if (args[0] == "dev")
                    filePath = path.RULES_DEV;
                else if (args[0] == "vis")
                    filePath = path.RULES_VIS;
                else
                    return utils.MsgReplyAndDelete(message, str.COMMAND_BADFORMAT_ARGS);
                break;
        }

        // Считаем все правила
        var rules = FS.readFileSync(filePath, 'utf8');

        // Если длина файла больше допустимой, обрежем и отправим частями
        if (rules.length >= 2000)
        {
            var splitRules = rules.split("\n");

            var res = [];
            var oneMsg = "";
            splitRules.forEach(function(part) {
                
                var tmp = oneMsg + part + "\n";
                if (tmp.length >= 2000)
                {
                    res.push(oneMsg);
                    oneMsg = part + "\n";
                }
                else
                    oneMsg = tmp;
            });

            if (oneMsg.length > 0)
                res.push(oneMsg);

            res.forEach(function(part) {
                message.channel.send(part);
            });
        }
        else
            message.channel.send(rules);        
    }
};