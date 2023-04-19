#pragma once

#include <VK2D/VK2D.h>

#include "rendering/2D/IRenderer2D.h"
#include "core/Module.h"

#include "core/ShadowApplication.h"
#include "core/module-manager-v2.h"
#include "core/SDL2Module.h"

namespace SH::Renderer::V2D {

    class V2DRenderer : public ShadowEngine::Module, public SH::Renderer::R2D::IRenderer2D {
      SHObject_Base(V2DRenderer)

        vec4 clearColour;
      public:
        V2DRenderer();

        void setCameraPosition(float x, float y) override {};

        void setCameraZoom(float zoom) override {};

        void drawSprite(float x,
                        float y,
                        float width,
                        float height) override;

        [[nodiscard]] SH::Renderer::RendererCapabilities getCapabilities() const override;

        SH::Renderer::R2D::ITexture2D *getRenderTarget() const override;

        void BeginRenderPass() override;

        void PreInit() override {}

        void Init() override;

        void Update(int frame) override {}

        void Recreate() override {}

        void PreRender() override {}

        void Render(VkCommandBuffer &commands, int frame) override;

        void LateRender(VkCommandBuffer &commands, int frame) override {}

        void OverlayRender() override {}

        void AfterFrameEnd() override {}

        void Destroy() override {}

        void Event(SDL_Event *e) override {}
    };
}