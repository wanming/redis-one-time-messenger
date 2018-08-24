import { RedisOneTimeMessenger } from '../src/index';
import * as Redis from 'ioredis';
import { delay } from 'bluebird';

const randomString = () => Math.random().toString(36);

test('Should get message correctly', async () => {
  const otm = new RedisOneTimeMessenger({
    subClient: new Redis(),
    pubClient: new Redis(),
  });

  const channel = randomString();
  const promise = otm.waitForResponse(channel);
  await delay(20);
  otm.publish(channel, 'tomtest');
  const data = await promise;
  expect(data).toEqual('tomtest');
});

test('Should get object message correctly', async () => {
  const otm = new RedisOneTimeMessenger({
    subClient: new Redis(),
    pubClient: new Redis(),
  });

  const channel = randomString();
  const promise = otm.waitForResponse(channel);
  await delay(20);
  otm.publish(channel, { a: 1 });
  const data = await promise;
  expect(data).toEqual({ a: 1 });
});

test('Should timeout', async () => {
  const otm = new RedisOneTimeMessenger({
    subClient: new Redis(),
    pubClient: new Redis(),
    timeout: 1000,
  });

  const channel = randomString();
  await expect(otm.waitForResponse(channel)).rejects.toThrow(
    /RedisOneTimeMessengerTimeoutError/
  );
});
