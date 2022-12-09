
class Request {
  
  /**
   * Accepts the lambda event and parses out a custom standardized request object 
   */

  protected event
  protected request

  constructor(event: any) {
    this.event = event
    this.request = this.parseRequestDataFromEvent()
  }

  protected parseRequestDataFromEvent() {

    try {
      this.validateRequestFields()
  
      const event = this.event
      console.log(event)
      // Will be pulling data from ^^ this
  
      const queryParams = { id: 'someUUId', someOtherParam: 'someOtherValue' }
      return {
        queryParams: queryParams
      }

    } catch(e) {
      return e
    }

  }

  protected validateRequestFields() {
      // some validation logic
  }



}

export { 
  Request 
}