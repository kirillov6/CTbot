// Расположения файлов

const curDirPath = process.cwd();

module.exports = {

    EVENTS                                              : `${curDirPath}/events`,

    COMMANDS                                            : `${curDirPath}/commands`,

    IMG                                                 : `${curDirPath}/res/img`,

    LINUXCARS                                           : `${curDirPath}/res/json/linuxcars.json`,

    LINKS                                               : `${curDirPath}/res/json/links.json`,

    RULES                                               : `${curDirPath}/res/txt/rules.txt`,

    RULES_DEV                                           : `${curDirPath}/res/txt/rules_dev.txt`,

    RULES_VIS                                           : `${curDirPath}/res/txt/rules_vis.txt`,

    REPO                                                : `${curDirPath}/res/json/repo.json`
}