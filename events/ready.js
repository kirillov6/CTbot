//Обработчик события - подключение бота на сервер

const { BOT_ACTIVITY, BOT_ACTIVITY_TYPE } = require("../utils/str");


module.exports = Client => {
    console.log(`Logged in as ${Client.user.tag}!`);

    // Установка активности
    Client.user.setActivity(BOT_ACTIVITY, { type: BOT_ACTIVITY_TYPE});
};