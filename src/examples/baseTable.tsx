import React from 'react'
import Table from '../table'
import { Button } from 'antd'

export default function BaseTable() {
    return (
        <Table
            onSelectionChanged={(value) => { console.log(value) }}
            checkbox
            columns={[
                { name: 'a', field: 'a', width: 200 },
                { name: 'b', field: 'b', },
                {
                    name: 'c',
                    field: 'c',
                    width: 200,
                    render: (value) => <h3>{value}</h3>
                },
                {
                    name: '操作',
                    width: 200,
                    render: () => <Button>删除</Button>
                }
            ]}
            data={[
                { a: 'a', b: 'a', c: 'a', },
                { a: 'b', b: 'a', c: 'a', },
                { b: 'a', c: 'a', a: 'e' },
                { b: 'a', c: 'a', }
            ]}
        />
    )
}