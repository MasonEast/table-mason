/*
 * @Description: 
 * @Date: 2020-04-09 18:22:54
 * @Author: mason
 */
import { State, ColumnType } from '@/interface'

interface Action<T> {
    type: string,
    data: T[]
}

export default function reducer<T>(
    state: State<T>,
    action: Action<T>
): State<T> {
    const { type, data } = action
    console.log('reducer', type, data)

    switch (type) {
        case 'select':
            return { ...state, selectRows: data }
        case 'rowSelection':
            return { ...state, selectRows: data, checkedBox: data.map((item: ColumnType<T>) => item.cid) }
        default:
            return { ...state }
    }
}