import {Style} from "./style.ts";

export class StyleSheet {
    readonly sheets: { [selector: string]: Style | Style[] }
    constructor(sheets: any) {
        this.sheets = {}
        Object.keys(sheets).map(selector => {
            const sheet = sheets[selector]
            if (sheet instanceof Array) {
                this.sheets[selector] = sheet.map(s => new Style(s))
            } else {
                this.sheets[selector] = new Style(sheets[selector])
            }
        })
    }
    mergeSelector(parent: string, child: string) {
        const parents = parent.split(',')
        return child
            .split(',')
            .map(child => child.trim())
            .map(child => {
                if (child[0] === '&') {
                    return parents.map(parent => `${parent}${child.slice(1)}`)
                } else if (Style.combinators.includes(child[0])) {
                    return parents.map(parent => `${parent}${child}`)
                } else {
                    return parents.map(parent => `${parent} ${child}`)
                }
            })
            .flat()
            .join(',')
    }
    toSingleSelectorString(selector: string, sheet: any | Array<any>): string {
        if (sheet instanceof Array)
            return sheet
                .map(s => this.toSingleSheetString(selector, new Style(s)))
                .join('')
        else return this.toSingleSheetString(selector, new Style(sheet))
    }
    toSingleSheetString(selector: string, sheet: Style) {
        const parts: string[] = []
        const { str, rem } = sheet.toSheetString()
        if (str) parts.push(`${selector}{${str}}`)
        parts.push(
            ...rem.map(nested =>
                this.toSingleSelectorString(
                    this.mergeSelector(selector, nested.selector),
                    nested.sheet
                )
            )
        )
        return parts.join('')
    }
    toString() {
        return Object.keys(this.sheets)
            .map(s => {
                return this.toSingleSelectorString(s, this.sheets[s])
            })
            .join('')
    }
}
