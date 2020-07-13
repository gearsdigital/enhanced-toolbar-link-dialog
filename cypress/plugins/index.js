const fs = require("fs");

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('task', {
    copyKirbyConfig() {
      const base = "../../../site/config";
      fs.renameSync(`${base}/config.php`, `${base}/bak_config.php`);
      fs.copyFileSync(__dirname + "/../fixtures/config.php", `${base}/config.php`);

      return null
    },
    restoreKirbyConfig() {
      const base = "../../../site/config";
      fs.unlinkSync(`${base}/config.php`);
      fs.renameSync(`${base}/bak_config.php`, `${base}/config.php`);

      return null
    }
  })
}
