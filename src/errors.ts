export class RequiresUserActivationError extends Error {
  public readonly name = 'RequiresUserActivationError';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, RequiresUserActivationError.prototype);
  }
}

export class PreconditionFailedError extends Error {
  public readonly name = 'PreconditionFailedError';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, PreconditionFailedError.prototype);
  }
}
