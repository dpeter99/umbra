import {Style} from "../deno-tsx/style.ts";
import {minify} from "https://deno.land/x/minifier/mod.ts";
import {DocType} from "../deno-tsx/react.ts";

export abstract class Component {
    protected children: any[] = [];

    constructor(props: any) {
    }

    addChildren(children: any[]){
        this.children = children;

        return this;
    }

    abstract render(): Promise<Component | null>;


    toString(): Promise<string>{
        return this.stringify('html');
    }

    async stringify(type: DocType): Promise<string> {
        const ele = (await this?.render());

        if(ele)
            return await ele.stringify(type) ?? "";

        //debugger;
        return "";
    }
}

///@ts-ignore
Component.prototype.isComponent = {};

function shouldConstruct(type: any) {
    if(type == "" || type == undefined)
        return false;
    var prototype = type.prototype;
    return !!(prototype && prototype.isComponent);
}

export class NativeComp extends Component{
    public tag: any;
    public props: any;

    constructor(tag: string, props: any, children: any[]) {
        super(props);
        this.tag = tag;
        this.props = props;
        this.children = children;
    }

    props_string() {
        if(!this.props)
            return "";

        return Object.keys(this.props)
            .filter(
                this.tag === 'script'
                    ? k =>
                        this.props[k] !== undefined &&
                        this.props[k] !== null &&
                        k !== 'IIFE'
                    : k => this.props[k] !== undefined && this.props[k] !== null
            )
            .map(
                k =>{

                    if(typeof this.props[k] === 'boolean')
                        if (this.props[k])
                            return ` ${k}`;
                        else
                            return ``;

                    return ` ${k}="${
                        k === 'style'
                            ? new Style(this.props[k]).toString()
                            : this.props[k] instanceof Function
                                ? minify('js', `(${this.props[k].toString()})()`)
                                : this.props[k].toString()
                    }"`
                }
            )
            .join('')
    }

    async children_string(type: DocType, children: any[] = this.children): Promise<string> {
        const concat = children
            .map(async c => {
                    if(c instanceof Promise)
                        c = await c;

                    if (typeof c === 'string')
                        return c;
                    if (c instanceof Promise)
                        return await c;
                    if (c instanceof Component)
                        return await c.stringify(type);
                    if (c instanceof Array)
                        return await this.children_string(type, c)
                    //if (this.tag === 'script' && this.props['IIFE'] && c instanceof Function)
                    //    return minify('js', `\n(${c})();\n`);

                    return c;
                }
            );
        const finished = await Promise.all(concat);
        //console.log(finished);
        //debugger;
        return finished.join('');

    }

    async stringify(type: DocType = 'html'): Promise<string> {
        if(!this.tag || this.tag == "")
            return `${await this.children_string(['svg', 'math'].includes(this.tag) ? 'xml' : type)}`;

        return `<${this.tag}${this.props_string()}>
            ${await this.children_string(['svg', 'math'].includes(this.tag) ? 'xml' : type)}
         </${this.tag}>`;
    }

    async toString() {
        return this.stringify('html');
    }

    render(): Promise<Component> {
        ///@ts-ignore
        return this.children;
    }
}


export class React {

    static createElement(
        tag: any,
        props?: { [index: string]: string | object },
        ...children: unknown[]
    ): any {
        if(shouldConstruct(tag))
            return (new tag(props)).addChildren(...children);
        //debugger;
        if(typeof tag === "function")
            return tag(props, ...children);

        return new NativeComp(tag, props, children);
    }


}