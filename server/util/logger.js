/* eslint-disable no-console */

const chalk = require('chalk');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {
  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, host) => {
    console.log(`Server started ! ${chalk.green('✓')}`);

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Glad Sad Mad       : ${chalk.magenta(`http://${host}:${port}/#/type/gsm/code/1/token/a`)}
Start Stop Continue: ${chalk.magenta(`http://${host}:${port}/#/type/ssc/code/1/token/a`)}
4 Ls               : ${chalk.magenta(`http://${host}:${port}/#/type/4ls/code/1/token/a`)}
PMI                : ${chalk.magenta(`http://${host}:${port}/#/type/pmi/code/1/token/a`)}
    
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  }
};

module.exports = logger;
