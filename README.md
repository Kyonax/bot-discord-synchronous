# Synchronous Bot

<p align="center">
  <img src="https://github.com/Kyonax/bot-discord-synchronous/blob/master/database/multimedia/images/demo/logo/Image_Logo_Discord_Bot_Synchronous.png">
    <br>
    <a href="https://github.com/Kyonax/bot-discord-synchronous"style="text-decoration: none">
    <img src="https://img.shields.io/github/repo-size/Kyonax/bot-discord-synchronous">
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

**SynchronousBot** es un bot creado por **Kyonax** para la plataforma de **_Discord_** usando como lenguaje de programación **_JavaScript_** integrando la documentación de **_discord.js_ v12.2.0** en **_node.js_**, paquetes **_npm_** como **_graphicsMagick_**, **_Axios_**, **_Fortnite_** entre otros y usando **_mysql_** como la principal base de datos. Su función radica principalmente en administrar, monitorear y facilitar el uso de ciertos comandos y de el mismo **Servidor de Synchronous**.

<p align="center">
  <img src="https://github.com/Kyonax/synchronous-bot/blob/master/database/multimedia/images/demo/gifs/Gif_Record_Discord_Server.gif">
</p>

# Eventos discord.js

La documentación de **_discord.js_** integra algunos eventos que están permanentemente activos si así se encuentra el bot, algunos de los que **SynchronousBot** utiliza, son:

###### Guild Events

- [**channelCreate**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate)
- [**channelDelete**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelDelete)
- [**channelUpdate**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelUpdate)

###### Member Events

- [**guildMemberAdd**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd)
- [**guildMemberRemove**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove)

###### Message Events

- [**message**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message)
- [**messageAttachment**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message)

###### Ejecution Events

- [**ready**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-ready)

###### Reaction Events

- [**messageReactionAdd**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd)
- [**messageReactionRemove**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemove)
- [**raw**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd)

###### Role Events

- [**roleCreate**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleCreate)
- [**roleDelete**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleDelete)
- [**roleUpdate**](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-roleUpdate)

# Comandos

Los comandos que se han implementado en **SynchronousBot** son de exclusivo uso para el **_Servidor de Discord Synchronous_**, cada uno de ellos tiene permisos correspondientes de uso y se ha buscado integrar la mayor cantidad de comandos para crear a el bot _definitivo_.

| Categoría         |                                       Comandos                                       |      Permisos |
| ----------------- | :----------------------------------------------------------------------------------: | ------------: |
| **Guild**         |                  `suggestion`-`help`-`ping`-`whois`-`uptime`-`bin`                   |         Todos |
| **Magik**         |                              `buenardo`-`magik`-`shhh`                               |         Todos |
| **Member**        |                          `bank`-`inventory`-`love`-`penis`                           |         Todos |
| **Mod**           |         `addrole`-`ban`-`bondage`-`clear`-`kick`-`poll`-`removerole`-`warn`          | Admins - Mods |
| **Owner**         |                          `prefix`-`news`-`putembeds`-`set`                           |         Owner |
| **RolePlay**      | `age`-`biography`-`dni`-`do`-`fuck`-`hug`-`kiss`-`me`-`ooc`-`pat`-`rep`-`try`-`work` |         Todos |
| **Store**         |                                    `pay`-`store`                                     |         Todos |
| **Miscellaneous** |                  `8ball`-`alpaca`-`cat`-`dog`-`llama`-`meme`-`seal`                  |         Todos |
| **Games**         |                              `fortnite`-`steam`-`apex`                               |         Todos |

---

## License & Copyright

© Kyonax (Cristian David Moreno Riaño), Synchronous Developers

Licensed under the [GNU General Public License v3.0](LICENSE).
