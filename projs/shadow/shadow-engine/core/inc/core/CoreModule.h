#pragma once

#include "Module.h"

#include "rendering/RenderOrchestrator.h"

class CoreModule : public ShadowEngine::Module {
  SHObject_Base(CoreModule)

    SH::Renderer::RenderOrchestrator renderOrchestrator;

  public:
    CoreModule() : Module() {}

    SH::Renderer::RenderOrchestrator &getRenderOrchestrator() { return renderOrchestrator; }

    void PreInit() override {}

    void Init() override {}

    void Update(int frame) override {}

    void Destroy() override {}
};
