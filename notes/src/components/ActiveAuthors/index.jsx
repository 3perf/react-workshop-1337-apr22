import { Avatar, AvatarGroup } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { memo } from "react";
import { useSelector } from "react-redux";
import avatar1 from "./avatar1.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.jpg";

// const activeThisMonthSelector = createSelector(
//   (state) => state.users,
//   (users) => users.filter((i) => i.lastActiveDate.includes("2022-04"))
// );
// state => [..., ..., ...]
// state => (return the same one)

function ActiveAuthors() {
  // const activeThisMonth = useSelector(activeThisMonthSelector);

  const activeThisMonthCount = useSelector(
    (state) =>
      state.users.filter((i) => i.lastActiveDate.includes("2022-04")).length
  );

  const activeThisMonthNames = useSelector((state) =>
    state.users
      .filter((i) => i.lastActiveDate.includes("2022-04"))
      .map((i) => i.name)
      .join(", ")
  );

  return (
    <div className="primary-pane__authors">
      <div className="primary-pane__authors-last-active">
        {activeThisMonth.length} users active this month:{" "}
        {activeThisMonth.map(({ name }) => name).join(", ")}
      </div>
      <AvatarGroup max={2}>
        <Avatar src={avatar1} />
        <Avatar src={avatar2} />
        <Avatar src={avatar3} />
      </AvatarGroup>
    </div>
  );
}

ActiveAuthors.whyDidYouRender = true;

const ActiveAuthorsMemo = memo(ActiveAuthors);
export { ActiveAuthorsMemo as ActiveAuthors };
