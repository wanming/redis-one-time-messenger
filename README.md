[![Build Status](https://travis-ci.org/wanming/redis-one-time-messenger.svg?branch=master)](https://travis-ci.org/wanming/redis-one-time-messenger.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/wanming/redis-one-time-messenger/badge.svg?branch=master)](https://coveralls.io/github/wanming/redis-one-time-messenger?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# one time messenger based on redis

redis-one-time-message makes you can receive message through redis in a disributed environment.

## Install
```
npm i redis-one-time-message
```

## Usage

In your one process:
```js
const message = new RedisOneTimeMessenger({ redisConfig })
const response = await message.waitForResponse('my-unique-channal')
// 'tom'
```

In your another process:
```js
const message = new RedisOneTimeMessenger({ redisConfig })
message.publish('my-unique-channel', 'tom')
```

# License
MIT