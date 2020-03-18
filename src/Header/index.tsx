import React from 'react'
import { ColumnsType, CellType } from '@/interface'

export interface HeaderProps<RecordType> {
    columns: ColumnsType<RecordType>;
}

function parseHeaderRows<RecordType>(
    columns: ColumnsType<RecordType>,
): CellType<RecordType>[][] {
    let rows = [[]]

    columns.map(column => rows[0].push(column))

    return rows
}

function Header<RecordType>({
    columns,
}: HeaderProps<RecordType>): React.ReactElement {

    const rows: CellType<RecordType>[][] = React.useMemo(
        () => parseHeaderRows(columns),
        [columns],
    );

    return (
        <thead>
            {
                rows.map(row => (
                    <tr>
                        {row.map(cell => (
                            <th>{cell.className}</th>
                        ))}
                    </tr>
                ))
            }
        </thead>
    )
}

export default Header