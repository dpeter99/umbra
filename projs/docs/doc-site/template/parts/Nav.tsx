import {ArticleHelper, Content, React, Component, window} from "../common.ts";
import {TSXHelper} from "../TSXHelper.ts";



type TocItem = {
    name: string,
    content: Content|undefined,
    children: TocItem[],
}

type TocTreeHelper = { [key: string]:TocTreeHelper|TocItem|null};

function treeify(files: Content[]) {

    let result: TocItem = {name:"root", children:[], content: undefined};

    files.forEach(content =>{

        let path_segments = content.path.split('/');

        path_segments.reduce((acc, name, i, a) => {
            let next = acc.children.find(n=>n.name === name);
            if(!next) {
                //r[name] = { result: [] };
                next = {name, children: [], content: undefined};

                if(i == a.length-1){
                    next.content = content;
                }

                acc.children.push(next)
            }

            return next;
        }, result)
    })

    return result;
}

function tocSort(ascending:boolean) {
    return function (a:TocItem, b:TocItem) {
        // equal items sort equally
        if (a.content === b.content) {
            return 0;
        }

        // nulls sort after anything else
        if (a.content == undefined) {
            return ascending ? 1 : -1;
        }
        if (b.content == undefined) {
            return ascending ? -1 : 1;
        }

        // otherwise, if we're ascending, lowest sorts first
        if (ascending) {
            return a.name < b.name ? -1 : 1;
        }

        // if descending, highest sorts first
        return a.name < b.name ? 1 : -1;
    };
}

export class Nav extends Component {

    helper: TSXHelper;
    private doc: Content;

    constructor(props: { doc:Content, helper:TSXHelper }) {
        super(props);
        this.helper = props.helper;
        this.doc = props.doc;
    }

    generateToc(){
        let toc = treeify(this.helper.getPipeline().files);

        toc.children = toc.children.sort(tocSort(false));

        return(
            <ul class="top-level">
                {toc.children.map(c=>this.recurseToc(c,`/${c.name}/`))}
            </ul>
        )
    }

    recurseToc(tocItem: TocItem, path:string = ""){
        if(tocItem.content){
            return (
                <li >
                    <a href={tocItem.content.meta.url} active={this.doc === tocItem.content}>
                        {tocItem.content.name}
                    </a>
                </li>)
        }
        //if(this.doc.path.includes("ShadowEngine"))
        //debugger;
        return (
            <li class="nav-group" open={TSXHelper.subArticle(path, this.doc)}>
                <div class="nav-group-header"> <span>{tocItem.name}</span> </div>
                <ul>
                    {tocItem.children.sort(tocSort(false)).map(a=>this.recurseToc(a, path+a.name+(a.content ? "" : "/")))}
                </ul>
            </li>
        );

    }

    render() {

        let listItems = this.helper.subArticles().map((number) =>
            <li><a href={number.meta.url}>{number}</a></li>
        );

        return(
            <aside id="drawer" class="drawer-holder">
                <div class="drawer">
                    <button id="nav-level-button" onclick={
                    ()=>window.document.getElementById('nav-holder')?.toggleAttribute('top-level')
                    }> "back" </button>

                    <div id={"nav-holder"} class="nav-holder">
                        <nav class="nav nav-top">
                            <h1>Top</h1>
                        </nav>
                        <nav class="nav" id="nav">
                            {this.generateToc()}
                        </nav>
                    </div>
                </div>
                <a></a>
            </aside>
            );
    }
}

export const Nav_old = ({doc,helper}: { doc: Content, helper:ArticleHelper }) => {

}