//https://tanstack.com.cn/table/latest/docs/api/core/column-def
import "@tanstack/react-table"; 

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    displayName?: string;
    visible?: boolean;
  }
}
