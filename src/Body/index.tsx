import React from 'react'

export interface BodyRows<RecordType> {
    rowsData: RecordType[]
}

function Body<RecordType>({ rowsData }: BodyRows<RecordType>) {
    console.log(rowsData)
    return (
        <tbody>
            {
                rowsData.map(item => {
                    return <tr>
                        {
                            Object.keys(item).map(subItem => {
                                return <td>{item[subItem]}</td>
                            })
                        }
                    </tr>
                })
            }
        </tbody>
    )
}

export default Body