#pragma once

#include <SDL_events.h>
#include "core/Module.h"

class GameModule : public ShadowEngine::Module {

  SHObject_Base(GameModule)

    std::string tets = "asdasd";
  public:
    void PreInit() override;

    void Init() override;
};