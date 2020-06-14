// Вспомогательные телодвижения

// Импорт
const FS   = require('fs'); // File System
const path = require('./path'); // Пути
const str  = require('./str'); // Строки


// Эмоджи:)
var emojis = [
	'😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬','📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎','✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩',
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

        let filteredAnswers = answers.filter(el => {
            return el != '';
        });
        
        return filteredAnswers;
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
        
        message.delete({ timeout: time * 1000 }) // Удалим команду
        .catch(console.error);
    },

    // Получить рандомные эмоджи
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

    // Найти виртуалку по айдишнику
    GetLinuxCar: function(id) {
        
        // Проверим на корректный формат
        carID = Number(id);
        if (isNaN(carID)) {
            utils.MsgReplyAndDelete(message, str.COMMAND_BADFORMAT_ARGS);
            return null;
        };

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
    TakeLinuxCar: function(car, user) {
        
        // Получим данные из файла
        let LinuxCars = JSON.parse(FS.readFileSync(path.LINUXCARS));
        
        // Получим ключ
        let carKey = this.GetLinuxCarKey(car);

        // Изменим данные
        LinuxCars[carKey].Free = false;
        LinuxCars[carKey].CurrentUser = user;

        // Сохраним измененные данные
        FS.writeFileSync(path.LINUXCARS, JSON.stringify(LinuxCars, null, 4));
    },

    // Освободить виртуалку
    FreeLinuxCar: function(car) {
        
        // Получим данные из файла
        let LinuxCars = JSON.parse(FS.readFileSync(path.LINUXCARS));
        
        // Получим ключ
        let carKey = this.GetLinuxCarKey(car);

        // Изменим данные
        LinuxCars[carKey].Free = true;
        LinuxCars[carKey].CurrentUser = "";

        // Сохраним измененные данные
        FS.writeFileSync(path.LINUXCARS, JSON.stringify(LinuxCars, null, 4));
    },
}
