import React, { useContext } from 'react'
import { ColumnsType, ColumnType, CellType } from '@/interface'
import { TableContext } from '@/table'
export interface HeaderProps<RecordType> {
    columns: ColumnsType<RecordType>;
    checkbox: boolean,
    onSelectionChanged: Function
}

function Header<RecordType>({
    columns,
    checkbox,
}: HeaderProps<RecordType>): React.ReactElement {

    const { state, dispatch } = useContext(TableContext).tableReducer

    const handleSelection = (e) => {
        console.log(state)
        dispatch({ type: 'isSelectAll', data: [] })
    }

    return (
        <thead>
            <tr>
                {
                    checkbox && <th>
                        <input
                            type="checkbox"
                            onClick={handleSelection}
                        />
                    </th>
                }
                {
                    columns.map((item: ColumnType<RecordType>) => {
                        return <th style={{ width: item.width || 100 }}>{item.name}</th>
                    })
                }
            </tr>
        </thead>
    )
}

export default Header