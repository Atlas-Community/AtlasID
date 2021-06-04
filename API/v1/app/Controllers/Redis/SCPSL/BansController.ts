import Banlist from 'App/Models/Banlist'

export default class BansController {
    public async index(message: string) {
        try {
            const banHandler = await JSON.parse(message)

            if (typeof banHandler.dataFrom !== "string" || banHandler.dataFrom !== "server" || typeof banHandler.action !== "string" || !banHandler.action.includes("ban", "unban") ) {
                return;
            }

            console.log(typeof (banHandler.ip && banHandler.steamid))

            if (banHandler == "ban") {

                if ( (typeof banHandler.steamid !== "string" && (typeof banHandler.ip !== "string" || !/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(banHandler.ip))) || typeof banHandler.bannedBy !== "string" ||typeof banHandler.reason !== "string" || typeof banHandler.bannedAt !== "string" || typeof banHandler.bannedUntil !== "string") {
                    console.error("BadContentException in Redis message.")
                    return;
                }          

                const Ban = new Banlist()
                Ban.steamid = (banHandler.steamid) ? banHandler.steamid : null
                Ban.ip = (banHandler.ip) ? banHandler.ip : null
                Ban.bannedBy = banHandler.bannedBy
                Ban.reason = banHandler.reason
                Ban.bannedAt = banHandler.bannedAt
                Ban.bannedUntil = banHandler.bannedUntil
                await Ban.save()

                return;

            } else if (banHandler == "unban") {

                if ( typeof banHandler.steamid !== "string" && (typeof banHandler.ip !== "string" || !/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(banHandler.ip)) ) {
                    console.error("BadContentException in Redis message.")
                    return;
                }
                
                if (banHandler.steamid) {
                    const Ban = await Banlist.findBy("steamid", banHandler.steamid)
                    Ban?.delete()
                }
                if (banHandler.ip) {
                    const Ban = await Banlist.findBy("ip", banHandler.ip)
                    Ban?.delete()
                }
            } else {
                console.error("BadContentException in redis message (unknown action).")
                return;
            }

        } catch(e) {
            console.log(e)
            return;
        }
    }
}
/*
{
    "dataFrom": "server",
    "action": "unban / ban",
    "steamid": "XXX",
    "ip": "XXX",
    "bannedBy": "XXX",
    "reason": "XXX",
    "bannedAt": "XXX",
    "bannedUntil": "XXX"
}
*/