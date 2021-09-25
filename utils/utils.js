// Вспомогательные телодвижения

const config = require('../config.json');


module.exports = {
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

    // Получить лист из Google-таблицы
    GetGoogleSheet: async function(sheetIndex) {
        // Получим Google-таблицу
        const googleSheet = require('google-spreadsheet');
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
        let LinuxCars = JSON.parse(require('fs').readFileSync(require('./path').LINUXCARS));

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
}