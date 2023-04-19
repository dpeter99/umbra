#pragma once

#include "core/Module.h"

#include "imgui_impl_sdl.h"

namespace SH {

    class ImGuiModule : public ShadowEngine::Module {
      SHObject_Base(ImGuiModule)

      public:
        ImGuiModule() : Module() {}

        void PreInit() override;

        void Init() override {}

        void Update(int frame) override {}

        void Recreate() override {}

        void PreRender() override {}

        void Render(VkCommandBuffer &commands, int frame) override {}

        void LateRender(VkCommandBuffer &commands, int frame) override {}

        void OverlayRender() override {}

        void AfterFrameEnd() override {}

        void Destroy() override {}

        void Event(SDL_Event *e) override;

        std::string GetName() override {}
    };
}