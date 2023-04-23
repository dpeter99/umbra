#include "imgui/ImGuiModule.h"
#include "core/module-manager-v2.h"
#include "core/ShadowApplication.h"

namespace SH {

    SHObject_Base_Impl(ImGuiModule)

    MODULE_ENTRY(SH::ImGuiModule, ImGuiModule)

    void ImGuiModule::Init() {
        IMGUI_CHECKVERSION();
        ImGui::CreateContext();
        ImGuiIO &io = ImGui::GetIO();
        (void) io;
        io.ConfigFlags |= ImGuiConfigFlags_DockingEnable;           // Enable Docking
        io.ConfigFlags |= ImGuiConfigFlags_ViewportsEnable;         // Enable Multi-Viewport / Platform Windows

        // Setup Dear ImGui style
        ImGui::StyleColorsDark();

        findRenderer();
        if (renderer.expired())
            return;

        renderer.lock()->InitImGui();

        auto eventBus = ShadowEngine::ShadowApplication::Get().GetEventBus();
        eventBus.subscribe(this, &ImGuiModule::SDLEvent);
        eventBus.subscribe(this, &ImGuiModule::LateRender);
    }

    void ImGuiModule::PreInit() {

    }

    void ImGuiModule::SDLEvent(SH::Events::SDLEvent &e) {
        ImGui_ImplSDL2_ProcessEvent(&e.event);
    }

    void ImGuiModule::LateRender(SH::Renderer::LateRender &e) {
        if (renderer.expired())
            return;

        auto r = renderer.lock();
        r->FrameStart();

        ImGui_ImplSDL2_NewFrame();
        ImGui::NewFrame();

        ShadowEngine::ShadowApplication::Get().GetEventBus().fire(SH::Events::OverlayRender());

        ImGui::Render();
        ImGuiIO &io = ImGui::GetIO();

        r->FrameEnd();

        // Update and Render additional Platform Windows
        if (io.ConfigFlags & ImGuiConfigFlags_ViewportsEnable) {
            ImGui::UpdatePlatformWindows();
            ImGui::RenderPlatformWindowsDefault();
        }
    }

    void ImGuiModule::findRenderer() {
        //TODO: actually check if we have a renderer and all that malarkey
        auto r = coreModule.lock()->getRenderOrchestrator().getMainRenderer().lock();
        if (!(r->getCapabilities() & SH::Renderer::RendererCapabilities::RENDERER_IMGUI)) {
            return;
        }

        renderer = dynamic_pointer_cast<SH::Renderer::IImGuiRenderer>(r);
    }

}