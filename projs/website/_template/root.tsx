import {ArticleHelper, Content, React, window} from "./common.ts";
import {DocsPage} from "./parts/DocsPage.tsx";
import {Nav} from "./parts/Nav.tsx";
import {TSXHelper} from "./TSXHelper.ts";
import {archivistInst} from "dpeter99/archivist/src/Archivist.ts";
import {NavBarStack} from "./parts/NavBarStack.tsx";
import {TocManager} from "./libs/toc/TOC.ts";

export const root = (doc:Content, helper:TSXHelper) => {
    TocManager.refreshToc(helper.getPipeline().files);

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
                    <Nav doc={doc} helper={helper} tocPath={archivistInst.outputURL!}></Nav>
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