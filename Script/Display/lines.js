import { primitive } from "../Utils/elementBuilder.js"
import { } from "../Utils/extensions.js"
import { color as colorEnum } from "../enums.js"

export const line = {
    create: function (color) {
        const accCss = { prop: '--accent-color', value: (color.hasValue() ? colorEnum[color] : colorEnum.green) }
        return primitive('line', '', '', [accCss]);
    }
}