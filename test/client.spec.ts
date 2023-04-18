// test/clinet.spec.ts
import {api} from '../src/client';
import { assert, expect, test } from 'vitest'

test('getUser', async () => {
  // Arrange
  const client = api()
  

  // Act
  await client.getUsers()
  .then( (value) => console.log('get Value=>', value))
  .catch((reason) => console.log('failed reason is =>', reason))
});
