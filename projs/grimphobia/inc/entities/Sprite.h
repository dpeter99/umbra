#pragma once

#include "graph/graph.h"

class Sprite : public ShadowEngine::Entities::Component {
  SHObject_Base(Sprite);
  public:
    int size = 10;
};
