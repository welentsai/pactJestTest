import { pactWith } from 'jest-pact';
import { Matchers } from '@pact-foundation/pact';
import { api } from '../src/simpleClient';

pactWith({ consumer: 'MyConsumer', provider: 'MyProvider' }, provider => {
  let client : any;

  beforeEach(() => {
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
          body: {
            status: Matchers.like('up'),
          },
        },
        withRequest: {
          method: 'GET',
          path: '/health',
        },
      })
    );

    // You also test that the API returns the correct
    // response to the data layer.
    //
    // Although Pact will ensure that the provider
    // returned the expected object, you need to test that
    // your code receives the right object.
    //
    // This is often the same as the object that was
    // in the network response, but (as illustrated
    // here) not always.
    it('returns server health', () => // implicit return again
      client.getHealth().then( (health: any) => {
        console.log('provider baseurl =>', provider.mockService.baseUrl)
        console.log('health is =>', health)
        expect(health).toEqual('up');
      }));
  });
})