/* global document */
import ReactDOM from 'react-dom'
import 'typeface-roboto' // eslint-disable-line
import appWithStyles from './App'
import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(appWithStyles(), document.getElementById('root'))
registerServiceWorker()
