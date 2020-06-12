//Обработчик события - подключение бота на сервер

module.exports = Client => {
    console.log(`Logged in as ${Client.user.tag}!`);

    // Установка активности
    Client.user.setActivity('за командой', { type: 'WATCHING'});
};