import Axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('auth')

const jwksUrl = 'https://test-endpoint.auth0.com/.well-known/jwks.json'

const certificate = `-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgIJRsbswLLmRQRuMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
BAMTIWRldi02NXYxdml1cTgyNWd0NmZjLnVzLmF1dGgwLmNvbTAeFw0yNDA0MjQx
NTE2MzNaFw0zODAxMDExNTE2MzNaMCwxKjAoBgNVBAMTIWRldi02NXYxdml1cTgy
NWd0NmZjLnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBAJUvdRq9PPK5DBItKdf6C+mq6lZaECRzUffJ0KpXpbLn3Tl8AIM7Xa2J2Cta
A+mxUHff+ZpmZFzAiEkT0FqbPlx4loUof3p/+jD7j1dIy64rk+IOjEcvpewjQtu7
XNL+/oL6vnHCoQ/L8haUMaAiPhKzyNQCkWfUrKMMFjlWsVP4Bes62NGwLRhIfu0E
Sl3xbmAkm1Yb8k7vp+7WlFX0L9czgL556W6PQO278dqU5+mK6erpd8eQbioYinoH
xVje62/qqcOMGFRvIyp24bjYWXWeVzkkZoYsOUXkWIV4WLo6gZU7CPiwtZ+LhNPg
g+SeTH4bjRFD7P1ZkfCOX7eTDqcCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUIXskaPlXL50/4S21UTkixSqrP0cwDgYDVR0PAQH/BAQDAgKEMA0G
CSqGSIb3DQEBCwUAA4IBAQAa/URRj8T39Mvxd197WYCIVOLX5QJCntvNCzkzGCLV
nwe4zkW1jPohNxIWtztZX2DJK6SUyJ12reBf2+FSLpc4yXcp2aB/nwEITji8kzto
yjyH8e6NX2HXrqbkPU9QP/zjMhhKlZ0scMNfbAu+S0TAtVORceGd3hpove6ji/LG
xsDf7DJsp8mSZdL5pwQCjpHAlRE0ku1S141d+QXT1TQBI0DhepyWNA9UDuVF0nCA
7Zp7eZzDM9BBHoVVmfeMIsBAyCf+A3Y5Y12rQN5I8x7wUmUvUW1hCfAovxQ+dtCZ
EhV2wjX5MIzQJOC/FDgH4yOc5BjdjrgxPLDwD2MyJ464
-----END CERTIFICATE-----`;

export async function handler(event) {
  try {
    const jwtToken = await verifyToken(event.authorizationToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader) {
  const token = getToken(authHeader)
  const jwt = jsonwebtoken.decode(token, { complete: true })

  // TODO: Implement token verification
  return jsonwebtoken.verify(token, certificate, { algorithms: ['RS256'] });
}

function getToken(authHeader) {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
