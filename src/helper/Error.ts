export class FetchDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = `[Fetch Data Error]`;
  }
}

export class SendDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = `[Send Data Error]`;
  }
}
