import { FC, ReactNode } from "react";
import { IconType } from "react-icons";

type Column = {
  header: string;
  accessor: string;
  render?: (value: any) => ReactNode;
};

type Row = Record<string, any>;

type Props = {
  icon: IconType;
  tableName: string;
  columns: Column[];
  rows: Row[];
};

const TableDota: FC<Props> = ({ icon: Icon, tableName, columns, rows }) => {
  return (
    <div className="border relative rounded-lg border-[#3f3f3f] flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-6">
          <span className="p-4 bg-primary rounded-lg">
            <Icon size={20} />
          </span>
          <span className="flex flex-col gap-2">
            <span className="font-bold text-lg">TOTAL {rows.length}</span>
            <span className="text-3xl">{tableName}</span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border-0">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="border border-[#3f3f3f] border-t-0 border-x-0 px-4 py-2 text-left"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-[#121212]" : "bg-[#1e1e1e]"}
              >
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className={`border-0 px-4 py-2 ${
                      col.accessor === "estatus"
                        ? row[col.accessor] === "PAGADO"
                          ? "text-green-500"
                          : row[col.accessor] === "PENDIENTE"
                          ? "text-blue-500"
                          : "text-red-500"
                        : ""
                    }`}
                  >
                    {col.render
                      ? col.render(row[col.accessor])
                      : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDota;
