import { withStyles } from "@material-ui/styles";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { sortProduct } from "../../redux/productReducer/productReducer";

function SortOption(props) {
  const dispatch = useDispatch();
  const [sort, setSort] = useState(0);
  let { attrs, options, classes } = props;
  const _handleChangeOption = (e) => {
    setSort(e.target.value);
    dispatch(sortProduct(sort));
  };
  const _renderOptions = () => {
    return options.map((option) => {
      return (
        <li
          key={option.value}
          value={option.value}
          onClick={(e) => {
            _handleChangeOption(e);
          }}>
          {option.label}
        </li>
      );
    });
  };
  return (
    <div tabIndex="-1" {...attrs} className={classes.box}>
      <ul>{_renderOptions()}</ul>
    </div>
  );
}
export default withStyles({
  box: {
    boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
    backgroundColor: "#fff",
    padding: "5px 0",
    "& ul": {
      listStyleType: "none",
      "& li": {
        padding: "8px 10px",
        color: "#000",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#dcdcdc",
        },
      },
    },
  },
})(SortOption);
SortOption.propTypes = {
  attrs: PropTypes.object.isRequired,
  classes:PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
};
