import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { A } from './A'
import { B } from './B'
import { C } from './C'

const App: React.FC = () => {
  return (
    <>
      <A />
      <B />
      <C />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
