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
            data={[
                { className: 'a', className2: 'a', className3: 'a', },
                { className: 'b', className2: 'a', className3: 'a', },
                { className: 'c', className2: 'a', className3: 'a', }
            ]}
        />
    )
}