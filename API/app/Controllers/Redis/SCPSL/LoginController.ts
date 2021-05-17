import Redis from '@ioc:Adonis/Addons/Redis'
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

            // Cache ban
            var banReason = await Redis.get("atlasid.ban." + player.steamid);
            if (!banReason) {
                const ban = await (await Banlist.findBy('steamid', player.steamid) || await Banlist.findBy('ip', player.ip));
                if (ban) {
                    banReason = ban.reason
                    Redis.set("atlasid.ban." + player.steamid, banReason, "EX", 60)
                }                
            }
            
            return {
                dataFrom: "api",
                steamid: player.steamid,
                banned: await banReason ? banReason : null,
                rank: (user?.rank) ? user.rank : null
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
    "dataFrom": "api",
    "steamid": "XXX",
    "banned": true / false,
    "rank"?: "XXX"
}
*/