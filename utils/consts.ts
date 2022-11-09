const { prefix } = require('../config.json');

export const Str = {
    POLL_EMOJI:                     ':scales:',
    POLL_EMPTY_ANSWERS:             'Необходимо указать хотя бы 1 вариант ответа',

    BOT_ACTIVITY:                   'критичные баги',

    COMMAND_NOT_SUPPORT:            `Данная команда не поддерживается. Используйте **${prefix}help** для получения списка доступных команд`,
    COMMAND_OVERFLOW_ARGS:          'Слишком много аргументов',
    COMMAND_NOTENOUGH_ARGS:         'Недостаточно аргументов',
    COMMAND_BADFORMAT_ARGS:         'Аргумент(ы) имеют неверный формат',
    COMMAND_EMPTY_ARGS:             'Данная команда не поддерживает аргументы',
    COMMAND_ERROR:                  'При выполнении команды произошла ошибка!',

    VMINFO_BAD_ID:                  'Виртуалки с таким идентификатором нет',
    VM_BUSY:                        'Данная виртуалка уже занята',
    VM_FREE:                        'Данная виртуалка уже свободна',
    VM_FREE_BADUSER:                'Вы не можете освободить эту виртуалку, т.к. вы ее не занимали',

    BAD_MEMBERNAME:                 'Некорректное имя',

    MUSIC_NOTINVOICE:               'Чтобы слушать музыку, зайдите в голосовой канал',
    MUSIC_SONGNOTFOUND:             'Трек не найден',
    MUSIC_PLAYLISTNOTFOUND:         'Плейлист не найден',
    MUSIC_SONGSKIPPED:              'Трек пропущен',
    MUSIC_QUEUEMIXED:               'Очередь перемешана',
    MUSIC_ALREADYPAUSED:            'Воспроизведение уже приостановлено',
    MUSIC_PAUSED:                   'Воспроизведение приостановлено',
    MUSIC_ALREADYRESUME:            'Воспроизведение уже идет',
    MUSIC_RESUME:                   'Воспроизведение продолжается',
    MUSIC_STOP:                     'Воспроизведение остановлено',
    MUSIC_INCORRECTVOLUME:          'Громкость должна быть в пределах [0; 200]',
    MUSIC_VOLUMECHANGED:            'Громкость изменена'
};