import React from 'react'
import ReactDom from 'react-dom'
import { Button } from 'antd'
import Examples from './examples'

const App = () => {
    return <Examples.BaseTable />
}

ReactDom.render(<App />, document.querySelector('#root'))

