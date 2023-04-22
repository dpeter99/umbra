#include "core/ShadowApplication.h"

#include <iostream>
#include <iomanip>
#include <cstdlib>

static constexpr char *assemblyID = "assembly:/shadow-editor";

extern "C" {
void __declspec(dllexport) assembly_entry(ShadowEngine::ModuleManager &m) {
    m.AddDescriptors({
                         .id="module:/editor",
                         .name = "Editor",
                         .class_name = "EditorModule",
                         .assembly=assemblyID,
                         .dependencies={"module:/platform/sdl2"},
                     });
}
}

int main(int argc, char *argv[]) {
    std::cout << "argc == " << argc << '\n';

    for (int ndx{}; ndx != argc; ++ndx) {
        std::cout << "argv[" << ndx << "] == " << std::quoted(argv[ndx]) << '\n';
    }
    std::cout << "argv[" << argc << "] == " << static_cast<void *>(argv[argc]) << '\n';
    /*...*/

    std::cout << &assembly_entry << '\n';

    ShadowEngine::ShadowApplication app(argc, argv);
    app.GetModuleManager().AddAssembly({.id=assemblyID, .path="shadow-editor.exe", .type=ShadowEngine::AssemblyType::EXE});
    app.GetModuleManager().LoadModulesFromAssembly(assemblyID);
    app.Init();
    app.Start();

    return argc == 3 ? EXIT_SUCCESS : EXIT_FAILURE; // optional return value
}

