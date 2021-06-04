using System;
using StackExchange.Redis;
using Synapse.Api;
using AtlasID_SL.JSON;
using Newtonsoft.Json;
using MEC;

namespace AtlasID_SL
{
    public class RedisHandlers
    {
        public RedisHandlers()
        {
            LoginHandler();
        }

        private ISubscriber LoginHandler()
        {
            ISubscriber sub = PluginClass.redis.GetSubscriber();
            sub.Subscribe("scpsl:login").OnMessage(channelMessage => {
                Logger.Get.Send(channelMessage.Message, ConsoleColor.Red);
                // Deserialization and check dataFrom
                Login APIResponse = JsonConvert.DeserializeObject<Login>(channelMessage.Message.ToString());
                if (APIResponse.dataFrom != "api")
                {
                    return;
                }

                Timing.CallDelayed(0.6f, () =>
                {

                    // Check if the player is online and get is instance
                    Player ev = SynapseController.Server.GetPlayer(APIResponse.steamid);
                    if (!ev)
                    {
                        Logger.Get.Send("AtlasID: player offline.", ConsoleColor.Red);
                        return;
                    }

                    // Kick him if he is banned
                    if (!String.IsNullOrEmpty(APIResponse.banned))
                    {
                        ev.Kick(PluginClass.Translation.ActiveTranslation.BanMessage + " " + APIResponse.banned + ".");
                    }

                    // Add his rank

                    if (!String.IsNullOrEmpty(APIResponse.rank))
                    {
                        ev.SynapseGroup = SynapseController.Server.PermissionHandler.GetServerGroup(APIResponse.rank);
                    }

                });

            });

            return sub;
        }
    }
}
