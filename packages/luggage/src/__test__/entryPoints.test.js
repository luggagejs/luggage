describe('entry points', () => {
  it('the main entry point has no backends', async () => {
    const core = await import('@luggage/core')
    expect(Object.keys(core).sort()).toEqual([
      'Collection', 'Collections', 'CollectionExistsError', 'ConflictError',
      'Luggage', 'ParseError', 'RecordNotFoundError', 'default', 'metaProperties'
    ].sort())
  })

  it('exports DropboxBackend from @luggage/core/dropbox', async () => {
    const { default: Default, DropboxBackend } = await import('@luggage/core/dropbox')
    expect(DropboxBackend).toBe(Default)
    expect(DropboxBackend).toBeInstanceOf(Function)
  })

  it('exports GoogleDriveBackend and its helpers from @luggage/core/google-drive', async () => {
    const drive = await import('@luggage/core/google-drive')
    expect(Object.keys(drive).sort()).toEqual(['GoogleDriveBackend', 'default', 'getAPIClient', 'handleSignIn'])
  })

  it('exports DummyBackend from @luggage/core/dummy', async () => {
    const { default: DummyBackend } = await import('@luggage/core/dummy')
    expect(DummyBackend).toBeInstanceOf(Function)
  })
})
