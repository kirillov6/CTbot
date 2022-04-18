import { 
    Player,
    Queue
} from "@discordx/music";

import {
  Pagination,
  PaginationResolver,
  PaginationType,
} from "@discordx/pagination";

import {
  ContextMenuInteraction,
  Guild,
  TextBasedChannel,
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  CommandInteraction
} from "discord.js";


export class MusicQueue extends Queue {
    lastControlMessage?: Message;
    timeoutTimer?: NodeJS.Timeout;
    lockUpdate = false;

    get playbackMilliseconds(): number {
        const track = this.currentTrack;

        if (!track || !track.metadata.isYoutubeTrack() || !track.metadata.info.duration)
            return 0;

        return this.toMS(track.metadata.info.duration);
    }

    constructor(player: Player, guild: Guild, public channel?: TextBasedChannel) {
        super(player, guild);
        setInterval(() => this.updateControlMessage(), 1e4);
    }

    public fromMS(duration: number): string {
        const seconds = Math.floor((duration / 1e3) % 60);
        const minutes = Math.floor((duration / 6e4) % 60);
        const hours = Math.floor(duration / 36e5);
        const secondsPad = `${seconds}`.padStart(2, "0");
        const minutesPad = `${minutes}`.padStart(2, "0");
        const hoursPad = `${hours}`.padStart(2, "0");
        return `${hours ? `${hoursPad}:` : ""}${minutesPad}:${secondsPad}`;
    }

    public toMS(duration: string): number {
        const milliseconds =
            duration
            .split(":")
            .reduceRight((prev, curr, i, arr) => prev + parseInt(curr) * Math.pow(60, arr.length - 1 - i), 0) * 1e3;

        return milliseconds ? milliseconds : 0;
    }

    private controlsRow(): MessageActionRow[] {
        const nextButton = new MessageButton()
            .setLabel("Next")
            .setEmoji("⏭")
            .setStyle("PRIMARY")
            .setDisabled(!this.isPlaying)
            .setCustomId("btn-next");
            
        const pauseButton = new MessageButton()
            .setLabel(this.isPlaying ? "Pause" : "Resume")
            .setEmoji(this.isPlaying ? "⏸️" : "▶️")
            .setStyle("PRIMARY")
            .setCustomId("btn-pause");

        const stopButton = new MessageButton()
            .setLabel("Stop")
            .setStyle("DANGER")
            .setCustomId("btn-stop");

        const repeatButton = new MessageButton()
            .setLabel("Repeat")
            .setEmoji("🔂")
            .setDisabled(!this.isPlaying)
            .setStyle(this.repeat ? "DANGER" : "PRIMARY")
            .setCustomId("btn-repeat");

        const row1 = new MessageActionRow().addComponents(
            stopButton,
            pauseButton,
            nextButton,
            repeatButton
        );

        const volumeUpButton = new MessageButton()
            .setLabel("Volume +10%")
            .setEmoji("⏫")
            .setStyle("PRIMARY")
            .setCustomId("btn-volumeup");

        const volumeDownButton = new MessageButton()
            .setLabel("Volume -10%")
            .setEmoji("⏬")
            .setStyle("PRIMARY")
            .setCustomId("btn-volumedown");

        const row2 = new MessageActionRow().addComponents(
            volumeUpButton,
            volumeDownButton
        );

        const queueButton = new MessageButton()
            .setLabel("Queue")
            .setEmoji("🎵")
            .setStyle("PRIMARY")
            .setCustomId("btn-queue");

        const mixButton = new MessageButton()
            .setLabel("Shuffle")
            .setEmoji("🎛️")
            .setDisabled(!this.isPlaying)
            .setStyle("PRIMARY")
            .setCustomId("btn-mix");

        const controlsButton = new MessageButton()
            .setLabel("Update")
            .setEmoji("🔄")
            .setStyle("PRIMARY")
            .setCustomId("btn-controls");

        const row3 = new MessageActionRow().addComponents(
            queueButton,
            mixButton,
            controlsButton
        );

        return [row1, row2, row3];
    }

    public async updateControlMessage(options?: {
        force?: boolean;
    }): Promise<void> {
        if (this.lockUpdate)
            return;

        this.lockUpdate = true;

        const currentTrack = this.currentTrack;
        const nextTrack = this.nextTrack;

        if (!currentTrack) {
            if (this.lastControlMessage) {
                await this.lastControlMessage.delete();
                this.lastControlMessage = undefined;
            }

            this.lockUpdate = false;
            return;
        }

        const user = currentTrack.metadata.isYoutubeTrack()
            ? currentTrack.metadata.options?.user
            : currentTrack.metadata?.user;

        const embed = new MessageEmbed()
            .setTitle("Управление музыкой")
            .addField(
                "Сейчас играет" +
                (this.size > 2 ? ` (Всего: ${this.size} треков в очереди)` : ""),
                `[${currentTrack.metadata.title}](${currentTrack.metadata.url ?? "NaN"})
                ${user ? ` от ${user}` : ""}`
            );

        const progressBarOptions = {
            arrow: "🔘",
            block: "━",
            size: 15,
        };

        if (currentTrack.metadata.isYoutubeTrack()) {
            const { size, arrow, block } = progressBarOptions;

            const timeNow = this.playbackDuration;
            const timeTotal = this.playbackMilliseconds;

            const progress = Math.round((size * timeNow) / timeTotal);
            const emptyProgress = size - progress;

            const progressString = block.repeat(progress) + arrow + block.repeat(emptyProgress);

            const bar = (this.isPlaying ? "▶️" : "⏸️") + " " + progressString;

            const currentTime = this.fromMS(timeNow);
            const endTime = this.fromMS(timeTotal);

            const spacing = bar.length - currentTime.length - endTime.length;
            const time = "`" + currentTime + " ".repeat(spacing * 3 - 2) + endTime + "`";

            embed.addField(bar, time);
        }

        if (currentTrack.metadata.isYoutubeTrack() && currentTrack.metadata.info.bestThumbnail.url)
            embed.setThumbnail(currentTrack.metadata.info.bestThumbnail.url);

        if (nextTrack)
            embed.addField("Следующий трек", `[${nextTrack.title}](${nextTrack.url})`);

        const Msg = {
            components: [...this.controlsRow()],
            embeds: [embed],
        };

        if (!this.isReady && this.lastControlMessage) {
            await this.lastControlMessage.delete();
            this.lastControlMessage = undefined;
            this.lockUpdate = false;
            return;
        }

        try {
            if (!this.lastControlMessage || options?.force) {
                if (this.lastControlMessage) {
                    await this.lastControlMessage.delete();
                    this.lastControlMessage = undefined;
                }
                this.lastControlMessage = await this.channel?.send(Msg);
            }
            else {
                await this.lastControlMessage.edit(Msg);
            }
        } catch (err) {
            console.error(err);
        }

        this.lockUpdate = false;
    }

    public async view(
        interaction: Message | CommandInteraction | ContextMenuInteraction
    ): Promise<void> {
        const currentTrack = this.currentTrack;

        if (!this.isReady || !currentTrack)
            return;

        if (!this.size) {
            const Msg = await interaction.reply(`> Играет **${currentTrack.metadata.title}**`);
            if (Msg instanceof Message) {
                setTimeout(() => Msg.delete(), 6000);
            }
            return;
        }

        const current = `> Играет **${currentTrack.metadata.title}**, осталось ${this.size + 1}`;

        const pageOptions = new PaginationResolver((index, paginator) => {
            paginator.maxLength = this.size / 10;
            if (index > paginator.maxLength)
                paginator.currentPage = 0;

            const currentPage = paginator.currentPage;

            const queue = this.tracks
                .slice(currentPage * 10, currentPage * 10 + 10)
                .map((track, index1) =>
                    `${currentPage * 10 + index1 + 1}. ${track.title}` +
                    `${track.isYoutubeTrack() && track.info.duration ? `(${track.info.duration})` : ""}`
                )
                .join("\n\n");

            return `${current}\n\`\`\`markdown\n${queue}\`\`\``;
        }, Math.round(this.size / 10));

        await new Pagination(interaction, pageOptions, {
            enableExit: true,
            onTimeout: (_, message) => {
                if (message.deletable)
                    message.delete();
            },
            time: 6e4,
            type: Math.round(this.size / 10) <= 5 ? PaginationType.Button : PaginationType.SelectMenu,
        }).send();
    }
}

export class MusicPlayer extends Player {
    constructor() {
        super();

        this.on<MusicQueue, "onStart">("onStart", ([queue]) => {
            queue.updateControlMessage({ force: true });
        });

        this.on<MusicQueue, "onFinishPlayback">("onFinishPlayback", ([queue]) => {
            queue.leave();
        });

        this.on<MusicQueue, "onPause">("onPause", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onResume">("onResume", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onError">("onError", ([queue, err]) => {
            queue.updateControlMessage({ force: true });
        });

        this.on<MusicQueue, "onFinish">("onFinish", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onLoop">("onLoop", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onRepeat">("onRepeat", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onSkip">("onSkip", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onTrackAdd">("onTrackAdd", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onLoopEnabled">("onLoopEnabled", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onLoopDisabled">("onLoopDisabled", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onRepeatEnabled">("onRepeatEnabled", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onRepeatDisabled">("onRepeatDisabled", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onMix">("onMix", ([queue]) => {
            queue.updateControlMessage();
        });

        this.on<MusicQueue, "onVolumeUpdate">("onVolumeUpdate", ([queue]) => {
            queue.updateControlMessage();
        });
    }

    getQueue(guild: Guild, channel?: TextBasedChannel): MusicQueue {
        return super.queue<MusicQueue>(guild, () => new MusicQueue(this, guild, channel));
    }
}