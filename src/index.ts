import { Redis } from 'ioredis';
import * as Bluebird from 'bluebird';
import * as EventEmitter from 'events';
import isObject = require('lodash.isobject');

export class RedisOneTimeMessage extends EventEmitter {
  private subClient: Redis;
  private pubClient: Redis;
  private timeout: number = 30000;
  private pool: { [x: string]: (...p: any[]) => any } = {};

  constructor(options: {
    subClient: Redis;
    pubClient: Redis;
    timeout?: number;
  }) {
    super();

    this.subClient = options.subClient;
    this.pubClient = options.pubClient;

    if (options.timeout) {
      this.timeout = options.timeout;
    }

    this.init();
  }

  public async waitForResponse(channel: string): Promise<any> {
    await this.subClient.subscribe(channel);

    const promise = new Bluebird(resolve => {
      this.pool[channel] = resolve;
    });

    let error;
    try {
      return await promise.timeout(this.timeout);
    } catch (e) {
      error = new Error('RedisOneTimeMessageTimeoutError');
    }

    delete this.pool[channel];
    await this.subClient.unsubscribe(channel);

    if (error) {
      throw error;
    }
  }

  public async publish(channel: string, data: any) {
    const count = await this.pubClient.publish(
      channel,
      isObject(data) ? JSON.stringify(data) : data
    );
    if (count < 1) {
      this.emit('warning', { type: 'noListener', channel });
    }
  }

  private init() {
    this.subClient.on('message', (channel: string, message: any) => {
      if (this.pool[channel]) {
        this.pool[channel](tryJsonParse(message));
      }
    });
  }
}

function tryJsonParse(data: any) {
  if (typeof data !== 'string') {
    return data;
  }
  const firstLetter = data[0];
  if (firstLetter === '{' || firstLetter === '[') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  return data;
}
