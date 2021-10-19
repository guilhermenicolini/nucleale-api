import { google } from 'googleapis'
import faker from 'faker'

export const mockGoogleApis = (token: string = faker.datatype.uuid()): jest.Mocked<typeof google> => {
  const mockedGoogleApis = google as jest.Mocked<typeof google>
  jest.spyOn(new mockedGoogleApis.auth.OAuth2(), 'getAccessToken').mockImplementation(() => ({ token }))
  return mockedGoogleApis
}
