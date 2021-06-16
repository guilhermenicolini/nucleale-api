export default {
  mongoUrl: process.env.MONGO_URL,
  secret: process.env.JWT_SECRET || 'secret',
  port: process.env.PORT || 5050,
  iss: process.env.JWT_ISS || 'Issuer',
  exp: process.env.JWT_EXP || '1h',
  aud: process.env.JWT_AUD || 'https://issuer.com',
  serverUrl: process.env.SERVER_URL || 'http://localhost:5050',
  serverName: process.env.SERVER_NAME || 'Local server',
  appUrl: process.env.APP_URL || 'http://localhost:5051',
  whatsappSession: process.env.WHATSAPP_SESSION || 'attendance',
  storageBucket: process.env.STORAGE_BUCKET || 'my-bucket',
  storageTokenFolder: process.env.STORAGE_TOKEN_FOLDER || 'tokens',
  nfse: {
    url: 'http://issdigital.campinas.sp.gov.br/WsNFe2/LoteRps.jws?wsdl',
    methods: {
      lote: process.env.NODE_ENV === 'production' ? 'enviarSincrono' : 'testeEnviar'
    },
    ns1: 'http://localhost:8080/WsNFe2/lote',
    tipos: 'http://localhost:8080/WsNFe2/tp',
    xsi: 'http://www.w3.org/2001/XMLSchema-instance',
    schemaLocation (method: string): string {
      return `http://localhost:8080/WsNFe2/lote http://localhost:8080/WsNFe2/xsd/${method}.xsd`
    }
  },
  mode: process.env.NODE_ENV
}
