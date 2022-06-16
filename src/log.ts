// Update this variable to enable debug logs
export let debugEnabled = require('./config.json').logLevel === 'debug';

export class Logger {
  static for(id: string): Logger {
    return new Logger(id);
  }

  private loggerId;
  constructor(id: string) {
    this.loggerId = id;
  }

  log(text: string) {
    console.log(`[${this.loggerId}] ${text}`);
  }

  error(text: string) {
    console.error(`[${this.loggerId}] ${text}`);
  }

  debug(text: string) {
    if (debugEnabled) {
      console.debug(`[${this.loggerId}] ${text}`);
    }
  }
}
