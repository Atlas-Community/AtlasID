/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Redis from '@ioc:Adonis/Addons/Redis'
import LoginController from 'App/Controllers/Redis/SCPSL/LoginController'

Redis.subscribe('scpsl:login', async (message: string) => {
    const response = await new LoginController().index(message)
    if (response !== undefined) {
        Redis.publish('scpsl:login', JSON.stringify(response) );
    }
})

// publish scpsl:login "test"
// publish scpsl:login '{ "dataFrom": "server" }'
// publish scpsl:login '{ "dataFrom": "server", "steamid64": "123456", "ip": "15.15.15.15" }'