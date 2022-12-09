import { MongoClient } from "../ClientWrappers/MongoClient"
import { MySqlClient } from "../ClientWrappers/MySqlClient"

class DatabaseFactory {

  protected request
  protected databaseMap

  constructor(request: any) {

    this.request = request
    this.databaseMap = new Map([
      ['mysql', MySqlClient],
      ['mongo', MongoClient]
    ])

  }

  public generate(type: string) {
    const ctor = this.databaseMap.get(type)

    if (!ctor) {
      throw new Error(`Invalid database type "${type}".  Database type must correspond with a map key in DatabaseFactory.databaseMap`)
    }
    
    return new ctor()

  }




}

export {
  DatabaseFactory
}