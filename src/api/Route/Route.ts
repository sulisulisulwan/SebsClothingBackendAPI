import { DatabaseFactory } from "../../data-access-layer/Factory/DatabaseFactory"
import { routeIF } from "./types"

class Route {

  protected request: any
  protected routeMap: Map<string, routeIF>

  constructor(request: any) {
    this.request = request
    this.routeMap = this.setRouteMap()
  }


  public getResponse() {

    const endpoint = this.getEndpoint()
    const route = this.routeMap.get(endpoint)

    try {

      if (!route) {
        throw new Error(`Invalid route "${endpoint}".  Route must correspond with a map key in Route.routeMap`)
      }
      
      if (route.route === 'db') {
        return this.requestFromDatabase(route.client)
      }

    } catch(e) {
      return e
    }

  }
    
  protected requestFromDatabase(clientType: string) {

    console.log(this.request)

    const database = new DatabaseFactory(this.request).generate(clientType)
    return database.query()

  }

  protected getEndpoint(): string {

    console.log(this.request)

    return 'TODO: This will be an endpoint like /product'
  }

  protected setRouteMap(): Map<string, routeIF> {
    return new Map([
      ['product', { route: 'db', client: 'mongo'}],
      ['reviews', { route: 'db', client: 'mongo'}],
      ['qa', { route: 'db', client: 'mongo'}],
      ['cart', { route: 'db', client: 'mysql'}],
      ['interactions', { route: 'db', client: 'mysql'}],
    ])
  }
  
}

export {
  Route
}