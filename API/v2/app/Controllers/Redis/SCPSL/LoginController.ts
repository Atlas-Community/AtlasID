import Redis from '@ioc:Adonis/Addons/Redis'
import User from 'App/Models/User'
import Ban from 'App/Models/Ban'

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
                
                const moment = new Date();
                const date = new Date(moment.getTime() - (moment.getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace('T', ' '); 
                //const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

                const ban = await Ban.query().where('steamid', player.steamid).where('bannedAt', '<', date) && await Ban.query().where('ip', player.ip).where('bannedAt', '<', date) 

                if (ban.length > 0) {
                    banReason = ban[0].reason
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