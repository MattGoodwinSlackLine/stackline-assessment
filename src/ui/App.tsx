import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import "./App.css";
import { AppDispatch, RootState } from "../state";
import { AppActions } from "../state/app/app.reducer";
import Header from "./components/Header";
import Graph from "./components/Graph";
import Table from "./components/Table";
import ItemDisplay from "./components/ItemDisplay";
import { fetchContent } from "../services";

const App: React.FC<AppProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();

  //Fake Call To Fetch Data From JSON Files
  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <div className="MainData">

        <div className="LeftContainer">
          <ItemDisplay />
        </div>

        <div className="RightContainer">
          <Graph />
          <Table />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({});

type AppProps = ReturnType<typeof mapStateToProps> & typeof AppActions;

export default connect(mapStateToProps, AppActions)(App);
