import {
    GuildMember,
    Message,
    MessageEmbed,
    CommandInteraction
} from "discord.js";

import {
  ButtonComponent,
  Discord,
  On,
  SimpleCommand,
  SimpleCommandOption,
  ArgsOf,
  SimpleCommandMessage
} from "discordx";

import {
    MusicQueue,
    MusicPlayer
} from "./objects.js";

import { Str } from '../../utils/consts';
import { Utils } from '../../utils/utils';


@Discord()
export abstract class Music {
    player;

    constructor() {
        this.player = new MusicPlayer();
    }

    @On("voiceStateUpdate")
    voiceUpdate([oldState, newState]: ArgsOf<"voiceStateUpdate">): void {
        const queue = this.player.getQueue(oldState.guild);

        if (!queue.isReady || !queue.voiceChannelId || !queue.channel ||
            (oldState.channelId != queue.voiceChannelId && newState.channelId != queue.voiceChannelId)) {
            return;
        }

        const channel = oldState.channelId === queue.voiceChannelId ? oldState.channel : newState.channel;

        if (!channel)
            return;

        const totalMembers = channel.members.filter(m => !m.user.bot);

        if (queue.isPlaying && !totalMembers.size) {
            queue.pause();

            if (queue.timeoutTimer) {
                clearTimeout(queue.timeoutTimer);
            }

            // Выходим через 5 минут после того, как никого в голосовом канале не осталось
            queue.timeoutTimer = setTimeout(() => { queue.leave() }, 5 * 60000);
        } else if (queue.isPause && totalMembers.size) {
            if (queue.timeoutTimer) {
                clearTimeout(queue.timeoutTimer);
                queue.timeoutTimer = undefined;
            }
            queue.resume();
        }
    }

    validateInteraction(interaction: CommandInteraction | Message): MusicQueue | undefined {
        if (!interaction.guild || !interaction.channel || !(interaction.member instanceof GuildMember))
            return;

        const queue = this.player.getQueue(interaction.guild, interaction.channel);

        if (interaction.member.voice.channelId !== queue.voiceChannelId) {
            if (interaction instanceof Message) {
                Utils.msgReplyAndDelete(interaction, Str.MUSIC_NOTINVOICE);
            } else {
                interaction.reply(Str.MUSIC_NOTINVOICE);
                setTimeout(() => interaction.deleteReply(), 6000);
            }
            return;
        }

        return queue;
    }

    @ButtonComponent("btn-next")
    async nextControl(interaction: CommandInteraction): Promise<void> {
        const queue = this.validateInteraction(interaction);
        if (!queue)
            return;

        queue.skip();
        await interaction.deferReply();
        interaction.deleteReply();
    }

    @ButtonComponent("btn-pause")
    async pauseControl(interaction: CommandInteraction): Promise<void> {
        const queue = this.validateInteraction(interaction);
        if (!queue)
            return;

        queue.isPause ? queue.resume() : queue.pause();
        await interaction.deferReply();
        interaction.deleteReply();
    }

    @ButtonComponent("btn-stop")
    async leaveControl(interaction: CommandInteraction): Promise<void> {
        const queue = this.validateInteraction(interaction);
        if (!queue)
            return;
            
        queue.leave();
        await interaction.deferReply();
        interaction.deleteReply();
    }

    @ButtonComponent("btn-repeat")
    async repeatControl(interaction: CommandInteraction): Promise<void> {
        const queue = this.validateInteraction(interaction);
        if (!queue)
            return;
            
        queue.setRepeat(!queue.repeat);
        await interaction.deferReply();
        interaction.deleteReply();
    }

    @ButtonComponent("btn-volumeup")
    async volumeUpControl(interaction: CommandInteraction): Promise<void> {
        const queue = this.validateInteraction(interaction);
        if (!queue || queue.volume == 200)
            return;
        
        const newVolume = queue.volume + 10;

        queue.setVolume(newVolume > 200 ? 200 : newVolume);
        await interaction.deferReply();
        interaction.deleteReply();
    }

    @ButtonComponent("btn-volumedown")
    async volumeDownControl(interaction: CommandInteraction): Promise<void> {
        const queue = this.validateInteraction(interaction);
        if (!queue || queue.volume == 0)
            return;
        
        const newVolume = queue.volume - 10;

        queue.setVolume(newVolume < 0 ? 0 : newVolume);
        await interaction.deferReply();
        interaction.deleteReply();
    }

    @ButtonComponent("btn-queue")
    queueControl(interaction: CommandInteraction): void {
        const queue = this.validateInteraction(interaction);
        if (!queue)
            return;
            
        queue.view(interaction);
    }

    @ButtonComponent("btn-mix")
    async mixControl(interaction: CommandInteraction): Promise<void> {
        const queue = this.validateInteraction(interaction);
        if (!queue)
            return;
            
        queue.mix();
        await interaction.deferReply();
        interaction.deleteReply();
    }

    @ButtonComponent("btn-controls")
    async controlsControl(interaction: CommandInteraction): Promise<void> {
        const queue = this.validateInteraction(interaction);
        if (!queue)
            return;
            
        queue.updateControlMessage({ force: true });
        await interaction.deferReply();
        interaction.deleteReply();
    }

    async processJoin(interaction: CommandInteraction | Message): Promise<MusicQueue | undefined> {
        if (!interaction.guild || !interaction.channel || !(interaction.member instanceof GuildMember))
            return;

        if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
            if (interaction instanceof Message) {
                Utils.msgReplyAndDelete(interaction, Str.MUSIC_NOTINVOICE);
            } else {
                interaction.reply(Str.MUSIC_NOTINVOICE);
                setTimeout(() => interaction.deleteReply(), 6000);
            }
            return;
        }

        if (interaction instanceof CommandInteraction)
            await interaction.deferReply();

        const queue = this.player.getQueue(interaction.guild, interaction.channel);

        if (!queue.isReady) {
            queue.channel = interaction.channel;
            await queue.join(interaction.member.voice.channel);
        }

        return queue;
    }

    @SimpleCommand("play", { 
        description: "Воспроизвести трек"
    })
    async play(
        @SimpleCommandOption("song") songName: string,
        command: SimpleCommandMessage
    ) {
        const message = command.message;

        const queue = await this.processJoin(message);
        if (!queue)
            return;
            
        const song = await queue.play(songName, { user: message.author });

        if (!song) {
            Utils.msgReplyAndDelete(message, Str.MUSIC_SONGNOTFOUND);
        } else {
            const embed = new MessageEmbed()
                .setTitle("Очередь")
                .setDescription(`Трек **${song.title}** добавлен в очередь`);

            message.channel.send({ embeds: [embed] });
        }
    }

    @SimpleCommand("playlist", { 
        description: "Воспроизвести плейлист"
    })
    async playlist(
        @SimpleCommandOption("playlist") playlistName: string,
        command: SimpleCommandMessage
    ) {
        const message = command.message;

        const queue = await this.processJoin(message);
        if (!queue)
            return;
            
        const songs = await queue.playlist(playlistName, { user: message.author });
        if (!songs) {
            Utils.msgReplyAndDelete(message, Str.MUSIC_PLAYLISTNOTFOUND);
        } else {
            const embed = new MessageEmbed()
                .setTitle("Очередь")
                .setDescription(`**${songs.length}** треков из плейлиста добавлено в очередь`);

            message.channel.send({ embeds: [embed] });
        }
    }

    @SimpleCommand("skip", { 
        description: "Пропустить трек"
    })
    skip(command: SimpleCommandMessage) {
        const message = command.message;

        const queue = this.validateInteraction(message);
        if (!queue)
            return;

        queue.skip();
        Utils.msgReplyAndDelete(message, Str.MUSIC_SONGSKIPPED);
    }

    @SimpleCommand("mix", { 
        description: "Перемешать очередь"
    })
    mix(command: SimpleCommandMessage) {
        const message = command.message;

        const queue = this.validateInteraction(message);
        if (!queue)
            return;

        queue.mix();
        Utils.msgReplyAndDelete(message, Str.MUSIC_QUEUEMIXED);
    }

    @SimpleCommand("pause", { 
        description: "Поставить воспроизведение на паузу"
    })
    pause(command: SimpleCommandMessage) {
        const message = command.message;

        const queue = this.validateInteraction(message);
        if (!queue)
            return;

        if (queue.isPause)
            return Utils.msgReplyAndDelete(message, Str.MUSIC_ALREADYPAUSED);

        queue.pause();
        queue.setVolume(queue.volume - 0.1);
        Utils.msgReplyAndDelete(message, Str.MUSIC_PAUSED);
    }

    @SimpleCommand("resume", { 
        description: "Продолжить воспроизведение"
    })
    resume(command: SimpleCommandMessage) {
        const message = command.message;

        const queue = this.validateInteraction(message);
        if (!queue)
            return;

        if (queue.isPlaying)
            return Utils.msgReplyAndDelete(message, Str.MUSIC_ALREADYRESUME);

        queue.resume();
        Utils.msgReplyAndDelete(message, Str.MUSIC_RESUME);
    }

    @SimpleCommand("stop", { 
        description: "Остановить воспроизведение"
    })
    stop(command: SimpleCommandMessage) {
        const message = command.message;

        const queue = this.validateInteraction(message);
        if (!queue)
            return;

        queue.leave();
        Utils.msgReplyAndDelete(message, Str.MUSIC_STOP);
    }

    @SimpleCommand("volume", { 
        description: "Изменить громкость воспроизведения"
    })
    volume(
        @SimpleCommandOption("vol") vol: number,
        command: SimpleCommandMessage
    ) {
        const message = command.message;

        if (!vol || vol < 0 || vol > 200)
            return Utils.msgReplyAndDelete(message, Str.MUSIC_INCORRECTVOLUME);

        const queue = this.validateInteraction(message);
        if (!queue)
            return;

        queue.setVolume(vol);
        Utils.msgReplyAndDelete(message, Str.MUSIC_VOLUMECHANGED);
    }
}