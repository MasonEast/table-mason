import React from 'react'
import ReactDom from 'react-dom'
import { Button } from 'antd'
import Table from './table'

const App = () => {
    console.log(11153)
    return <Table />
}

ReactDom.render(<App />, document.querySelector('#root'))

