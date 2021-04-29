import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

export default class SlotsController {
    public async index({response} : HttpContextContract) {
        const ranks =  JSON.parse(Env.get('SCPSL_RANK_RS'))
        var players = []
        
        for (var rank in ranks) {
            const users = await User.findBy('rank', rank)

            if (users) {
                for (var user in users) {
                    players.push(user.steamid64)
                }
            }
        }
        
        return players.join("\n")
    }
}
