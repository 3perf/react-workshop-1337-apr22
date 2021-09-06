import { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";

function DarkModeInfo() {
  const { mode } = useContext(DarkModeContext);

  return <>Mode: {mode}</>;
}

export default DarkModeInfo;
