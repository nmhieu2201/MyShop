import React, { memo } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import Tippy from "@tippyjs/react/headless";
import SortOption from "../SortOption/SortOption";

function Sort(props) {
  let { options } = props;
  return (
    <Tippy
      placement="bottom-end"
      interactive
      render={(attrs) => (
        <SortOption
          attrs={attrs}
          options={options}
        />
      )}>
      <Typography sx={{ cursor: "pointer", color:"red" }}>Sắp xếp</Typography>
    </Tippy>
  );
}
export default memo(Sort)
Sort.propTypes = {
  options: PropTypes.array.isRequired,
};
