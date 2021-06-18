import { tags, paths, components } from './swagger'
import project from '../../../package.json'
import env from '@/main/config/env'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Nucleale API',
    description: 'This is the official Nucleale API',
    version: project.version,
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
  tags,
  paths,
  components
}
