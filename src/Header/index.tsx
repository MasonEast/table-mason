import React, { useContext, useRef, useEffect } from 'react'
import { ColumnsType, ColumnType, CellType } from '@/interface'
import { TableContext } from '@/table'
import { useCheckbox } from '@/Hooks/useCheckbox'
export interface HeaderProps<RecordType> {
    columns: ColumnsType<RecordType>;
    rowsData: Array<Object>,
    checkbox: boolean,
    prefixCls: string,
    onSelectionChanged: Function
}

function Header<RecordType>({
    columns,
    rowsData,
    checkbox,
    prefixCls
}: HeaderProps<RecordType>): React.ReactElement {

    const { state, dispatch } = useContext(TableContext).tableReducer
    const checkboxRef: any = useRef()
    useEffect(() => {
        if (0 < state.selectRows.length && state.selectRows.length < rowsData.length) {
            checkboxRef.current.indeterminate = true
        } else {
            checkboxRef.current.indeterminate = false
        }
    }, [state.selectRows])

    const handleSelection = (e) => {
        e.persist()
        if (e.target.checked) {
            dispatch({ type: 'isSelectAll', data: rowsData })
        } else {
            dispatch({ type: 'isSelectAll', data: [] })
        }
    }

    return (
        <thead>
            <tr>
                {
                    checkbox && <th>
                        <input
                            type="checkbox"
                            ref={checkboxRef}
                            className={`${prefixCls}-checkbox`}
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