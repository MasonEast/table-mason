import React, { useCallback, useMemo } from 'react'
import { DefaultRecordType, TableComponents, GetComponent, CustomizeComponent } from '@/interface'
import { getPathValue, mergeObject } from '@/utils/dataTreatingUtil'


export interface TableProps<RecordType extends DefaultRecordType> {
    columns?: Array<RecordType>,
    data?: RecordType[],
    components?: TableComponents
}

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
        <table>
            <tr>
                <th>Month</th>
                <th>Savings</th>
            </tr>
            <tr>
                <td>January</td>
                <td>$00</td>
            </tr>
        </table>
    )
}

export default Table