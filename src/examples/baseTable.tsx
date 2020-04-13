import React from 'react'
import Table from '../table'
import { Button } from 'antd'

export default function BaseTable() {
    return (
        <Table
            onSelectionChang={(value) => { console.log(value) }}
            showRowId={true}
            columns={[
                { name: 'Name', field: 'name', width: 200 },
                { name: 'Age', field: 'age', },
                {
                    name: 'Address',
                    field: 'address',
                    width: 200,
                    // render: (value) => <h3>{value}</h3>
                },
                {
                    name: '操作',
                    width: 200,
                    render: () => <Button>删除</Button>
                }
            ]}
            data={[
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                },
                {
                    key: '4',
                    name: 'Jim Red',
                    age: 32,
                    address: 'London No. 2 Lake Park',
                },
            ]}
        />
    )
}