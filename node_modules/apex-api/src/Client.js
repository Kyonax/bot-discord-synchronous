const fetch = require('node-fetch');
const URL = 'https://public-api.tracker.gg/apex/v1/standard/profile';

/**
 * The main hub for the client, to be instantiated.
 * @class
 */
class Client {
  /**
   * @constructor
   * @param {string} key Your API Key, provided by ApexTracker
   */
  constructor(key) {
    this.headers = { headers: { 'TRN-Api-Key': key } };
  }

  /**
   * Gets the stats of a specific user, on a specific platform.
   * @param {string} username The username of the player to be searched
   * @param {string} platform The platform of the player to be searched
   */
  user(username, platform) {
    return new Promise((resolve, reject) => {
      if (!username) return reject(new Error('[APEX-API] You must supply a username'));
      if (!platform) return reject(new Error('[APEX-API] You must provide a platform [PC | XBOX | PSN]')); 
      if (typeof username !== 'string') return reject(new TypeError(`[APEX-API] Username expects a string, ${typeof username} given`)); 
      if (typeof platform !== 'string') return reject(new TypeError(`[APEX-API] Platform expects a string, ${typeof platform} given`));
      let nbr;
      if (platform.toUpperCase() === 'PC') nbr = 5;
      if (platform.toUpperCase() === 'XBOX') nbr = 1; 
      if (platform.toUpperCase() === 'PSN') nbr = 2; 
      if(nbr == undefined) return reject(new TypeError(`[APEX-API] Platforms must be PC, XBOX or PSN`));      
        fetch(`${URL}/${nbr}/${username}`, this.headers)
          .then(res => res.json()) // FORMATING TO JSON
          .then(response =>{
            resolve(response) // REPONSE
          }).catch(error =>{
            reject(error.toString()); // REJECT ERROR 
            // A améliorer ! 
          });
    });
  }
  weaponInfo(category){
    return new Promise((resolve, reject) => {

      fetch(`http://apex-api.tk/api/v1/weapons?name=${category}`)
      .then(res => res.json()) // FORMATING TO JSON
      .then(response =>{
        resolve(response) // REPONSE
      }).catch(error =>{
        reject(error.toString()); // REJECT ERROR 
        // A améliorer ! 
      });
    })
  }

  legendInfo(legend){
    return new Promise((resolve, reject) => {

      fetch(`http://apex-api.tk/api/v1/legends?name=${legend}`)
      .then(res => res.json()) // FORMATING TO JSON
      .then(response =>{
        resolve(response) // REPONSE
      }).catch(error =>{
        reject(error.toString()); // REJECT ERROR 
        // A améliorer ! 
      });
    })
      }

      legendUsage(){
        return new Promise((resolve, reject) => {

        fetch('http://apex-api.tk/api/v1/legendsUsage')
        .then(res => res.json()) // FORMATING TO JSON
        .then(response =>{
          resolve(response) // REPONSE
        }).catch(error =>{
          reject(error.toString()); // REJECT ERROR 
          // A améliorer ! 
        });
      })
      }
};

module.exports = Client;