import { FeedFactory } from "../Feed/FeedFactory"
import { Request } from "../Request/Request"
import { Response } from "../Response/Response"
import { Route } from "../Route/Route"

class Controller {

  constructor() {
    console.log('Do we need this constructor?  What a config contain?')
  }

  public async getResponse(event: any, context: any) {
    return await this.executeRequest(event)
  }

  protected async executeRequest(event: any) {
    const request = this.processRequest(event)
    const responseFromRoute = await this.getResponseFromRoute(request)
    const feed = await this.formatFeed(request, responseFromRoute)
    return await new Response(feed)
    
  }

  protected async processRequest(event: any) {
    return new Request(event)
  }

  protected async getResponseFromRoute(request: any) {
    const routeResponse = new Route(request).getResponse()
    return routeResponse
  }

  protected async formatFeed(request: any, dbResponse: any) {
    const feed = await new FeedFactory(request, dbResponse).generate(request.getType())
    return feed
  }

}

export { 
  Controller 
}