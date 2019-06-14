import { ConflictResolution } from "../api/ConflictResolution";
import { ObjectState } from "../api/ObjectState";
import { ObjectStateData } from "../api/ObjectStateData";

/**
 * Object state manager using a version field
 * Detects conflicts and allows moving to next state using the version field of the object
 *
 * VersionedObjectState requires GraphQL types to contain version field.
 * For example:
 *
 * type User {
 *   id: ID!
 *   version: String
 * }
 */
export class VersionedObjectState implements ObjectState {

  public checkForConflict(serverState: ObjectStateData, clientState: ObjectStateData) {
    if (serverState.version && clientState.version) {
      if (serverState.version !== clientState.version) {
        this.resolveOnClient(serverState, clientState);
      }
    } else {
      throw new Error(`Supplied object is missing version field required to determine conflict.
      Server data: ${JSON.stringify(serverState)} Client data: ${JSON.stringify(clientState)}`);
    }
    this.nextState(clientState);
  }

  public nextState(currentObjectState: ObjectStateData) {
    if (currentObjectState.version) {
      currentObjectState.version = currentObjectState.version + 1;
    } else {
      currentObjectState.version = 1;
    }
    return currentObjectState;
  }

  private resolveOnClient(serverState: ObjectStateData, clientState: ObjectStateData) {
    throw new ConflictResolution(serverState, clientState);
  }

}

/**
 * Default instance of VersionedObjectState
 */
export const versionStateHandler = new VersionedObjectState();
