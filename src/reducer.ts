/*
 * @Description: 
 * @Date: 2020-04-09 18:22:54
 * @Author: mason
 */
interface ReducerProps {
    state: 1
}

export default function reducer<RecordType>(state: { selectRows: RecordType[] }, action: { type: string, data: RecordType[] }): { selectRows: RecordType[] } {
    const { type, data } = action
    console.log(type, data)

    switch (type) {
        case 'select':
            return { ...state, selectRows: data }
        case 'isSelectAll':
            return { ...state, selectRows: data }
        default:
            return { ...state }
    }
}