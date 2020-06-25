# Synchronous Bot

<p align="center">
  <img src="https://github.com/Kyonax/bot-discord-synchronous/blob/master/database/multimedia/images/demo/logo/Image_Logo_Discord_Bot_Synchronous.png">
    <br>
    <a href="https://github.com/Kyonax/bot-discord-synchronous"style="text-decoration: none">
    <img src="https://img.shields.io/github/languages/code-size/Kyonax/bot-discord-synchronous">
    </a>
    <a href="https://github.com/Kyonax/bot-discord-synchronous"style="text-decoration: none">
    <img src="https://img.shields.io/github/languages/top/Kyonax/bot-discord-synchronous">
    </a>    
    <a href="https://github.com/Kyonax/bot-discord-synchronous"style="text-decoration: none">
    <img src="https://img.shields.io/github/contributors/Kyonax/bot-discord-synchronous">
    </a>
    <a href="https://github.com/Kyonax/bot-discord-synchronous"style="text-decoration: none">
    <img src="https://img.shields.io/github/last-commit/Kyonax/bot-discord-synchronous">
    </a>
    <br>
    <a href="https://www.twitch.tv/synk_kyonax"style="text-decoration: none">
    <img src="https://img.shields.io/twitch/status/synk_kyonax">
    </a>
    <a href="https://discord.gg/vSvgHvk"style="text-decoration: none">
    <img src="https://img.shields.io/discord/623715606184722442?color=blueviolet&label=Server&logo=discord">
    </a>
    <a href="https://www.facebook.com/MrKyonax"style="text-decoration: none">
    <img src="https://img.shields.io/badge/MrKyonax-facebook-blue">
    </a>
    <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url"style="text-decoration: none">
    <img src="https://img.shields.io/badge/Donate-PayPal-green.svg">
    </a>    
    <a href="https://www.facebook.com/SynchronousTeam"style="text-decoration: none">
    <img src="https://img.shields.io/badge/Synchronous-facebook-blue">
    </a>    
     <a href="https://twitter.com/intent/follow?screen_name=Synk_Kyo"style="text-decoration: none">
    <img src="https://img.shields.io/twitter/follow/Synk_Kyo?style=social">
    </a>
    <a href="https://github.com/Kyonax?tab=followers"style="text-decoration: none">
    <img src="https://img.shields.io/github/followers/Kyonax?style=social">
    </a>    
</p>

---

**Synchronous Bot** is an Open-Source Discord bot developed with **NodeJS** using **_discord.js v12.2.0_, _graphicsMagick v1.23.1_ and _mysql2 v2.1.0_** granting services on administration, entertainment, information, level and bank systems for the _[Synchronous Discord Server](https://discord.gg/UQrywtq)_. Being at the same time one of the most complete automata **Discord bot** and graphically attractive, all this features being open source. Learn and get inspired watching how **Kyonax** create this bot using **100% JavaScript code**.

On the next updates You will be able to read all the Documentation on English and will be more specific too.
_(You can read, learn and share the code however you can´t appropiatte it. If you are going to share the code or modify please give me Credits, more information in [**GNU General Public License v3.0**](LICENSE)_

<p align="center">
  <img src="https://github.com/Kyonax/bot-discord-synchronous/blob/master/database/multimedia/images/demo/gifs/Gif_Record_Discord_Server.gif">
</p>

## Bot Running

**Synchronous Bot** is running and working on a _**beta version v1.6.0**_ meanning that is still under develop and some or a lot of things are going to change on future updates, the bot are **not** optimized so a lot of code lines are going to disappear, you can check and try out the bot on **[Synchronous Discord Server](https://discord.gg/UQrywtq)**.

## Discord.js Events used

As you know **Synchronous bot** use **NodeJs** and this JavaScript runtime environment give you this tool to implement Discord Functions and Events on your app **[Discord.js](https://discord.js.org/#/)** and now I will show you which Events _Synchronous Bot_ use:

###### Guild Events

- [**channelCreate**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate)
- [**channelDelete**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelDelete)
- [**channelUpdate**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelUpdate)

###### Member Events

- [**guildMemberAdd**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd)
- [**guildMemberRemove**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove)

###### Message Events

- [**message**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message)

###### Ejecution Events

- [**ready**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-ready)

###### Reaction Events

- [**messageReactionAdd**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd)
- [**messageReactionRemove**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemove)

###### Utils for the Events

- [**Attachment**](https://github.com/Kyonax/bot-discord-synchronous/tree/master/src/utils/misc/attachment.js)
- [**Reaction**](https://github.com/Kyonax/bot-discord-synchronous/tree/master/src/utils/misc/reaction.js)
- [**Welcome**](https://github.com/Kyonax/bot-discord-synchronous/tree/master/src/utils/misc/welcome.js)

## Logic

The **Level and Bank** systems use a simple logic to earn money and win xp:

- [**LogicBank**](https://github.com/Kyonax/bot-discord-synchronous/tree/master/src/utils/logic/logicBank.js)
- [**LogicMember**](https://github.com/Kyonax/bot-discord-synchronous/tree/master/src/utils/logic/logicMember.js)


## Commands

Automata and interactive, **Synchronous Bot** has a lot of Commands that you can use tipyng the command on a **[Synchronous Discord Server](https://discord.gg/UQrywtq)** Channel Text, How can you do that?, well you need to start your text message with a **prefix** the default **Server Prefix** is **_s!_**, next to this you have to add the name of the command, like this **_s!help_** _(This command gives you all the bot help information that you need)_. Now check out all the Commands that **Synchronous bot** has:

| Category          |                                       Commands                                       |         Perms |
| ----------------- | :----------------------------------------------------------------------------------: | ------------: |
| **Guild**         |                  `suggestion`-`help`-`ping`-`whois`-`uptime`-`bin`                   |           All |
| **Magik**         |                              `buenardo`-`magik`-`shhh`                               |           All |
| **Member**        |                          `bank`-`inventory`-`love`-`penis`                           |           All |
| **Mod**           |         `addrole`-`ban`-`bondage`-`clear`-`kick`-`poll`-`removerole`-`warn`          | Admins - Mods |
| **Owner**         |                          `prefix`-`news`-`putembeds`-`set`                           |         Owner |
| **RolePlay**      | `age`-`biography`-`dni`-`do`-`fuck`-`hug`-`kiss`-`me`-`ooc`-`pat`-`rep`-`try`-`work` |           All |
| **Miscellaneous** |                  `8ball`-`alpaca`-`cat`-`dog`-`llama`-`meme`-`seal`                  |           All |
| **Games**         |                              `fortnite`-`steam`-`apex`                               |           All |
| **Store**         |                                    `pay`-`store`                                     |           All |

## Support

I love code and I like to do them Open Source for learn, teach and same other stuff, if You want to **Support** my work you can check out the links below. Maybe I can do tutorials in the future with your help. Thanks for check my work, see you.

- [**FaceBook**](https://www.facebook.com/MrKyonax)
- [**Twitter**](https://twitter.com/Synk_Kyo)
- [**Twitch**](https://www.twitch.tv/synk_kyonax)
- [**YouTube**](https://www.youtube.com/channel/UCOCGuDADwciaJfnCxWoYGHA)
- [**Donations**](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5LY2Y46Q7DSWL&source=url)

---

## License & Copyright

© Kyonax (Cristian David Moreno Riaño) • Synchronous Developers

Licensed under the [GNU General Public License v3.0](LICENSE).
