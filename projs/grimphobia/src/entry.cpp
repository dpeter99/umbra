#include "core/ShadowApplication.h"

extern "C" {
void assembly_entry(ShadowEngine::ModuleManager &m) {
    m.AddDescriptors({
                         .id="module:/game",
                         .name = "Grimphobia",
                         .class_name = "GameModule",
                         .assembly="assembly:/grimphobia",
                         .dependencies={
                             "module:/platform/sdl2",
                             "module:/entity-system",
                             "module:/V2DRenderer"},
                     });

    m.AddDescriptors({
                         .id="module:/V2DRenderer",
                         .name = "Vulkan 2d Renderer",
                         .class_name = "V2DRenderer",
                         .assembly="assembly:/core",
                         .dependencies={"module:/platform/sdl2"},
                     });
}
}