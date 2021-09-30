// Команда !ping отправляет в ответ сообщение 'Pong'

module.exports = {
    name: 'ping',
    description: 'Отправить в ответ "Pong"',
    turnedOn: true,     // Включить/Выключить доступность команды
    args: false,        // Есть ли аргументы

    execute(message, args) {
        
        message.reply('Pong');
    }
};