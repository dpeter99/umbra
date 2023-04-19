#include "imgui/ImGuiModule.h"
#include "core/module-manager-v2.h"

SHObject_Base_Impl(SH::ImGuiModule)

MODULE_ENTRY(SH::ImGuiModule, ImGuiModule)

void SH::ImGuiModule::PreInit() {

}

void SH::ImGuiModule::Event(SDL_Event *e) {
    ImGui_ImplSDL2_ProcessEvent(e);
}


