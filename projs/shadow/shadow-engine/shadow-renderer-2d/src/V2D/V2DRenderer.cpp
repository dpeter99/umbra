#include "V2D/V2DRenderer.h"

namespace SH::Renderer::V2D {

    SHObject_Base_Impl(V2DRenderer)

    MODULE_ENTRY(SH::Renderer::V2D::V2DRenderer, V2DRenderer)

    V2DRenderer::V2DRenderer() {

    }

    void V2DRenderer::drawSprite(float x, float y, float width, float height) {

    }

    void V2DRenderer::Init() {
        ShadowEngine::ModuleManager &manager = ShadowEngine::ShadowApplication::Get().GetModuleManager();

        auto w_platform = manager.GetById<ShadowEngine::SDL2Module>("module:/platform/sdl2");
        if (w_platform.expired()) {
            manager.DeactivateModule(this);
            return;
        }
        auto platform = w_platform.lock();

        VK2DRendererConfig config = {VK2D_MSAA_32X, VK2D_SCREEN_MODE_TRIPLE_BUFFER, VK2D_FILTER_TYPE_NEAREST};
        vk2dRendererInit(platform->window->sdlWindowPtr, config, NULL);

        vk2dColourHex(clearColour, "#59d9d7");
    }

    SH::Renderer::RendererCapabilities V2DRenderer::getCapabilities() const {
        return SH::Renderer::RENDERER_2D;
    }

    SH::Renderer::R2D::ITexture2D *V2DRenderer::getRenderTarget() const {
        return nullptr;// this->render_target;
    }

    void V2DRenderer::Render(VkCommandBuffer &commands, int frame) {

    }

    void V2DRenderer::BeginRenderPass() {
        vk2dRendererStartFrame(clearColour);

        // Draw your things
        vk2dRendererDrawRectangle(0, 0, 100, 100, 0, 0, 0);

        vk2dRendererEndFrame();
    }
}