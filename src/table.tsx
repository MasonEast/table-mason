import React, { useCallback, useMemo, createContext, useReducer, useEffect } from 'react'
import { DefaultRecordType, TableComponents, GetComponent, CustomizeComponent, TableReducer, ColumnType } from '@/interface'
import { getPathValue, mergeObject } from '@/utils/dataTreatingUtil'
import Header from '@/Header'
import Body from '@/Body'
import reducer from '@/reducer'
export interface TableProps<RecordType extends DefaultRecordType> {
    columns?: ColumnType<RecordType>[],
    data?: any[],
    prefixCls?: string,
    showRowId: boolean,
    onSelectionChang: Function
    components?: TableComponents
}

export interface TableContextProps<RecordType = DefaultRecordType> {
    prefixCls?: string;
    getComponent?: GetComponent;
    tableReducer: TableReducer<RecordType>
}

export const TableContext = createContext<TableContextProps>(null)


function Table<RecordType extends DefaultRecordType>(props: TableProps<RecordType>) {

    const { columns, data, showRowId = false, onSelectionChang, prefixCls, components } = props

    const [state, dispatch] = useReducer(reducer, {
        selectRows: [],
        checkedBox: []
    });

    useEffect(() => {
        onSelectionChang(state.selectRows)
    }, [state.selectRows])


    for (let i = 0, len = data.length; i < len; i++) {
        data[i].cid = i + 1
    }

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
            <table
                className={`${prefixCls}`}
            >
                <Header
                    showRowId={showRowId}
                    columns={columns}
                    prefixCls={prefixCls}
                    rowsData={data}
                    onSelectionChang={onSelectionChang}
                />
                <Body
                    rowsData={data}
                    columns={columns}
                    prefixCls={prefixCls}
                    showRowId={showRowId}
                    onSelectionChang={onSelectionChang}
                />
                <tfoot></tfoot>
            </table>
        </TableContext.Provider>
    )
}

Table.defaultProps = {
    rowKey: 'key',
    prefixCls: 'table-mason',
    emptyText: () => 'No Data',
};

export default Table