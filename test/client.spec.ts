// test/clinet.spec.ts
import getUser from '../src/client';

test('getUser', async () => {
  // Arrange
  

  // Act
  await getUser()
  .then( (value) => console.log('get Value=>', value))
  .catch((reason) => console.log('failed reason is =>', reason))


});
