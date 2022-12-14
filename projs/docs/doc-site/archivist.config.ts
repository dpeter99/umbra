import * as Arch from "dpeter99/archivist/src/index.ts";
import {root} from "./template/root.tsx";
import {TSXHelper} from "./template/TSXHelper.ts";


class ExperimentalTSXTemplater extends Arch.SimpleModule {

    async processDoc(doc: Arch.Content): Promise<any> {
        await super.processDoc(doc);
        let helper = new TSXHelper(doc.path,this);

        let page_root = root(doc, helper);

        doc.content = await page_root.toString();
    }
}

export let config: Arch.Config = {
    env:"development",
    detailedOutput: false,
    template: "./template",
    outputPath: "./out",
    outputURL: Deno.env.get("ARCHIVIST_URL")?? "",
    preProcessors: [
        Arch.Pipeline.fromModules({name:"build_template"},
            new Arch.WebpackModule("./template"),
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

            //new Arch.TemplateModule({templatePath:"./template"}),
            new ExperimentalTSXTemplater(),
            new Arch.OutputModule("./out/")
        )
    ]
}

Arch.run(config);
