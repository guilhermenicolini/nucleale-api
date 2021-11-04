export default {
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.JWT_SECRET || 'secret',
  port: process.env.PORT || 5050,
  iss: process.env.JWT_ISS || 'Issuer',
  exp: process.env.JWT_EXP || '1h',
  aud: process.env.JWT_AUD || 'https://issuer.com',
  serverUrl: process.env.SERVER_URL || 'http://localhost:5050',
  serverName: process.env.SERVER_NAME || 'Local server',
  appUrl: process.env.APP_URL || 'http://localhost:8080',
  whatsappSession: process.env.WHATSAPP_SESSION || 'attendance',
  storageBucket: process.env.STORAGE_BUCKET || 'my-bucket',
  storageTokenFolder: process.env.STORAGE_TOKEN_FOLDER || 'tokens',
  nfse: {
    url: process.env.NFSE_URL,
    methods: {
      lote: {
        request: process.env.NODE_ENV === 'production' ? 'enviarSincrono' : 'testeEnviar',
        response: process.env.NODE_ENV === 'production' ? 'enviarSincronoReturn' : 'testeEnviarReturn'
      }
    },
    ns1: 'http://localhost:8080/WsNFe2/lote',
    tipos: 'http://localhost:8080/WsNFe2/tp',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
    schemaLocation (method: string): string {
      return `http://localhost:8080/WsNFe2/lote http://localhost:8080/WsNFe2/xsd/${method}.xsd`
    }
  },
  gmail: {
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    redirectUri: process.env.GMAIL_REDIRECT_URI,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    user: {
      address: process.env.GMAIL_USER_ADDRESS,
      name: process.env.GMAIL_USER_NAME
    }
  },
  correios: {
    url: process.env.CORREIOS_URL,
    methods: {
      consultaCEP: {
        request: 'consultaCEP',
        response: 'return'
      }
    }
  },
  mode: process.env.NODE_ENV
}
