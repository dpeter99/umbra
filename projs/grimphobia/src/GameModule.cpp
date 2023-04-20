#include <GameModule.h>
#include "spdlog/spdlog.h"
#include "vlkx/render/Camera.h"
#include "vlkx/vulkan/abstraction/Buffer.h"
#include "core/module-manager-v2.h"
#include "core/ShadowApplication.h"
#include "TestScene.h"
#include "EntitySystem.h"
#include "entities/Sprite.h"
#include "rendering/2D/IRenderer2D.h"
#include "core/CoreModule.h"

#define CATCH(x) \
    try { x } catch (std::exception& e) { spdlog::error(e.what()); exit(0); }

SHObject_Base_Impl(GameModule)

MODULE_ENTRY(GameModule, GameModule)

struct Transformation {
    alignas(sizeof(glm::mat4)) glm::mat4 proj_view_model;
};

void GameModule::PreInit() {
    spdlog::info("{0} PreInit", this->GetName());

    ShadowEngine::ModuleManager &manager = ShadowEngine::ShadowApplication::Get().GetModuleManager();
    const std::shared_ptr<CoreModule> &core = manager.GetById<CoreModule>("module:/core").lock();
    auto v2d_renderer = manager.GetById<SH::Renderer::R2D::IRenderer2D>("module:/V2DRenderer");

    core->getRenderOrchestrator().addRenderer("main", v2d_renderer);
    core->getRenderOrchestrator().setMainRenderer("main");
}

void GameModule::Init() {
    spdlog::info("{0} Init", this->GetName());
    spdlog::info("Game Module loading level..");

    ShadowEngine::ModuleManager &manager = ShadowEngine::ShadowApplication::Get().GetModuleManager();
    auto w_ensys = manager.GetById<ShadowEngine::Entities::EntitySystem>("module:/entity-system");
    if (w_ensys.expired())
        return;
    auto ensys = w_ensys.lock();
    ensys->GetWorld().AddScene(TestScene());

    //Basic system to draw sprites using the 2d renderer module
    auto w_renderer = manager.GetById<SH::Renderer::R2D::IRenderer2D>("module:/V2DRenderer");

    ensys->GetWorld().system<Sprite>()->forEach([w_renderer](Sprite &sprite) {
        auto renderer = w_renderer.lock();
        renderer->drawSprite(0, 0, 10, 10);
    });

}

void GameModule::Recreate() {}

void GameModule::Update(int frame) {}

void GameModule::Render(VkCommandBuffer &commands, int frame) {}

void GameModule::OverlayRender() {}

void GameModule::AfterFrameEnd() {}

void GameModule::LateRender(VkCommandBuffer *commands, int frame) {}

void GameModule::PreRender() {}

void GameModule::Destroy() {}

void GameModule::Event(SDL_Event *) {}

