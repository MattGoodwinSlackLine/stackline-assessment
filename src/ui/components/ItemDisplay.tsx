import React from "react";
import { RootState } from "../../state";
import { AppActions } from "../../state/app/app.reducer";
import { connect } from "react-redux";
import "./ItemDisplay.css";
import { Typography } from "@mui/material";

const ItemDisplay: React.FC<AppProps> = ({ item }) => {
  return (
    <div className="ItemContainer">
      {/* Image */}
      <img className="ItemImage" src={item?.image} />

      {/* Title */}
      <Typography align="center" variant="h5" noWrap component="div">
        {item?.title}
      </Typography>

      {/* Sub-Title */}
      <Typography align="center" variant="caption" component="div">
        {item?.subtitle}
      </Typography>

      {/* Tags */}
      <div className="TagContainer">
        {item?.tags.map((tag) => {
          return (
            <div className="Tag" key={tag}>
              <Typography variant="caption" component="div">
                {tag}
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  item: state.app.item,
});

type AppProps = ReturnType<typeof mapStateToProps> & typeof AppActions;

export default connect(mapStateToProps, AppActions)(ItemDisplay);
