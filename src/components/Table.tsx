import { memo } from "react";

export type TableColumn = {
    key: string;
    label: string;
};

type TableProps = {
    columns: TableColumn[];
    data: Record<string, unknown>[];
};

const Table = memo(({ columns, data }: TableProps) => {
    return (
        <table border={1}>
            <thead>
                <tr>
                    {columns?.map((col) => (
                        <th key={col?.key}>{col?.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((row) => (
                    <tr key={row?.id as string | number}>
                        {columns?.map((col) => (
                            <td key={col?.key}>{String(row[col?.key] ?? "")}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
});

export default Table;