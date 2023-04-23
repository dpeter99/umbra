#include "V2D/V2DRenderer.h"
#include "V2D/V2DTexture2D.h"

#include "imgui_impl_vulkan.h"
#include "rendering/render-events.h"

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

        VK2DRendererConfig config = {VK2D_MSAA_1X, VK2D_SCREEN_MODE_TRIPLE_BUFFER, VK2D_FILTER_TYPE_NEAREST};
        vk2dRendererInit(p->window->sdlWindowPtr, config, NULL);

        vk2dColourHex(clearColour, "#000000");

        this->setRenderExtent(p->window->Width, p->window->Height);

        cam = {VK2D_CAMERA_TYPE_DEFAULT, 0, 0, p->window->Width * 1.0f, p->window->Height * 1.0f, 1, 0};
        windowCam = vk2dCameraCreate(cam);
    }

    SH::Renderer::RendererCapabilities V2DRenderer::getCapabilities() const {
        return SH::Renderer::RendererCapabilities::RENDERER_2D | SH::Renderer::RendererCapabilities::RENDERER_IMGUI;
    }

    SH::Renderer::R2D::ITexture2D *V2DRenderer::getRenderTarget() const {
        return this->render_target;
    }

    void V2DRenderer::BeginRenderPass() {
        vk2dRendererStartFrame(clearColour);

        // Draw your things
        // Adjust for window size
        cam.w = (float) render_target_size.x;
        cam.h = (float) render_target_size.y;
        vk2dCameraUpdate(windowCam, cam);
        vk2dRendererLockCameras(windowCam);

        if (renderingToTexture) {
            vk2dRendererSetTarget(render_target->GetTexture());
        }

        vk2dRendererDrawRectangle(0, 0, 100, 100, 0, 0, 0);

        //vec4 clear = {1, 0.0, 0.2, 1.0};
        vk2dRendererSetBlendMode(VK2D_BLEND_MODE_NONE);
        vk2dRendererSetTarget(VK2D_TARGET_SCREEN);

        ShadowEngine::ShadowApplication::Get().GetEventBus().fire(SH::Renderer::LateRender());

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
        auto a = vk2dVulkanGetDrawBuffer();
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
        vkCreateDescriptorPool(vk2dVulkanGetDevice(), &pool_info, VK_NULL_HANDLE, &imGuiPool);

        // Setup Platform/Renderer backends
        ImGui_ImplSDL2_InitForVulkan(p->window->sdlWindowPtr);
        ImGui_ImplVulkan_InitInfo init_info = {0};
        init_info.Instance = vk2dR->vk;
        init_info.PhysicalDevice = vk2dVulkanGetPhysicalDevice();
        init_info.Device = vk2dVulkanGetDevice();
        init_info.QueueFamily = vk2dVulkanGetQueueFamily();
        init_info.Queue = vk2dVulkanGetQueue();
        init_info.PipelineCache = VK_NULL_HANDLE;
        init_info.DescriptorPool = imGuiPool;
        //init_info.Subpass = 1;
        init_info.MinImageCount = vk2dR->swapchainImageCount;
        init_info.ImageCount = vk2dVulkanGetSwapchainImageCount();
        init_info.MSAASamples = VK_SAMPLE_COUNT_1_BIT; // (VkSampleCountFlagBits) (vk2dR->config.msaa);
        init_info.Allocator = VK_NULL_HANDLE;
        init_info.CheckVkResultFn = nullptr;

        ImGui_ImplVulkan_Init(&init_info, vk2dR->renderPass);

        auto cmdBuffer = vk2dVulkanGetSingleUseBuffer();
        ImGui_ImplVulkan_CreateFontsTexture(cmdBuffer);
        vk2dVulkanSubmitSingleUseBuffer(cmdBuffer);

    }
}