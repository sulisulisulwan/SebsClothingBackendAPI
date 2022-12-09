
class FeedFactory {

  protected request
  protected dbResponse

  constructor(request: any, dbResponse: any) {

    this.request = request
    this.dbResponse = dbResponse

  }

  generate(type: string) {

    return 'This will be feed of type' + type
  }
}

export {
  FeedFactory
}