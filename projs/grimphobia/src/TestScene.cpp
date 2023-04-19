#include "../inc/TestScene.h"
#include "entities/Player.h"
#include "entities/NullActor.h"
#include "entities/Position.h"
#include "entities/MeshComponent.h"
#include "entities/Light.h"
#include "entities/Sprite.h"

SHObject_Base_Impl(TestScene)

void TestScene::Build() {

    //Actor with a single sprite component
    auto sprite_actor = this->Add<ShadowEngine::Entities::Builtin::NullActor>({});
    sprite_actor->SetName("Sprite Actor");
    sprite_actor->Add<ShadowEngine::Entities::Builtin::Position>({0, 0, 0});
    auto sprite = sprite_actor->Add<Sprite>({});

}