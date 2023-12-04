import React from "react";
import { RootState } from "../../state";
import { AppActions } from "../../state/app/app.reducer";
import { connect } from "react-redux";
import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table as MuiTable,
  TableSortLabel,
} from "@mui/material";

const Table: React.FC<AppProps> = ({
  sortedSales,
  sortSalesData,
  order,
  orderBy,
}) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          {/* Headers with sorting Options */}
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "weekEnding"}
                direction={orderBy === "weekEnding" ? order : "asc"}
                onClick={() => sortSalesData("weekEnding")}
              >
                Week Ending
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "retailSales"}
                direction={orderBy === "retailSales" ? order : "asc"}
                onClick={() => sortSalesData("retailSales")}
              >
                Retail Sales
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "wholesaleSales"}
                direction={orderBy === "wholesaleSales" ? order : "asc"}
                onClick={() => sortSalesData("wholesaleSales")}
              >
                Wholesale Sales
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "unitsSold"}
                direction={orderBy === "unitsSold" ? order : "asc"}
                onClick={() => sortSalesData("unitsSold")}
              >
                Units Sold
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === "retailerMargin"}
                direction={orderBy === "retailerMargin" ? order : "asc"}
                onClick={() => sortSalesData("retailerMargin")}
              >
                Retail Margin
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        {/* Table Data */}
        <TableBody>
          {sortedSales.map((sale) => (
            <TableRow key={sale.weekEnding + "TableRow"}>
              <TableCell key={sale.weekEnding + "WeekEnding"}>
                {sale.weekEnding}
              </TableCell>
              <TableCell align="right" key={sale.weekEnding + "RetailSales"}>
                ${sale.retailSales}
              </TableCell>
              <TableCell align="right" key={sale.weekEnding + "WholesaleSales"}>
                ${sale.wholesaleSales}
              </TableCell>
              <TableCell align="right" key={sale.weekEnding + "Units Sold"}>
                {sale.unitsSold}
              </TableCell>
              <TableCell
                align="right"
                key={sale.weekEnding + "Retailer Margin"}
              >
                ${sale.retailerMargin}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  sortedSales: state.app.sortedSales,
  order: state.app.order,
  orderBy: state.app.orderBy,
});

type AppProps = ReturnType<typeof mapStateToProps> & typeof AppActions;

export default connect(mapStateToProps, AppActions)(Table);
