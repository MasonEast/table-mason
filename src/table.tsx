import React, { useCallback, useMemo, createContext, useContext } from 'react'
import { DefaultRecordType, TableComponents, GetComponent, CustomizeComponent } from '@/interface'
import { getPathValue, mergeObject } from '@/utils/dataTreatingUtil'
import Header from '@/Header'
import Body from '@/Body'
export interface TableProps<RecordType extends DefaultRecordType> {
    columns?: Array<RecordType>,
    data?: RecordType[],
    components?: TableComponents
}

export interface TableContextProps<RecordType = DefaultRecordType> {
    prefixCls?: string;
    getComponent: GetComponent;
}

export const TableContext = createContext<TableContextProps>(null)

function Table<RecordType extends DefaultRecordType>(props: TableProps<RecordType>) {

    const { columns, data, components } = props

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
                // prefixCls,
                getComponent,
            }}
        >
            <table>
                <Header
                    columns={columns}
                />
                <Body
                    rowsData={data}
                />
                <tfoot></tfoot>
            </table>
        </TableContext.Provider>
    )
}

export default Table