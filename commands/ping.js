// Команда !ping отправляет в ответ сообщение 'Pong'

module.exports = {
    name: 'ping',
    description: 'Отправить в ответ "Pong"',
    args: false,

    execute(message, args) {
        
        message.reply('Pong');
    }
};