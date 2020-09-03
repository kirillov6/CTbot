// Расположения файлов

const curDirPath = process.cwd();

module.exports = {
    
    EVENTS                                              : `${curDirPath}/events`,

    COMMANDS                                            : `${curDirPath}/commands`,

    IMG                                                 : `${curDirPath}/img`,

    LINUXCARS                                           : `${curDirPath}/json/linuxcars.json`,

    TMP_LINUXCARS_STATUS                                : `${curDirPath}/json/tmp/linuxcars_status.json`,

    LINKS                                               : `${curDirPath}/json/links.json`,

    RULES                                               : `${curDirPath}/txt/rules.txt`,

    REPO                                                : `${curDirPath}/json/repo.json`
}