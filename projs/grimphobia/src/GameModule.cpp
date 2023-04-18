#include <GameModule.h>
#include "imgui.h"
#include "spdlog/spdlog.h"
#include "imgui_impl_vulkan.h"
#include "imgui_impl_sdl.h"
#include "core/Time.h"
#include "vlkx/render/Camera.h"
#include "vlkx/vulkan/abstraction/Buffer.h"
#include "vlkx/render/render_pass/ScreenRenderPass.h"
#include "temp/model/Builder.h"
#include "core/ModuleManager.h"
#include "EntitySystem.h"
#include "TestScene.h"

#define CATCH(x) \
    try { x } catch (std::exception& e) { spdlog::error(e.what()); exit(0); }

SHObject_Base_Impl(GameModule)

struct Transformation {
    alignas(sizeof(glm::mat4)) glm::mat4 proj_view_model;
};

std::unique_ptr<vlkx::PushConstant> trans_constant_;
std::unique_ptr<vlkxtemp::Model> cube_model_;
float aspectRatio;

void GameModule::PreInit() {}

void GameModule::Init() {
    spdlog::info("Game Module loading level..");

    auto *ensys = ShadowEngine::ModuleManager::getInstance()->GetModuleByType<ShadowEngine::Entities::EntitySystem>();
    ensys->GetWorld().AddScene(TestScene());
}

void GameModule::Recreate() {
}

void GameModule::Update(int frame) {
}

void GameModule::Render(VkCommandBuffer &commands, int frame) {
}

void GameModule::OverlayRender() {
}

void GameModule::AfterFrameEnd() {
}

void GameModule::LateRender(VkCommandBuffer &commands, int frame) {}

void GameModule::PreRender() {}

void GameModule::Destroy() {}

void GameModule::Event(SDL_Event *) {}