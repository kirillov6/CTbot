// Вспомогательные телодвижения

// Импорт
const FS = require('fs'); // File System
const path = require('./path'); // Пути
const str = require('./str'); // Строки
const {google} = require('googleapis');
const googleCreditionals = require('../json/GoogleCreditionals.json');
const config = require('../json/config.json');


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

    // Получить сервисы гугл-диска
    GetGoogleService: function() {

        const scopes = [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/drive.appdata',
            'https://www.googleapis.com/auth/drive.scripts',
            'https://www.googleapis.com/auth/drive.metadata'
        ];

        const auth = new google.auth.JWT(
            googleCreditionals.client_email, null,
            googleCreditionals.private_key, scopes
        );

        return google.drive({ version: "v3", auth });
    },

    // Получение файла из гугл-диска
    DownloadGoogleDriveFile: function(fileId, destination) {

        const drive = this.GetGoogleService();

        drive.files
            .get({fileId, alt: 'media'}, {responseType: 'stream'})
            .then(res => async function() {
                return await new Promise((resolve, reject) => {
                    let dest = FS.createWriteStream(destination);
                    res.data.pipe(dest);

                    res.data.on("error", (err) => {
                        reject(err);
                    });
                    dest.on("finish", function() {
                        resolve();
                    });
                });    
            });
    },

    // Обновить файл на гугл-диске
    UpdateGoogleDriveFile: function(fileId, destination) {

        const drive = this.GetGoogleService();

        const media = {
            mimeType: 'application/json',
            body: FS.createReadStream(destination)
        };

        drive.files.update({
            fileId: fileId,
            media: media
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
    GetLinuxCar: function(id, pathFile) {
        
        // Проверим на корректный формат
        carID = Number(id);
        if (isNaN(carID)) {
            utils.MsgReplyAndDelete(message, str.COMMAND_BADFORMAT_ARGS);
            return null;
        };

        // Получим данные из файла
        let LinuxCars = JSON.parse(FS.readFileSync(pathFile));

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
    TakeLinuxCar: async function(car, userId, userName) {
        
        // Получим данные из файла
        let LinuxCarsStatus = JSON.parse(FS.readFileSync(path.TMP_LINUXCARS_STATUS));
        
        // Получим ключ
        let carKey = this.GetLinuxCarKey(car);

        // Изменим данные
        LinuxCarsStatus[carKey].CurrentUser.ID = userId;
        LinuxCarsStatus[carKey].CurrentUser.Name = userName;

        // Сохраним измененные данные
        await FS.writeFileSync(path.TMP_LINUXCARS_STATUS, JSON.stringify(LinuxCarsStatus, null, 4));

        // Обновим файл на гугл-диске
        this.UpdateGoogleDriveFile(config.linStatusFileId, path.TMP_LINUXCARS_STATUS);
    },

    // Освободить виртуалку
    FreeLinuxCar: async function(car) {
        
        // Получим данные из файла
        let LinuxCarsStatus = JSON.parse(FS.readFileSync(path.TMP_LINUXCARS_STATUS));
        
        // Получим ключ
        let carKey = this.GetLinuxCarKey(car);

        // Изменим данные
        LinuxCarsStatus[carKey].CurrentUser.ID = "";
        LinuxCarsStatus[carKey].CurrentUser.Name = "";

        // Сохраним измененные данные
        await FS.writeFileSync(path.TMP_LINUXCARS_STATUS, JSON.stringify(LinuxCarsStatus, null, 4));

        // Обновим файл на гугл-диске
        this.UpdateGoogleDriveFile(config.linStatusFileId, path.TMP_LINUXCARS_STATUS);
    },
}