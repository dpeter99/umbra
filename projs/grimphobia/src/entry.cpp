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
}
}