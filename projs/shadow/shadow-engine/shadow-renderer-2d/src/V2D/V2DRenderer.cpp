#include "V2D/V2DRenderer.h"
#include "V2D/V2DTexture2D.h"

#include "imgui_impl_vulkan.h"

#include <VK2D/Opaque.h>
#include <VK2D/LogicalDevice.h>
#include <VK2D/VulkanInterface.h>

namespace SH::Renderer::V2D {

    SHObject_Base_Impl(V2DRenderer)

    MODULE_ENTRY(SH::Renderer::V2D::V2DRenderer, V2DRenderer)

    void V2DRenderer::drawSprite(float x, float y, float width, float height) {

    }

    void V2DRenderer::Init() {
        platform = manager.GetById<ShadowEngine::SDL2Module>("module:/platform/sdl2");
        if (platform.expired()) {
            manager.DeactivateModule(this);
            return;
        }
        auto p = platform.lock();

        VK2DRendererConfig config = {VK2D_MSAA_32X, VK2D_SCREEN_MODE_TRIPLE_BUFFER, VK2D_FILTER_TYPE_NEAREST};
        vk2dRendererInit(p->window->sdlWindowPtr, config, NULL);

        vk2dColourHex(clearColour, "#ffffff");
    }

    SH::Renderer::RendererCapabilities V2DRenderer::getCapabilities() const {
        return SH::Renderer::RendererCapabilities::RENDERER_2D | SH::Renderer::RendererCapabilities::RENDERER_IMGUI;
    }

    SH::Renderer::R2D::ITexture2D *V2DRenderer::getRenderTarget() const {
        return nullptr;// this->render_target;
    }

    void V2DRenderer::Render(VkCommandBuffer &commands, int frame) {

    }

    void V2DRenderer::BeginRenderPass() {
        vk2dRendererStartFrame(clearColour);

        if (renderingToTexture) {
            //vk2dRendererSetTarget(render_target->getTexture());
        }

        // Draw your things
        vk2dRendererDrawRectangle(0, 0, 100, 100, 0, 0, 0);

        if (renderingToTexture) {
            //vk2dRendererSetTarget(nullptr);
        }

        manager.LateRender(nullptr, 0);

        vk2dRendererEndFrame();
    }

    void V2DRenderer::RecreateRenderTargets() {
        if (render_target != nullptr) {
            delete render_target;
        }
        render_target = new V2DTexture2D(render_target_size.x, render_target_size.y);
    }

    void V2DRenderer::RenderSceneToTexture() {
        renderingToTexture = true;
        RecreateRenderTargets();
    }

    void V2DRenderer::setRenderExtent(int width, int height) {
        render_target_size = glm::ivec2(width, height);
        RecreateRenderTargets();
    }

    void V2DRenderer::FrameStart() {
        ImGui_ImplVulkan_NewFrame();
    }

    void V2DRenderer::FrameEnd() {
        auto a = *vk2dRendererGetPointer()->commandBuffer;
        ImGui_ImplVulkan_RenderDrawData(ImGui::GetDrawData(), a);
    }

    void V2DRenderer::InitImGui() {
        if (platform.expired())
            return;
        auto p = platform.lock();

        auto vk2dR = vk2dRendererGetPointer();

        VkDescriptorPool imGuiPool;
        VkDescriptorPoolSize pool_sizes[] =
            {
                {VK_DESCRIPTOR_TYPE_SAMPLER, 1000},
                {VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER, 1000},
                {VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE, 1000},
                {VK_DESCRIPTOR_TYPE_STORAGE_IMAGE, 1000},
                {VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER, 1000},
                {VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER, 1000},
                {VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER, 1000},
                {VK_DESCRIPTOR_TYPE_STORAGE_BUFFER, 1000},
                {VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC, 1000},
                {VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC, 1000},
                {VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT, 1000}
            };

        VkDescriptorPoolCreateInfo pool_info = {};
        pool_info.sType = VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_CREATE_INFO;
        pool_info.flags = VK_DESCRIPTOR_POOL_CREATE_FREE_DESCRIPTOR_SET_BIT;
        pool_info.maxSets = 1000 * IM_ARRAYSIZE(pool_sizes);
        pool_info.poolSizeCount = (uint32_t) IM_ARRAYSIZE(pool_sizes);
        pool_info.pPoolSizes = pool_sizes;
        vkCreateDescriptorPool(vk2dR->ld->dev, &pool_info, VK_NULL_HANDLE, &imGuiPool);

        // Setup Platform/Renderer backends
        ImGui_ImplSDL2_InitForVulkan(p->window->sdlWindowPtr);
        ImGui_ImplVulkan_InitInfo init_info = {};
        init_info.Instance = vk2dR->vk;
        init_info.PhysicalDevice = vk2dR->pd->dev;
        init_info.Device = vk2dR->ld->dev;
        init_info.QueueFamily = vk2dR->pd->QueueFamily.graphicsFamily;
        init_info.Queue = vk2dR->ld->queue;
        init_info.PipelineCache = VK_NULL_HANDLE;
        init_info.DescriptorPool = imGuiPool;
        //init_info.Subpass = 0;
        init_info.MinImageCount = vk2dR->swapchainImageCount;
        init_info.ImageCount = vk2dR->swapchainImageCount;
        init_info.MSAASamples = VK_SAMPLE_COUNT_1_BIT;
        init_info.Allocator = VK_NULL_HANDLE;
        init_info.CheckVkResultFn = nullptr;

        ImGui_ImplVulkan_Init(&init_info, vk2dR->renderPass);

        auto cmdBuffer = vk2dLogicalDeviceGetSingleUseBuffer(vk2dR->ld);
        ImGui_ImplVulkan_CreateFontsTexture(cmdBuffer);
        vk2dLogicalDeviceSubmitSingleBuffer(vk2dR->ld, cmdBuffer);

    }
}