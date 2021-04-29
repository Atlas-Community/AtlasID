import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

export default class SlotsController {
    public async index() {
        const ranks =  JSON.parse(Env.get('SCPSL_RANK_RS'))
        var players = []

        for (var idr in ranks) {

            const users = await User
                .query()
                .where('rank', ranks[idr])
          
            if (users) {
                for (var idu in users) {
                    players.push(users[idu].steamid)
                }
            }
        }
        return players.join("\n")
    }
}
