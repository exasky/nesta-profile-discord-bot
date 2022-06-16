# nesta-profile-discord-bot

## Description

This bot aims to provide a simple and intuitive way to create profiles in a discord server (inpired by [Profil+](https://top.gg/fr/bot/769120985148030996) bot)

## Configuration

Create a .env file with following properties

- TOKEN : Your application token
- CLIENT_ID : The client id
- GUILD_ID : The id of your server (will be used by deploy-commands to add slash commands)

This bot will store data in a local json file.

Debug logs can be enabled by setting logLevel to "debug" in config.json file

## Build

Just launch `yarn install` then `yarn run tsc` commands. After them, the dist folder will be prepared for run !

## Launch

First, launch `yarn run register-commands` to register all possibles commands of the bot (re-run this command if you have updated them).

Then you can launch the bot with this command `yarn run start`. Or if you built it in prod mode `node dist/bot.js`

## Invite bot

Please set following scopes : bot, applications.commands
Please set following permissions : Send Messages, Embed Links, Use External Emojis, Use External Stickers, User Slash Commands (value 139586717696)

## Interact

Just type `/profile` if the chat and you should see commands provided by the bot :)
