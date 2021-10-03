"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
const tslib_1 = require("tslib");
const discord_1 = require("@typeit/discord");
class Ping {
    async ping(message) {
        await message.reply('Pong');
    }
}
(0, tslib_1.__decorate)([
    (0, discord_1.Command)('ping'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_1.CommandMessage]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], Ping.prototype, "ping", null);
exports.Ping = Ping;
