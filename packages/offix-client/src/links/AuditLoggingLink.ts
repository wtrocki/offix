import { ApolloLink, NextLink, Operation } from "apollo-link";

export class AuditLoggingLink extends ApolloLink {

  private readonly clientId: string;
  private readonly metricsPayload: any;

  constructor(clientId: string, metricsPayload: any) {
    super();
    this.clientId = clientId;
    this.metricsPayload = metricsPayload;
  }

  public request(operation: Operation, forward?: NextLink) {
    if (!forward) {
      return null;
    }
    if (!operation.extensions) {
      operation.extensions = {};
    }

    operation.extensions.metrics = {
      clientId: this.clientId,
      timestamp: new Date().getTime(),
      data: this.metricsPayload
    };
    return forward(operation);
  }
}
