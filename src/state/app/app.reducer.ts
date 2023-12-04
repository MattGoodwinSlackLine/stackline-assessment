import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchContent } from "../../services";

type ChartDataType = (string | number | Date | Object)[][];
type Sale = {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
};
export type TableHeaderProperty =
  | "weekEnding"
  | "retailSales"
  | "wholesaleSales"
  | "unitsSold"
  | "retailerMargin";

export interface AppState {
  item?: {
    title: string;
    image: string;
    subtitle: string;
    tags: string[];
  };
  sales: Sale[];
  sortedSales: Sale[];
  chartData: ChartDataType;
  orderBy: TableHeaderProperty;
  order: "asc" | "desc";
}

export const initialState = {
  item: undefined,
  sales: [],
  sortedSales: [],
  chartData: [[]],
  orderBy: "weekEnding",
  order: "asc",
} as AppState;

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    sortSalesData(state, action: PayloadAction<TableHeaderProperty>) {
      //Sorting
      let orderBy = action.payload;
      let order: "asc" | "desc" = state.order === "asc" ? "desc" : "asc";
      //Skip sorting by using prestored data
      if (orderBy === "weekEnding") {
        if (order === "asc") {
          return {
            ...state,
            sortedSales: state.sales,
            order: order,
            orderBy: orderBy,
          };
        } else {
          let tempSalesData = [...state.sales];
          tempSalesData.reverse();
          return {
            ...state,
            sortedSales: tempSalesData,
            order: order,
            orderBy: orderBy,
          };
        }
      }

      //Real Sorting
      let tempSalesData = [...state.sales];
      tempSalesData.sort((a, b) => {
        let aCasted = a[orderBy] as number;
        let bCasted = b[orderBy] as number;
        return order === "asc" ? aCasted - bCasted : bCasted - aCasted;
      });
      return {
        ...state,
        sortedSales: tempSalesData,
        order: order,
        orderBy: orderBy,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      let data = action.payload;
      let chartData: ChartDataType = [
        ["WeekEnding", "RetailSales", "WholesaleSales"],
      ];
      return {
        ...state,
        item: {
          title: data.title,
          image: data.image,
          subtitle: data.subtitle,
          tags: data.tags,
        },
        sales: data.sales,
        sortedSales: data.sales,
        //Prebuilding Chart Data
        chartData: chartData.concat(
          data.sales.map((sale) => {
            return [
              new Date(sale.weekEnding),
              sale.retailSales,
              sale.wholesaleSales,
            ];
          }),
        ),
      };
    });
    //Potential Failure Case for real api call
    // builder.addCase(fetchContent.rejected, (state, action) => {})
  },
});

export const AppActions = slice.actions;
export default slice.reducer;
