import {React,Content,ArchExp} from "../common.ts";
import {TSXHelper} from "../TSXHelper.ts";
import {Member} from "dpeter99/archivist/src/Modules/Input/doxygen/DoxygenReader.ts";

export class DocsPage extends ArchExp.Component{

    doc: Content;
    helper: TSXHelper;

    constructor(props: { doc: Content, helper:TSXHelper }) {
        super();
        this.doc = props.doc;
        this.helper = props.helper;
    }

    async inlineMD(text :string){
        let a: string = (await this.helper.md(text));
        if(typeof a == "string")
            a = a.replaceAll(/<[\\\/]?p>/gm, "");

        return a;
    }

    async generateMember(member: Member){
        return(
            <div class="member">
                <div class="member-header">
                    <div class="member__name">
                        {member.$kind === "other" ?
                            (<span class="member__type">{member.kind}</span>) : ""
                        }
                        <h4>
                            {member.name}
                        </h4>
                    </div>
                </div>
                <div class="code-holder">
                    <code>
                        <span class="vis">
                            {await this.inlineMD(member.visibility)}
                        </span>
                        <span class="type">
                            {await this.inlineMD(member.type)}
                        </span>
                        <span class="name">
                            {member.name}
                        </span>
                        {member.$kind === "function" ?
                            (<spam>
                                {member.argsstring}
                            </spam>) : ""
                        }
                    </code>
                </div>
                <div class="member-description">
                    {await this.helper.md(member.brief)}
                </div>
            </div>
        )

    }

    async generateMembers(){
        let members: Member[] = this.doc.meta["code:data"].members;
        let members_array = this.helper.groupByInObjects(members, m=>m.$kind);

        return await Promise.all(members_array.map(async ({key, values})=> (
            <>
                <h3>{this.helper.toFirstUpper(key)}</h3>
                {(await Promise.all(values.map(m=>this.generateMember(m))))}
            </>
        )))

    }

    async render(): Promise<Component> {
        return(
            <main>
                <article>
                    <h1 id="{{id}}" data-uid="{{uid}}" class="text-break">
                        {this.doc.meta.name}
                    </h1>
                    <div class="markdown level0 summary">
                        {await this.helper.md(this.doc.meta["code:data"].brief)}
                    </div>
                    <div class="markdown level0 summary">
                        {await this.helper.md(this.doc.meta["code:data"].detail)}
                    </div>
                    {await this.generateMembers()}
                </article>
            </main>
        );
    }
}