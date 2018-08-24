[![Build Status](https://travis-ci.org/{{github-user-name}}/{{github-app-name}}.svg?branch=master)](https://travis-ci.org/{{github-user-name}}/{{github-app-name}}.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/{{github-user-name}}/{{github-app-name}}/badge.svg?branch=master)](https://coveralls.io/github/{{github-user-name}}/{{github-app-name}}?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# one time message base on redis

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
// response is 'tom'
```

In your another process:
```js
const message = new RedisOneTimeMessenger({ redisConfig })
message.publish('my-unique-channel', 'tom')
```



## Setting travis and coveralls badges
1. Sign in to [travis](https://travis-ci.org/) and activate the build for your project.
2. Sign in to [coveralls](https://coveralls.io/) and activate the build for your project.
3. Replace {{github-user-name}}/{{github-app-name}} with your repo details like: "ospatil/generator-node-typescript".
