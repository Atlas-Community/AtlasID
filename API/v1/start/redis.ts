/*
|--------------------------------------------------------------------------
| Redis routes
|--------------------------------------------------------------------------
|
| Here are all routes based on pub/sub system of redis.
|
*/
import Redis from '@ioc:Adonis/Addons/Redis'
import LoginController from 'App/Controllers/Redis/SCPSL/LoginController'
import BansController from 'App/Controllers/Redis/SCPSL/BansController'

Redis.subscribe('scpsl:login', async (message: string) => {
    const response = await new LoginController().index(message)
    if (response !== undefined) {
        Redis.publish('scpsl:login', JSON.stringify(response) );
    }
})

// publish scpsl:login "test"
// publish scpsl:login '{ "dataFrom": "server" }'
// publish scpsl:login '{ "dataFrom": "server", "steamid": "123456", "ip": "15.15.15.15" }'

Redis.subscribe('scpsl:ban', async (message: string) => {
    await new BansController().index(message)
})