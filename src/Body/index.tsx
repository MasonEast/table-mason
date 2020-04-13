import React, { useContext, useRef } from 'react'
import { ColumnType } from '@/interface'
import { TableContext } from '@/table'
import { useCheckbox } from '@/Hooks/useCheckbox'
export interface BodyRows<RecordType> {
    rowsData: Array<Object>,
    columns: Object[],
    prefixCls: string,
    showRowId: boolean,
    onSelectionChang?: Function
}

function Body<RecordType>({ columns, rowsData, onSelectionChang, showRowId, prefixCls }: BodyRows<RecordType>) {

    const { state, dispatch } = useContext(TableContext).tableReducer

    const trRef: any = useRef()

    const handleCheckbox = (e, item, i) => {
        e.persist()

        if (e.target.checked) {
            dispatch({ type: 'rowSelection', data: [...state.selectRows, item] })
        } else {
            dispatch({ type: 'rowSelection', data: state.selectRows.filter(value => value.cid !== item.cid) })
        }
    }

    return (
        <tbody>
            {
                rowsData.map((item, i) => {
                    return (
                        // <div
                        //     onMouseOver={(e) => {
                        //         e.persist()
                        //         console.log(e)
                        //         e.target.style.backgroundColor = '#333'
                        //     }}
                        //     onMouseOut={(e) => {
                        //         e.target.style.backgroundColor = '#fff'
                        //     }}
                        // >
                        <tr
                            ref={trRef}
                            style={{ backgroundColor: state.checkedBox.includes(i + 1) ? '#e6f7ff' : '#fff' }}

                        >
                            {
                                showRowId &&
                                <td>{i + 1}</td>
                            }
                            {
                                onSelectionChang &&
                                <td>
                                    <input
                                        className={`${prefixCls}-checkbox`}
                                        {...useCheckbox(false, state.checkedBox, i + 1)}
                                        onClick={(e) => handleCheckbox(e, item, i)}
                                    />
                                </td>
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
                        // </div>
                    )
                })
            }
        </tbody>
    )
}

export default Body