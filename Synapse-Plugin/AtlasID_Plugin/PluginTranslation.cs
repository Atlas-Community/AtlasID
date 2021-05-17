using Synapse.Translation;
using System.ComponentModel;

namespace AtlasID_SL
{
    public class PluginTranslation : IPluginTranslation
    {
        public string BanMessage { get; set; } = "Your are banned.\nReason:";
    }
}
