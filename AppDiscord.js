"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDiscord = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const Const_1 = require("./utils/Const");
const Utils_1 = require("./utils/Utils");
const discord_1 = require("@typeit/discord");
const { prefix } = require('./config.json');
let AppDiscord = class AppDiscord {
    notFound(message) {
        Utils_1.Utils.msgReplyAndDelete(message, Const_1.Consts.Str.COMMAND_NOT_SUPPORT);
    }
    hello() {
        console.log(123);
    }
};
(0, tslib_1.__decorate)([
    (0, discord_1.CommandNotFound)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [discord_1.CommandMessage]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], AppDiscord.prototype, "notFound", null);
(0, tslib_1.__decorate)([
    (0, discord_1.Command)("hello"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], AppDiscord.prototype, "hello", null);
AppDiscord = (0, tslib_1.__decorate)([
    (0, discord_1.Discord)(prefix, {
        import: [
            path.join(__dirname, 'commands', '*.ts'),
            path.join(__dirname, 'events', '*.ts')
        ]
    })
], AppDiscord);
exports.AppDiscord = AppDiscord;
