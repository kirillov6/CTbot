// Вспомогательные телодвижения

// Импорт
const FS = require('fs'); // File System
const path = require('./path'); // Пути
const config = require('../config.json');
const googleSheet = require('google-spreadsheet');


// Эмоджи:)
var emojis = [
	'😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞',
    '😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷',
    '😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳',
    '👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿',
    '😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨',
    '👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏',
    '☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅',
    '👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙',
    '💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘',
    '💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷',
    '🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜',
    '🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕',
    '🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁',
    '🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔',
    '🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄',
    '⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁',
    '🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠',
    '📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑',
    '🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪',
    '💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬',
    '📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎',
    '✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬',
    '🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽',
    '⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼',
    '🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚',
    '🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏',
    '🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣',
    '🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅',
    '🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞',
    '🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓',
    '🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨',
    '🗿','🎪','🎭','📍','🚩'
];

module.exports = {

    // Подключение всех обработчиков событий
    LoadEvents: function(Client) {
        const eventFiles = FS.readdirSync(path.EVENTS).filter(file => file.endsWith('.js'));

        eventFiles.forEach(file => {
            const eventHandler = require(`${path.EVENTS}/${file}`); // Файл обработчика
            const eventName = file.split('.')[0]; // Имя обработчика
            Client.on(eventName, (...args) => eventHandler(Client, ...args)); // Подключение обработки события
        });
    },

    // Заполнение коллекции команд
    FillCommands: function(commands) {
        const commandFiles = FS.readdirSync(path.COMMANDS).filter(file => file.endsWith('.js'));

        commandFiles.forEach(file => {
            const command = require(`${path.COMMANDS}/${file}`); // Файл команды
	        commands.set(command.name, command); // Добавление команды в коллекцию
        });
    },

    // Определить аргументы для команды Poll
    GetPollArgs: function(message) {
        let args = message.content.match(/"(\\.|[^"\\])*"/g); // Регулярное выражние - берем все подстроки в кавычках

        // Удаление кавычек из аргументов
        if (args && args.length) {
            args.forEach(function(part, index) {
                args[index] = args[index].replace(/"/g, '');
            });
        };

        return args;
    },

    // Проверить варианты ответов голосования
    CheckPollEmptyAnswers: function(answers) {
        return answers.filter(el => {
            return el != '';
        });
    },

    // Ответить и удалить ответ вместе с сообщением
    MsgReplyAndDelete: function(message, reply, time = 6){
        message.reply(reply)
            .then(msg => {msg.delete({ timeout: time * 1000 }) }) // Удалим ответ
            .then(() => message.delete({ timeout: time * 1000 })) // Удалим команду
            .catch(console.error);
    },

    // Удалить сообщение
    MsgDelete: function(message, time){
        message.delete({ timeout: time * 1000 })
            .catch(console.error);
    },

    // Получить 'count' рандомных эмоджи
    GetRandomEmojis: function(count) {
        let result = [];
        let copyEmojis = emojis;

        for (let i = 0; i < count; i++) {
            emojiIndex = Math.floor(Math.random() * copyEmojis.length); // Получим индекс
            result.push(copyEmojis[emojiIndex]); // Добавим в результат
            copyEmojis.splice(emojiIndex, 1); // Удалим, чтобы не повторялось
        };
        
        return result;
    },

    // Получить лист из Google-таблицы
    GetGoogleSheet: async function(sheetIndex) {
        // Получим Google-таблицу
        const doc = new googleSheet.GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);

        // Параметры доступа
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_CREDITIONALS_EMAIL,
            private_key: process.env.GOOGLE_CREDITIONALS_KEY,
        });

        // Загрузим инфу таблицы
        await doc.loadInfo();

        // Вернем нужный лист
        return doc.sheetsByIndex[sheetIndex];
    },

    // Получить всех текущих пользователей виртуалок из Google-таблицы
    GetLinuxAllUsers: async function() {
        // Получим нужный лист
        const sheet = await this.GetGoogleSheet(config.linStatusSheetIndex);

        // Получим все строки
        const rows = await sheet.getRows();

        let allUsers = [];
        rows.forEach(row => {
            allUsers.push({
                userID: row.UserID,
                userName: row.UserName
            });
        });

        return allUsers;
    },
    
    // Получить текущего пользователя виртуалки из Google-таблицы
    GetLinuxCurrentUser: async function(carID) {
        // Получим всех пользователей
        const allUsers = await this.GetLinuxAllUsers();

        return allUsers[carID - 1];
    },

    // Обновить информацию о текущем пользователе виртуалки в Google-таблице
    UpdateLinuxCurrentUser: async function(carID, userID, userName) {
        // Получим нужный лист
        const sheet = await this.GetGoogleSheet(config.linStatusSheetIndex);

        // Получим все строки
        const rows = await sheet.getRows();

        // Изменим необходимую строку
        rows[carID - 1].UserID = userID;
        rows[carID - 1].UserName = userName;
        await rows[carID - 1].save();
    },

    // Найти виртуалку по айдишнику
    GetLinuxCar: function(carID) {
        // Получим данные из файла
        let LinuxCars = JSON.parse(FS.readFileSync(path.LINUXCARS));

        // Найдем виртуалку
        for (var key in LinuxCars) {
            if (LinuxCars.hasOwnProperty(key)) {
                let car = LinuxCars[key];
                if (car.ID == carID) {
                    return car;
                };
            };
        };

        return null;
    },

    // Найти ключ виртуалки
    GetLinuxCarKey: function(car) {
        // Получим данные из файла
        let LinuxCars = JSON.parse(FS.readFileSync(path.LINUXCARS));
        
        // Найдем ключ
        for (var key in LinuxCars) {
            tmpCar = LinuxCars[key];
            if (LinuxCars.hasOwnProperty(key) && JSON.stringify(car) === JSON.stringify(tmpCar)) {
                return key;
            };
        };

        return null;
    },

    // Занять виртуалку
    TakeLinuxCar: async function(carID, userID, userName) {
        // Изменим данные в Google-таблице
        await this.UpdateLinuxCurrentUser(carID, userID, userName);
    },

    // Освободить виртуалку
    FreeLinuxCar: async function(carId) {
        // Изменим данные в Google-таблице
        await this.UpdateLinuxCurrentUser(carID, "", "");
    },
}