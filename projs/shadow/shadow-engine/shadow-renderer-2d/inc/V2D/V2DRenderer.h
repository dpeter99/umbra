#pragma once

#include <VK2D/VK2D.h>

#include "rendering/2D/IRenderer2D.h"
#include "rendering/IImGuiRenderer.h"
#include "core/Module.h"

#include "core/ShadowApplication.h"
#include "core/module-manager-v2.h"
#include "core/SDL2Module.h"

#include "V2D/V2DTexture2D.h"
#include "glm/glm.hpp"

namespace SH::Renderer::V2D {

    class V2DRenderer
        : public ShadowEngine::Module, public SH::Renderer::R2D::IRenderer2D, public Renderer::IImGuiRenderer {
      SHObject_Base(V2DRenderer)
        ShadowEngine::ModuleManager &manager;
        std::weak_ptr<ShadowEngine::SDL2Module> platform;

        vec4 clearColour;

        bool renderingToTexture = false;
        V2DTexture2D *render_target = nullptr;
        glm::ivec2 render_target_size;
      public:
        V2DRenderer() : manager(ShadowEngine::ShadowApplication::Get().GetModuleManager()) {
        }

        void setCameraPosition(float x, float y) override {};

        void setCameraZoom(float zoom) override {};

        void drawSprite(float x, float y, float width, float height) override;

        [[nodiscard]] SH::Renderer::RendererCapabilities getCapabilities() const override;

        SH::Renderer::R2D::ITexture2D *getRenderTarget() const override;

        void RenderSceneToTexture() override;

        void BeginRenderPass() override;

        void setRenderExtent(int width, int height) override;

        void FrameStart() override;

        void FrameEnd() override;

        void InitImGui() override;

      private:
        void RecreateRenderTargets();

      public:

        void PreInit() override {}

        void Init() override;

        void Update(int frame) override {}

        void Recreate() override {}

        void PreRender() override {}

        void Render(VkCommandBuffer &commands, int frame) override;

        void LateRender(VkCommandBuffer *commands, int frame) override {}

        void OverlayRender() override {}

        void AfterFrameEnd() override {}

        void Destroy() override {}

        void Event(SDL_Event *e) override {}

    };
}