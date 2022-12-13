import {minify} from 'https://deno.land/x/minifier/mod.ts'
import {Style} from "./style.ts";
import {StyleSheet} from "./StyleSheet.ts"

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any
        }
    }
}

export type DocType = 'xml' | 'html' | 'xhtml'
export class React {
    static xmlns: { [type: string]: string } = {
        html: 'http://www.w3.org/1999/xhtml',
        svg: 'http://www.w3.org/2000/svg',
        math: 'http://www.w3.org/1998/Math/MathML'
    }
    static readonly self_closing = [
        'area',
        'base',
        'br',
        'col',
        'command',
        'embed',
        'hr',
        'img',
        'input',
        'keygen',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr'
    ]
    readonly tag: string
    readonly props: { [index: string]: string | object }
    readonly children: unknown[]

    /**
     * Create object for the tag
     * @param tag The name of the tag
     * @param props Properties of the tag
     * @param children The content of the tag
     */
    constructor(
        tag: string,
        props?: { [index: string]: string | object },
        ...children: unknown[]
    ) {
        this.tag = tag
        this.props = props ?? {}
        this.children =
            this.tag === 'style' ? [new StyleSheet(children[0])] : children
    }

    props_string() {
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
                k =>
                    ` ${k}="${
                        k === 'style'
                            ? new Style(this.props[k]).toString()
                            : this.props[k] instanceof Function
                                ? minify('js', `(${this.props[k].toString()})()`)
                                : this.props[k].toString()
                    }"`
            )
            .join('')
    }
    async children_string(type: DocType, children: any[] = this.children): Promise<string> {


        const concat = children
            .map(async c => {
                    if (typeof c === 'string')
                        return c;
                    if (c instanceof Promise)
                        return await c;
                    if (c instanceof React)
                        return await c.stringify(type);
                    if (c instanceof Array)
                        return await this.children_string(type, c)
                    if (this.tag === 'script' && this.props['IIFE'] && c instanceof Function)
                        return minify('js', `\n(${c})();\n`);

                    return await c.toString();
                }
            );
        const finished = await Promise.all(concat);
        //console.log(finished);
        //debugger;
        return finished.join('');

    }

    isHTML(type: DocType) {
        return (type == 'html' || type === 'xhtml') && this.tag === 'html'
    }
    isXML(type: DocType) {
        return type === 'xml' || type === 'xhtml'
    }
    isSelfClosing(type: DocType) {
        if (type === 'html' || type === 'xhtml') {
            return React.self_closing.includes(this.tag)
        } else {
            return this.children.length < 1
        }
    }

    assignXMLNS(type: DocType) {
        if (type !== 'xhtml') return
        if (Object.keys(React.xmlns).includes(this.tag) && !this.props.xmlns) {
            this.props.xmlns = React.xmlns[this.tag]
        }
    }

    stringify_selfClosing(type: DocType): string {
        if (this.children.length > 0) {
            console.warn(`Self-closing <${this.tag}> but child list non-empty`)
        }
        return `<${this.tag}${this.props_string()}${this.isXML(type) ? '/' : ''}>`
    }
    async stringify_nonSelfClosing(type: DocType): Promise<string> {

        return `<${this.tag}${this.props_string()}>${await this.children_string(
            ['svg', 'math'].includes(this.tag) ? 'xml' : type
        )}</${this.tag}>`
    }

    async stringify(type: DocType = 'html'): Promise<string> {
        this.assignXMLNS(type)
        return (
            (this.isHTML(type) ? '<!DOCTYPE html>' : '') +
            (this.isSelfClosing(type)
                ? await this.stringify_selfClosing(type)
                : await this.stringify_nonSelfClosing(type))
        )
    }
    toString() {
        return this.stringify('html')
    }

    static createElement(
        tag:
            | string
            | ComponentFunction,
        props?: { [index: string]: string | object },
        ...children: unknown[]
    ): React {
        console.log(tag);
        if (tag instanceof Function) {
            return tag(props, ...children)
        } else {
            return new React(tag, props, ...children)
        }
    }
}

export type ComponentFunction =
    (props?: { [index: string]: string | object }, ...children: unknown[]) => React;