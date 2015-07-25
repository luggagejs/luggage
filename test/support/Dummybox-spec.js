import { expect } from 'chai';
import Dummybox from './Dummybox';

describe('Dummybox', () => {
  it('should have a Client', () => {
    expect(Dummybox).to.have.property('Client');
  })

  describe('Dummybox.Client', () => {
    var client;

    beforeEach(() => {
      client = new Dummybox.Client({
        key: 'blah blah blah mr. Freeman'
      });
    });

    it('should have Dropbox.Client like API', () => {
      expect(client).to.respondTo('isAuthenticated');
      expect(client).to.respondTo('authenticate');
      expect(client).to.respondTo('readFile');
      expect(client).to.respondTo('writeFile');
    });

    describe('Dummybox.Client#isAuthenticated', () => {
      it('always returns true', () => {
        expect(client.isAuthenticated()).to.be.true;
      })
    });

    describe('Dummybox.Client#authenticate', () => {
      it('invokes callback without any errors', (done) => {
        client.authenticate({}, done);
      });

      it('passes Client instance to callback', (done) => {
        client.authenticate({}, (error, c) => {
          expect(c).to.be.instanceof(Dummybox.Client);
          done();
        });
      });
    });

    describe('Dummybox.Client#readFile', () => {
      it('invokes callback with file content', (done) => {
        const fileContent = 'blah blah blah mr. Freeman';

        client.files['thoughts.txt'] = fileContent;

        client.readFile('thoughts.txt', (error, data) => {
          expect(error).to.not.exist;
          expect(data).to.equal(fileContent);
          done();
        })
      })
    });

    describe('Dummybox.Client#writeFile', () => {
      it('writes data to files hash', () => {
        const fileContent = 'blah blah blah mr. Freeman';
        client.writeFile('another.txt', fileContent);
        expect(client.files['another.txt']).to.equal(fileContent);
      })

      it('invokes callback without errors', (done) => {
        client.writeFile('yetanother.txt', 'lol', done)
      })
    });
  });
})
