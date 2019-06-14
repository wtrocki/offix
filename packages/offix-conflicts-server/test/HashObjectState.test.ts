import test from "ava";
import { HashObjectState } from "../src";

test("With conflict", (t) => {
  const hashMethod = (data: any) => JSON.stringify(data);
  const objectState = new HashObjectState(hashMethod);
  const serverData = { name: "AeroGear", ignoredProperty: "test" };
  const clientData = { name: "Red Hat" };
  t.throws(()=>{
    objectState.checkForConflict(serverData, clientData);
  });

});