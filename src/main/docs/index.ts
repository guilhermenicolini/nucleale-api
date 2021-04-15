import { paths, components } from './swagger'
import env from '@/main/config/env'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Nucleale API',
    description: 'This is the official Nucleale API',
    version: '1.0.0',
    contact: {
      name: 'Guilherme Nicolini',
      email: 'guilhermenicolini@gmail.com',
      url: 'https://www.linkedin.com/in/guilhermenicolini'
    },
    license: {
      name: 'MIT Licence',
      url: 'https://spdx.org/licenses/MIT.html'
    }
  },
  servers: [
    {
      url: env.serverUrl,
      description: env.serverName
    }
  ],
  tags: [
    {
      name: 'Authentication',
      description: 'Authentication related APIs'
    },
    {
      name: 'Accounts',
      description: 'Accounts related APIPs'
    },
    {
      name: 'Addresses',
      description: 'Addresses related APIPs'
    }
  ],
  paths,
  components
}
