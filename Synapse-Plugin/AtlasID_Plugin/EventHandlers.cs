using System;
using Synapse;
using Synapse.Api;
using Synapse.Api.Events.SynapseEventArguments;
using StackExchange.Redis;

namespace AtlasID_SL
{
    public class EventHandlers
    {
        public EventHandlers()
        {
            Server.Get.Events.Player.PlayerJoinEvent += OnJoin;
        }
        
        private void OnJoin(PlayerJoinEventArgs ev)
        {
            // Let's save steamid & ip
            String steamid = ev.Player.UserId;
            String ip = ev.Player.IpAddress;

            ISubscriber sub = PluginClass.redis.GetSubscriber();
            sub.Publish("scpsl:login", "{\"dataFrom\": \"server\", \"steamid\": \"" + steamid + "\", \"ip\": \"" + ip + "\"}");
        }

    }
}