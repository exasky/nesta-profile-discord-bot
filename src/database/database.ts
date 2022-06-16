import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Logger } from '../log';

import { UserModel } from './user.model';

export class Database {
  private static DATABASE_FILE_NAME = 'user-profiles';
  private static DATABASE_PATH_SEPARATOR = '/';
  private static _instance: Database;

  static get intance(): Database {
    if (!this._instance) {
      this._instance = new Database();
    }
    return this._instance;
  }

  private db: JsonDB;
  private logger: Logger;

  constructor() {
    // Use JSON file for storage
    this.db = new JsonDB(
      new Config(
        Database.DATABASE_FILE_NAME,
        false,
        false,
        Database.DATABASE_PATH_SEPARATOR
      )
    );
    this.logger = Logger.for('DATABASE');
  }

  getUserById(id: string): UserModel | null {
    try {
      this.logger.debug(`get user ${id}`);
      const foundUser = this.db.getData(
        `${Database.DATABASE_PATH_SEPARATOR}${id}`
      );
      return foundUser;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  updateUser(user: UserModel): UserModel {
    this.logger.debug(`update user ${user.id} with ${JSON.stringify(user)}`);

    this.db.push(`${Database.DATABASE_PATH_SEPARATOR}${user.id}`, user, true);
    this.db.save();

    return user;
  }

  deleteUserById(id: string) {
    this.logger.debug(`delete user ${id}`);

    this.db.delete(`${Database.DATABASE_PATH_SEPARATOR}${id}`);
    this.db.save();
  }
}
