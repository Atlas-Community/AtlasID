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
            if (typeof player.steamid64 !== "string" || typeof player.ip !== "string" || !/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(player.ip)) {
                console.error("BadContentException in Redis message.")
                return;
            }

            await User.updateOrCreate({ steamid64: player.steamid64 }, { ip: player.ip })

            const user = await User.findBy('steamid64', player.steamid64); 
            return {
                from: "api",
                steamid64: player.steamid64,
                banned: await (await Banlist.findBy('steamid64', player.steamid64) || await Banlist.findBy('ip', player.ip)) ? true : false,
                rank: (user?.rank) ? user.rank : false
             };

        } catch(e) {
            return;
            //console.log(e)
        }
    }
}
/*
{
    "dataFrom": "server",
    "steamid64": "XXX",
    "ip": "XXX"
}

{
    "from": "api",
    "steamid64": "XXX",
    "banned": true / false,
    "rank"?: "XXX"
}
*/