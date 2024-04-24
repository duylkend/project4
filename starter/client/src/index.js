import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import './index.css'

const domain = "dev-65v1viuq825gt6fc.us.auth0.com"
const clientId = "nKWDfBw8rnPBihtaaEPDcW9xZ3vra6ot"
ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={`https://dev-65v1viuq825gt6fc.us.auth0.com/api/v2/`}
    scope="read:todo write:todo delete:todo"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
)
