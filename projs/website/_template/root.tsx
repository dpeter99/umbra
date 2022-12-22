import {ArticleHelper, Content, React, window} from "./common.ts";
import {DocsPage} from "./parts/DocsPage.tsx";
import {Nav} from "./parts/Nav.tsx";
import {TSXHelper} from "./TSXHelper.ts";
import {archivistInst} from "dpeter99/archivist/src/Archivist.ts";
import {NavBarStack} from "./parts/NavBarStack.tsx";
import {TocManager} from "./libs/toc/TOC.ts";

let once = true;
function runOnce() {
    if(!once)
        return;

    TocManager.printToc();
    once = false;
}

export const root = (doc:Content, helper:TSXHelper) => {
    TocManager.refreshToc(helper.getPipeline().files);

    if(archivistInst.detailedOutput)
        runOnce()

    let tocPath = TocManager.getTocPathForPath(doc.meta.url);
    const top = tocPath.findLastIndex( t=> t.content?.meta["toc"] === "header")

    let navToc = tocPath[top+1];

    return (
        <html>
        <head>
            <title>Index</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="stylesheet" href={(archivistInst.rootURL ?? "") + "/index.css"}/>
            <script defer src={(archivistInst.rootURL ?? "") + "/index.js"}></script>
        </head>
        <body>
            <section class="page-root">
                <NavBarStack helper={helper} doc={doc}></NavBarStack>
                <content>
                    {
                        navToc ? <Nav doc={doc} helper={helper}></Nav> : <div></div>
                    }

                    { doc.meta.type == "docs" ?
                        <DocsPage doc={doc} helper={helper}></DocsPage> :
                        <div>{doc.content}</div>
                    }

                </content>
            </section>
        </body>
        </html>
    )
}