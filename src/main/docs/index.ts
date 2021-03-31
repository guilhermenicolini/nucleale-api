import { paths, components } from './swagger'

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
  servers: [{
    url: 'https://api.nucleale.com',
    description: 'Main server'
  },
  {
    url: 'https://nucleale-api.herokuapp.com',
    description: 'Heroku server'
  },
  {
    url: 'http:/localhost:5050',
    description: 'Local server'
  }],
  tags: [
    {
      name: 'Authentication',
      description: 'Authentication related APIs'
    }
  ],
  paths,
  components
}
