"use strict";
// Вспомогательные телодвижения
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const GoogleSheet = require("google-spreadsheet");
const AzDev = require("azure-devops-node-api");
class Utils {
    // Ответить и удалить ответ вместе с сообщением
    static msgReplyAndDelete(message, reply, time = 6) {
        message.reply(reply)
            .then(msg => { msg.delete({ timeout: time * 1000 }); }) // Удалим ответ
            .then(() => message.delete({ timeout: time * 1000 })) // Удалим команду
            .catch(error => { console.log(error); });
    }
    // Получить лист из Google-таблицы
    static async getGoogleSheet(sheetIndex) {
        // Получим Google-таблицу
        const sheet = new GoogleSheet.GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
        // Параметры доступа
        await sheet.useServiceAccountAuth({
            client_email: process.env.GOOGLE_CREDITIONALS_EMAIL,
            private_key: process.env.GOOGLE_CREDITIONALS_KEY,
        });
        // Загрузим инфу таблицы
        await sheet.loadInfo();
        // Вернем нужный лист
        return sheet.sheetsByIndex[sheetIndex];
    }
    // Получить Azure DevOps API
    static getAzureApi() {
        const { azureUrl } = require('../config.json');
        let authHandler = AzDev.getBasicHandler(process.env.AZURE_USERNAME, process.env.AZURE_PASSWORD);
        return new AzDev.WebApi(azureUrl, authHandler);
    }
}
exports.Utils = Utils;
