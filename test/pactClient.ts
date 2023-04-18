/**
 * @jest-environment node
 */
import { pactWith } from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';
import { api } from '../src/client';

pactWith({ consumer: 'MyConsumer', provider: 'MyProvider' }, provider => {
  let client : any;

  beforeEach(async () => {
    client = api(provider.mockService.baseUrl)
  });

  describe('health endpoint', () => {
    // Here we set up the interaction that the Pact
    // mock provider will expect.
    //
    // jest-pact takes care of validating and tearing
    // down the provider for you.
    beforeEach(() => // note the implicit return.
                     // addInteraction returns a promise.
                     // If you don't want to implicitly return,
                     // you will need to `await` the result
      provider.addInteraction({
        state: "Server is healthy",
        uponReceiving: 'A request for API health',
        willRespondWith: {
          status: 200,
          body: Matchers.like({
            page: 1,
            per_page: 6,
            total: 12,
            total_pages: 2,
            data: [{
              id: 1,
              email: 'george.bluth@reqres.in',
              first_name: 'George',
              last_name: 'Bluth'
            }]
          }),
        },
        withRequest: {
          method: 'GET',
          path: '/api/users',
        },
      })
    );

    
    it('get users', () => // implicit return again
      client.getUsers().then( (users: any) => {
        console.log('provider baseurl =>', provider.mockService.baseUrl)
        console.log('users is =>', users)
        if(typeof users === 'object') {
          expect(users.page).toEqual(1);
        }
    }));
    
  })
})