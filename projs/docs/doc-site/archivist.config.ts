import * as Arch from "file://C:/Users/dpete/Documents/programing/_Projects/archivist/archivist/src/index.ts";

class ExperimentalTSXTemplater extends Arch.SimpleModule {
    
}

export let config: Arch.Config = {
    env:"production",
    detailedOutput: false,
    template: "./template",
    outputPath: "./out",
    preProcessors: [
        Arch.Pipeline.fromModules({name:"build_template"},
            new Arch.StaticTemplateFilesModule(),
        )
    ],
    pipelines:[
        Arch.Pipeline.fromModules({name:"posts"},
            new Arch.DoxygenReader("doxygen-out/**/*"),
            new Arch.ExtractMetadata(
                new Arch.FrontMatterMetadata()
            ),
            new Arch.WebUrlOutputResolver(),
            new Arch.UnifiedRenderer(),

            new Arch.TemplateModule({templatePath:"./template"}),
            new Arch.OutputModule("./out/")
        )
    ]
}

Arch.run(config);
