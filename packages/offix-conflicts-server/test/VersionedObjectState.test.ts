import test from "ava";
import { VersionedObjectState } from "../src";

test("With conflict", (t) => {
  const objectState = new VersionedObjectState();
  const serverData = { name: "AeroGear", version: 1 };
  const clientData = { name: "Red Hat", version: 2 };
  t.throws(() => {
    objectState.checkForConflict(serverData, clientData);
  });
});

test("Without conflict", (t) => {
  const objectState = new VersionedObjectState();
  const serverData = { name: "AeroGear", version: 1 };
  const clientData = { name: "AeroGear", version: 1 };

  t.notThrows(() => {
    objectState.checkForConflict(serverData, clientData);
    t.deepEqual(clientData.version, 2);
  });

});

test("Missing version", (t) => {
  const objectState = new VersionedObjectState();
  const serverData = { name: "AeroGear"};
  const clientData = { name: "AeroGear", version: 1 };

  t.throws(() => {
    objectState.checkForConflict(serverData, clientData);
  });
});
