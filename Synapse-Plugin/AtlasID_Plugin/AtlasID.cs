using Synapse.Api;
using System;
using Synapse.Api.Plugin;
using Synapse.Translation;
using StackExchange.Redis;

namespace AtlasID_SL
{
    [PluginInformation(
        Name = "AtlasID-SL",
        Author = "Antt0n / Atlas",
        Description = "SCP:SL interface for AtlasID.",
        LoadPriority = 0,
        SynapseMajor = 2,
        SynapseMinor = 6,
        SynapsePatch = 1,
        Version = "v.1.0.0"
        )]
    public class PluginClass : AbstractPlugin
    {
        [Config(section = "AtlasID-SL")]
        public static PluginConfig Config { get; set; }

        [SynapseTranslation]
        public static new SynapseTranslation<PluginTranslation> Translation { get; set; }

        public static ConnectionMultiplexer redis;
        public override void Load()
        {
            try
            {
                redis = ConnectionMultiplexer.Connect(Config.hostname + ":" + Config.port + ",password=" + Config.password + ",abortConnect=false ");
                new EventHandlers();
                new RedisHandlers();

                Translation.AddTranslation(new PluginTranslation());

                Logger.Get.Send("AtlasID: Interface operational and connected to the Redis server.", ConsoleColor.Magenta);
            }
            catch (Exception e)
            {
                Logger.Get.Send("AtlasID: Error during startup: "+ e, ConsoleColor.Red);
            }            
        }

        public override void ReloadConfigs()
        {
        }
    }
}