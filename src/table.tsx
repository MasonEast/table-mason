import React, { useCallback, useMemo, createContext, useReducer } from 'react'
import { DefaultRecordType, TableComponents, GetComponent, CustomizeComponent, TableReducer } from '@/interface'
import { getPathValue, mergeObject } from '@/utils/dataTreatingUtil'
import Header from '@/Header'
import Body from '@/Body'
import reducer from '@/reducer'
export interface TableProps<RecordType extends DefaultRecordType> {
    columns?: Array<RecordType>,
    data?: RecordType[],
    checkbox: boolean,
    onSelectionChanged: Function
    components?: TableComponents
}

export interface TableContextProps<RecordType = DefaultRecordType> {
    prefixCls?: string;
    getComponent?: GetComponent;
    tableReducer: TableReducer<RecordType>
}

export const TableContext = createContext<TableContextProps>(null)

function Table<RecordType extends DefaultRecordType>(props: TableProps<RecordType>) {

    const { columns, data, checkbox = false, onSelectionChanged, components } = props

    const [state, dispatch] = useReducer(reducer, {
        selectRows: []
    });

    const mergedComponents = useMemo(() => mergeObject<TableComponents>(components, {}), [
        components,
    ]);

    const getComponent = useCallback<GetComponent>(
        (path, defaultComponent) =>
            getPathValue<CustomizeComponent, TableComponents>(mergedComponents, path) || defaultComponent,
        [mergedComponents],
    );

    return (
        <TableContext.Provider
            value={{
                tableReducer: { state, dispatch }
            }}
        >
            <table>
                <Header
                    checkbox={checkbox}
                    columns={columns}
                    onSelectionChanged={onSelectionChanged}
                />
                <Body
                    rowsData={data}
                    columns={columns}
                    checkbox={checkbox}
                    onSelectionChanged={onSelectionChanged}
                />
                <tfoot></tfoot>
            </table>
        </TableContext.Provider>
    )
}

export default Table