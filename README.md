[![Build Status](https://travis-ci.org/wanming/redis-one-time-messenger.svg?branch=master)](https://travis-ci.org/wanming/redis-one-time-messenger.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/wanming/redis-one-time-messenger/badge.svg?branch=master)](https://coveralls.io/github/wanming/redis-one-time-messenger?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# redis-one-time-messenger

redis-one-time-messenger makes you can receive message through redis in a distributed environment.

## Install
```
npm i redis-one-time-messenger
```

## Usage

In your one process:
```js
const { RedisOneTimeMessenger } = require('redis-one-time-messenger')
// redisConfig is config object to ioredis
const messenger = new RedisOneTimeMessenger({ redisConfig })
const response = await messenger.waitForResponse('my-unique-channal')
// 'tom'
```

In your another process:
```js
const { RedisOneTimeMessenger } = require('redis-one-time-messenger')
const messenger = new RedisOneTimeMessenger({ redisConfig })
messenger.publish('my-unique-channel', 'tom')
```

# License
MIT
