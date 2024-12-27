import { createContext, useContext } from "react";

type TableContextType = {
  tableType: string;
};

type TableProps = {
  tableType: string;
  children: React.ReactNode;
};

type HeaderProps = {
  children: React.ReactNode;
};

type BodyProps<T> = {
  data: T[];
  render: (item: T) => React.ReactNode;
};

type RowProps = {
  children: React.ReactNode;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

function Table({ tableType, children }: TableProps) {
  return (
    <TableContext.Provider value={{ tableType }}>
      <div className="h-fit w-full max-w-fit overflow-y-scroll rounded-md border border-slate-300 bg-white text-base">
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }: HeaderProps) {
  const { tableType } = useContext(TableContext) as TableContextType;

  return (
    <div
      className={`${tableType} sticky top-0 z-[1] grid w-max items-center gap-x-3 border-b bg-slate-50 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-600 transition-none`}
    >
      {children}
    </div>
  );
}

function Body<T>({ data, render }: BodyProps<T>) {
  return <div className="m-0 h-64">{data.map(render)}</div>;
}

function Row({ children }: RowProps) {
  const { tableType } = useContext(TableContext) as TableContextType;
  return (
    <div
      className={`${tableType} grid w-max items-center gap-x-3 border-b border-gray-100 bg-white px-6 py-3 transition-none`}
    >
      {children}
    </div>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
