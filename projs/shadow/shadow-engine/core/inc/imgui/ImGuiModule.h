#pragma once

#include "core/Module.h"

#include "imgui_impl_sdl2.h"

#include "imgui.h"
#include "core/ShadowApplication.h"
#include "core/CoreModule.h"

#include "rendering/IImGuiRenderer.h"
#include "rendering/render-events.h"

namespace SH {

    class ImGuiModule : public ShadowEngine::Module {
      SHObject_Base(ImGuiModule)

        bool editorEnabled = true;

        std::weak_ptr<CoreModule> coreModule;

        std::weak_ptr<Renderer::IImGuiRenderer> renderer;

        void findRenderer();

      public:
        ImGuiModule() : Module() {
            coreModule = ShadowEngine::ShadowApplication::Get().GetModuleManager().GetById<CoreModule>("module:/core");
        }

        void PreInit() override;

        void Init() override;

        void Update(int frame) override {}

        void LateRender(SH::Renderer::LateRender &e);

        void Destroy() override {}

        void SDLEvent(SH::Events::SDLEvent &e);

    };
}