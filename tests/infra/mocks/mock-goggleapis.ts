import { google } from 'googleapis'

export const mockGoogleApis = (token: string = 'any_id'): jest.Mocked<typeof google> => {
  const mockedGoogleApis = google as jest.Mocked<typeof google>
  jest.spyOn(new mockedGoogleApis.auth.OAuth2(), 'getAccessToken').mockImplementation(() => ({ token }))
  return mockedGoogleApis
}
