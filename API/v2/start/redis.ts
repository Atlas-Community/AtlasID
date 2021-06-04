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
        console.log(response)
        Redis.publish('scpsl:login', JSON.stringify(response));
    }
})

// publish scpsl:login "test"
// publish scpsl:login '{ "dataFrom": "server" }'
// publish scpsl:login '{ "dataFrom": "server", "steamid": "TESTSTEAMID2", "ip": "1.1.1.1" }'

Redis.subscribe('scpsl:ban', async (message: string) => {
    await new BansController().index(message)
})

// publish scpsl:ban '{ "dataFrom": "server", "action": "ban", "steamid": "TESTSTEAMID", "ip": "1.1.1.1", "bannedBy": "Antt0n", "reason": "TEST", "bannedAt": "2021-06-04 17:00:00", "bannedUntil": "2021-06-04 20:00:00" }'
// publish scpsl:ban '{ "dataFrom": "server", "action": "unban", "steamid": "TESTSTEAMID", "ip": "1.1.1.1" }'