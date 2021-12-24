[![gobot](https://www.go-bot.xyz/GoBotBannerTransparent.png)](https://www.go-bot.xyz/)


<div align="center">
    <a href="https://discord.gg/twork"><img src="https://img.shields.io/discord/782201612177113109?color=5865F2&logo=discord&logoColor=white&style=flat-square" alt="Discord server" /></a>
</div>

A multipurpose discord bot

### Prerequisites
- yarn
- docker
### Setup
Under the [`packages/backend`](packages/backend) directory create a `.env.development` and a `.env.production` to fill out the fields shown in the [`.env.sample`](packages/backend/.env.sample) file.

Run
```
yarn docker:dev
```
to start developing with docker-compose.
