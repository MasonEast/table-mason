import React from 'react'
import { ColumnType } from '@/interface'

export interface BodyRows<RecordType> {
    rowsData: Array<Object>,
    columns: Object[],
    checkbox: boolean,
    onSelectionChanged: Function
}

function Body<RecordType>({ columns, rowsData, checkbox }: BodyRows<RecordType>) {
    console.log(rowsData)
    return (
        <tbody>
            {
                rowsData.map((item) => {
                    return <tr>
                        {
                            checkbox && <td><input type="checkbox" /></td>
                        }
                        {
                            columns.map((column: ColumnType<RecordType>) => {
                                const { field, render } = column

                                if (render) {
                                    return <td>{render(item[field])}</td>
                                }
                                return <td>{item[field] || ''}</td>
                            })
                        }
                    </tr>
                })
            }
        </tbody>
    )
}

export default Body