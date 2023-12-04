import React from "react";
import { RootState } from "../../state";
import { AppActions } from "../../state/app/app.reducer";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";
import "./Graph.css";

export const options = {
  title: "Retail Sales",
  //Curves the lines instead of having sharp points
  curveType: "function",
  legend: { position: "none" },
  //Hides the Y Axis
  vAxis: {
    textPosition: "none",
    minValue: 0,
    maxValue: 1000000,
    gridlines: {
      color: "transparent",
    },
  },
  hAxis: {
    format: "MMM",
    gridlines: {
      color: "transparent",
    },
  },
  chartArea: { width: "90%", height: "80%" },
  tooltip: { trigger: "none" },
};

const Graph: React.FC<AppProps> = ({ chartData }) => {
  return (
    <div className="GraphContainer">
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  chartData: state.app.chartData,
});

type AppProps = ReturnType<typeof mapStateToProps> & typeof AppActions;

export default connect(mapStateToProps, AppActions)(Graph);
