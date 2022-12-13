import {Content} from "https://raw.githubusercontent.com/dpeter99/archivist/doxygen-support/src/Content.ts";
import {React} from "https://deno.land/x/tsx_static@v1.0.0/mod.ts";
import {retry} from "https://deno.land/std@0.167.0/async/retry.ts";
import {
    ArticleHelper
} from "https://raw.githubusercontent.com/dpeter99/archivist/doxygen-support/src/utils/ArticleHelper.ts";



export const DocsPage = async ({doc,helper}: { doc: Content, helper:ArticleHelper }) => {
    return(
        <main>
            <article>
                <h1 id="{{id}}" data-uid="{{uid}}" class="text-break">
                    {doc.meta.name}
                </h1>
                <div class="markdown level0 summary">
                    {await helper.md(doc.meta["code:data"].brief)}
                </div>
                <div class="markdown level0 summary">
                    {await helper.md(doc.meta["code:data"].detail)}
                </div>
            </article>
        </main>
    );
}