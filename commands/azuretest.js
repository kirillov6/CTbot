// Команда !azuretest

// Импорт
const utils = require('../utils/utils');
const bi = require('azure-devops-node-api/interfaces/BuildInterfaces')

module.exports = {
    name: 'azuretest',
    description: '',
    turnedOn: false,     // Включить/Выключить доступность команды
    args: false,        // Есть ли аргументы
    min_args: 1,        // Минимальное количество аргументов
    max_args: 1,        // Максимальное количество аргументов

    async execute(message, args) {
        const azureApi = await utils.GetAzureApi();
        const buildApi = await azureApi.getBuildApi();

        const { azureProject } = require('../config.json');
        
        let resStr = 'last 10 successfull builds:\n';

        let builds = await buildApi.getBuilds(azureProject)
        .catch(error => {
            console.error(error);
        });
        
        for (var build in builds) {
            resStr += `\tbuildNumber: ${build.buildNumber}\n`;
            resStr += `\trequestedBy: ${build.requestedBy.displayName}\n`;
            resStr += `\tfinished time: ${build.finishTime.toDateString()}\n\n`;
        };
        
        // let resStr = 'projects:\n';
        // const coreApi = await azureApi.getCoreApi();
        // const projects = await coreApi.getProjects();
        // for (var p in projects) {
        //     resStr += `\t description: ${p.description}\n`;
        //     resStr += `\t id: ${p.id}\n`;
        //     resStr += `\t url: ${p.url}\n`;
        // };

        message.channel.send(resStr);
    }
};