import { } from "./extensions.js"

export function primitive(tag, id = '', classes = '', styles = '', html = '', text = '') {
    const idAttr = id.hasValue() ? ` id="${id}"` : '';
    // Class check
    const clsClean = classCheck(classes);
    const classAttr = clsClean.hasValue() ? ` class="${clsClean}"` : '';

    // Style Check
    const stlClean = styleCheck(styles);
    const styleAttr = stlClean.hasValue() ? ` style="${stlClean}"` : '';

    return $(`<${tag}${idAttr}${classAttr}${styleAttr}>${contentCheck(html, text)}</${tag}>`)
}

function classCheck(classInput) {
    let classArray = [];
    let classClean = '';
    if (classInput.length > 0) {
        if (Array.isArray(classInput)) {
            classInput.forEach(cls => {
                classArray.push(cls.trim())
            })
        } else if ((typeof classInput).euqalsInvariant('string')) {
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

function styleCheck(styleInput) {
    let styleArray = [];
    let styleClean = '';
    if (styleInput.length > 0) {
        if (Array.isArray(styleInput)) {
            styleInput.forEach(stl => {
                styleArray.push(`${stl.prop.trim()}: ${stl.value.trim()};`)
            })
        } else if ((typeof styleInput).euqalsInvariant('string')) {
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

function contentCheck(html, text) {
    if (html.trim().isNullOrEmpty() && text.hasValue())
        return text;

    if (html.trim().hasValue() && text.trim().isNullOrEmpty())
        return html.trim();

    if (html.trim().isNullOrEmpty() && text.isNullOrEmpty())
        return '';

    // default to returning empty if they are both defined. force a fix
    if (html.trim().hasValue() && text.trim().hasValue())
        return '<<>><<>>... Fix this ...<<>><<>>';
} 