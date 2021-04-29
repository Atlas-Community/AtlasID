import User from 'App/Models/User'
import Banlist from 'App/Models/Banlist'

export default class LoginController {
    public async index(message: string) {
        // On vérifie que la requête est bien un json valide
        try {
            const player = await JSON.parse(message)

            if (typeof player.dataFrom !== "string" || player.dataFrom !== "server") {
                return;
            }
            if (typeof player.steamid !== "string" || typeof player.ip !== "string" || !/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(player.ip)) {
                console.error("BadContentException in Redis message.")
                return;
            }

            const user = await User.updateOrCreate({ steamid: player.steamid }, { ip: player.ip })

            return {
                from: "api",
                steamid: player.steamid,
                banned: await (await Banlist.findBy('steamid', player.steamid) || await Banlist.findBy('ip', player.ip)) ? true : false,
                rank: (user?.rank) ? user.rank : false
             };

        } catch(e) {
            console.log(e)
            return;
        }
    }
}
/*
{
    "dataFrom": "server",
    "steamid": "XXX",
    "ip": "XXX"
}

{
    "from": "api",
    "steamid": "XXX",
    "banned": true / false,
    "rank"?: "XXX"
}
*/