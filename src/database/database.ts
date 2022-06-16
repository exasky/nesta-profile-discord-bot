import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

import { UserModel } from './user.model';

export class Database {
  private static DATABASE_FILE_NAME = 'user-profiles';
  private static _instance: Database;

  static get intance(): Database {
    if (!this._instance) {
      this._instance = new Database();
    }
    return this._instance;
  }

  private db: JsonDB;

  constructor() {
    // Use JSON file for storage
    this.db = new JsonDB(
      new Config(Database.DATABASE_FILE_NAME, false, false, '/')
    );
  }

  getUserById(id: string): UserModel | null {
    try {
      console.log(`get user ${id}`);
      const foundUser = this.db.getData(`/${id}`);
      return foundUser;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  updateUser(user: UserModel): UserModel {
    this.db.push(`/${user.id}`, user, true);
    this.db.save();

    console.log(`update user ${user.id}`);

    return user;
  }
}
