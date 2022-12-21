import * as Arch from 'dpeter99/archivist/src/index.ts';
import * as ArchExp from 'dpeter99/archivist/src/Modules/experimental/mod.ts';
import {root} from "template/root.tsx";

let outputPath = "../../out/shadow-engine";

export let config: Arch.Config = {
    env:"development",
    detailedOutput: false,
    template: "../../_template",
    outputPath,
    outputURL: (Deno.env.get("ARCHIVIST_URL")?? "") + "/shadow-engine",
    rootURL: (Deno.env.get("ARCHIVIST_URL")?? ""),
    preProcessors: [
        Arch.Pipeline.fromModules({name:"build_template"},
            new Arch.WebpackModule(),
            new Arch.CopyFiles("../../_template/dist/", "../../out/"),
        )
    ],
    pipelines:[
        Arch.Pipeline.fromModules({name:"posts", contentRoot:"./src"},
            new Arch.FileReaderModule("**/*.md"),
            new Arch.ExtractMetadata(
                new Arch.FrontMatterMetadata()
            ),
            new Arch.WebUrlOutputResolver(),
            new Arch.UnifiedRenderer(),

            //new Arch.TemplateModule({templatePath:"./template"}),
            new ArchExp.Experimental_TSXTemplater(root),
            new Arch.OutputModule()
        )
    ]
}

Arch.run(config);
