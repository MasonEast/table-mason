import React from 'react'
import Table from '../table'

export default function BaseTable() {
    return (
        <Table
            columns={[
                { className: 'a' },
                { className: 'b' },
                { className: 'c' }
            ]}
            data={[]}
        />
    )
}