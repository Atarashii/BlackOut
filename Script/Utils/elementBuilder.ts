namespace game.builder {
    export function primitive(tag: string, id?: string, classes?: Array<string> | string, styles?: Pairs | string, attrs?: Pairs, html?: string, text: string = ''): JQuery<HTMLElement> {
        const idAttr = id && id.hasValue() ? ` id="${id}"` : '';
        // Class check
        const clsClean = classes ? classCheck(classes) : '';
        const classAttr = clsClean.hasValue() ? ` class="${clsClean}"` : '';

        // Style Check
        const stlClean = styles ? styleCheck(styles) : '';
        const styleAttr = stlClean.hasValue() ? ` style="${stlClean}"` : '';

        let attrsClean = ''
        if (attrs && attrs.List.length > 0) {
            attrs.List.forEach(pair => {
                attrsClean += ` ${pair.Key}="${pair.Value}"`;
            });
        }

        const element = $(`<${tag}${idAttr}${classAttr}${styleAttr}${attrsClean}>${text}${(html ? html : '')}</${tag}>`);

        return element;
    }

    function classCheck(classInput: Array<string> | string) {
        let classArray = [];
        let classClean = '';
        if (classInput.length > 0) {
            if (Array.isArray(classInput)) {
                classInput.forEach(cls => {
                    classArray.push(cls.trim())
                })
            } else if ((typeof classInput).euqalsIgnoreCase('string')) {
                if (classInput.contains(',')) {
                    classInput.split(',').forEach(cls => {
                        classArray.push(cls.trim());
                    });
                }
                else
                    classArray.push(classInput.trim());
            }
            classClean = classArray.join(' ');
        }

        return classClean;
    }

    function styleCheck(styleInput: Pairs | string) {
        let styleArray = [];
        let styleClean = '';
        if (typeof styleInput !== 'string' && styleInput.List.length > 0) {
            if (Array.isArray(styleInput.List)) {
                styleInput.List.forEach(stl => {
                    styleArray.push(`${stl.Key.trim()}: ${stl.Value.trim()};`)
                })
            } else if (typeof styleInput === 'string') {
                styleInput = styleInput as string;
                if (styleInput.contains(';')) {
                    styleInput.split(';').forEach(stl => {
                        styleArray.push(`${stl.split(':')[0].trim()}: ${stl.split(':')[1].trim()};`);
                    });
                }
                else
                    styleArray.push(`${styleInput.split(':')[0].trim()}: ${styleInput.split(':')[1].trim()};`);
            }
            styleClean = styleArray.join(' ');
        }

        return styleClean;
    }
}