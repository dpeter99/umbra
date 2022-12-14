import {ArticleHelper, Content, React, window} from "./common.ts";
import {DocsPage} from "./parts/DocsPage.tsx";
import {Nav} from "./parts/Nav.tsx";
import {TSXHelper} from "./TSXHelper.ts";

export const root = (doc:Content, helper:TSXHelper) => {

    //console.log(Nav.prototype);
    //debugger;

    return (
        <html>
        <head>
            <title>Index</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="stylesheet" href="/index.css"/>
            <script defer src="/index.js"></script>
        </head>
        <body>
            <section class="page-root">
                <Header></Header>
                <content>
                    <Nav doc={doc} helper={helper}></Nav>
                    <DocsPage doc={doc} helper={helper}></DocsPage>
                </content>
            </section>
        </body>
        </html>
    )
}


const Header = ()=>(
    <div class="header-container">
        <div class="header-bar">
            <button onClick={
                ()=>window.document.getElementById('drawer')?.toggleAttribute('open')
            }>-</button>
            <div class="logo">
                <span>Umbra</span>
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
        <div class="header-bar header-color">
            <div class="logo">
                <span>Shadow Engine</span>
            </div>
            <nav>
                <tab>
                    <a>Tutorials</a>
                </tab>
                <tab active>
                    <a href="/doc">API</a>
                </tab>
            </nav>
        </div>
    </div>
);