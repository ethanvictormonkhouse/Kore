import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  userStatus: "5",
});

export { useGlobalState, setGlobalState };
