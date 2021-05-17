using Synapse.Config;
using System.Collections.Generic;
using System.ComponentModel;
using UnityEngine;

namespace AtlasID_SL
{
    public class PluginConfig : AbstractConfigSection
    {
        [Description("Settings related to your Redis server.")]
        public string hostname = "localhost";
        public int port = 6379;
        public string password = null;
    }
}