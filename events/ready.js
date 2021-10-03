"use strict";
//Обработчик события - подключение бота на сервер
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ready = void 0;
const tslib_1 = require("tslib");
const discord_1 = require("@typeit/discord");
const Const_1 = require("../utils/Const");
class Ready {
    onReady(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        // Установка активности
        client.user.setActivity(Const_1.Consts.Str.BOT_ACTIVITY, { type: Const_1.Consts.Str.BOT_ACTIVITY_TYPE });
    }
}
(0, tslib_1.__decorate)([
    (0, discord_1.On)('ready'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_1.Client]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], Ready.prototype, "onReady", null);
exports.Ready = Ready;
