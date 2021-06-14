import { GoogleCloudStorageAdapter } from '@/infra/storage/google-cloud-storage-adapter'

let saveStub = jest.fn()
let deleteStub = jest.fn()
let downloadStub = jest.fn().mockImplementation(() => [Buffer.from(JSON.stringify({ ok: 'ok' }), 'utf8')])
let existsStub = jest.fn().mockImplementation(() => [true])
let getFilesStub = jest.fn().mockImplementation(() => [[{ name: 'token1' }, { name: 'token2' }]])

const fileStub = jest.fn().mockImplementation(() => ({
  exists: existsStub,
  save: saveStub,
  delete: deleteStub,
  download: downloadStub
}))

jest.mock('@google-cloud/storage', () => ({
  Storage: jest.fn().mockImplementation(() => {
    return {
      bucket: jest.fn().mockImplementation(() => ({
        file: fileStub,
        getFiles: getFilesStub
      }))
    }
  })
}))

const makeSut = (): GoogleCloudStorageAdapter => new GoogleCloudStorageAdapter('any_bucket')

describe('GoogleCloudStorage Adapter', () => {
  beforeEach(async () => {
    existsStub = jest.fn().mockImplementationOnce(() => [true])
    downloadStub = jest.fn().mockImplementation(() => [Buffer.from(JSON.stringify({ ok: 'ok' }), 'utf8')])
    saveStub = jest.fn()
    deleteStub = jest.fn()
    getFilesStub = jest.fn().mockImplementation(() => [[{ name: 'token1' }, { name: 'token2' }]])
  })

  test('Should get file on success', async () => {
    const sut = makeSut()
    const file = await sut.get('any_file')
    expect(fileStub).toHaveBeenLastCalledWith('any_file')
    expect(existsStub).toHaveBeenCalled()
    expect(downloadStub).toHaveBeenCalled()
    expect(file.toString()).toEqual(JSON.stringify({ ok: 'ok' }))
  })

  test('Should return null if file not exists', async () => {
    const sut = makeSut()
    existsStub = jest.fn().mockImplementationOnce(() => [false])
    const file = await sut.get('any_file')
    expect(file).toBeFalsy()
    expect(fileStub).toHaveBeenLastCalledWith('any_file')
    expect(existsStub).toHaveBeenCalled()
  })

  test('Should save file on success', async () => {
    const sut = makeSut()
    await sut.save('any_file', 'any_data')
    expect(fileStub).toHaveBeenLastCalledWith('any_file')
    expect(saveStub).toHaveBeenCalledWith('any_data')
  })

  test('Should remove file on success', async () => {
    const sut = makeSut()
    await sut.remove('any_file')
    expect(fileStub).toHaveBeenLastCalledWith('any_file')
    expect(existsStub).toHaveBeenCalled()
    expect(deleteStub).toHaveBeenCalled()
  })

  test('Should not call remove if file not exists', async () => {
    const sut = makeSut()
    existsStub = jest.fn().mockImplementationOnce(() => [false])
    await sut.remove('any_file')
    expect(fileStub).toHaveBeenLastCalledWith('any_file')
    expect(existsStub).toHaveBeenCalled()
    expect(deleteStub).not.toHaveBeenCalled()
  })

  test('Should get files on success', async () => {
    const sut = makeSut()
    const files = await sut.getFiles('any_folder')
    expect(getFilesStub).toHaveBeenLastCalledWith({ prefix: 'any_folder/' })
    expect(files).toEqual(['token1', 'token2'])
  })
})
