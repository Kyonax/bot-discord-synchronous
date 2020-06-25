//Exportando el cuerpo de un Comando
module.exports = class BaseCommand {
  //Parametros de un Comando
  constructor(name, aliases, description, usage, perms, category) {
    this.name = name;
    this.aliases = aliases;
    this.description = description;
    this.usage = usage;
    this.perms = perms;
    this.category = category;
  }
};
