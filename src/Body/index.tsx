import React, { useContext } from 'react'
import { ColumnType } from '@/interface'
import { TableContext } from '@/table'
import { useCheckbox } from '@/Hooks/useCheckbox'
export interface BodyRows<RecordType> {
    rowsData: Array<Object>,
    columns: Object[],
    prefixCls: string,
    checkbox: boolean,
    onSelectionChanged: Function
}

function Body<RecordType>({ columns, rowsData, checkbox, prefixCls }: BodyRows<RecordType>) {

    const { state, dispatch } = useContext(TableContext).tableReducer

    // const [checkState, checkStateProps] = useCheckbox(false)

    const handleCheckbox = (e, item, i) => {
        e.persist()
        // console.log([...state.selectRows, item])
        if (e.target.checked) {
            dispatch({ type: 'isSelectAll', data: [...state.selectRows, item] })
        } else {
            // console.log(state.selectRows.splice(i, 1))

            dispatch({ type: 'isSelectAll', data: state.selectRows.filter(value => value.cid !== item.cid) })
        }
        console.log(111, state.selectRows)
    }

    return (
        <tbody>
            {
                rowsData.map((item, i) => {
                    return <tr>
                        {
                            checkbox &&
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
                })
            }
        </tbody>
    )
}

export default Body