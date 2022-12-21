import * as Arch from "dpeter99/archivist/src/index.ts";
import * as ArchExp from "dpeter99/archivist/src/Modules/experimental/mod.ts";
import {root} from "template/root.tsx";


import {branch_current, tag_current} from "template/libs/git-helpers/index.ts";


let destPath = "/shadow-engine/";

const currentTag = await tag_current({});
if(currentTag)
    destPath = destPath + currentTag
else
    destPath = destPath + (await branch_current({}))?.replace("/","--")

const outputURL = (Deno.env.get("ARCHIVIST_URL")?? "") + destPath
const outputPath = "../../out"+destPath+"/";

const rootURL = (Deno.env.get("ARCHIVIST_URL")?? "");

export let config: Arch.Config = {
    env:"development",
    detailedOutput: true,
    template: "../../_template",
    outputPath,
    outputURL,
    rootURL,
    preProcessors: [
        Arch.Pipeline.fromModules({name:"build_template"},
            new Arch.WebpackModule("../../_template"),
            new Arch.CopyFiles("../../_template/dist/", "../../out/"),
        )
    ],
    pipelines:[
        Arch.Pipeline.fromModules({name:"posts", contentRoot:"./src/"},
            new Arch.FileReaderModule("**/*.md"),
            new Arch.DoxygenReader("/doxygen-out/**/*"),
            new Arch.ExtractMetadata(
                new Arch.FrontMatterMetadata()
            ),
            new Arch.WebUrlOutputResolver(),
            new Arch.UnifiedRenderer(),

            new ArchExp.Experimental_TSXTemplater(root),
            new Arch.OutputModule()
        )
    ]
}

Arch.run(config);
