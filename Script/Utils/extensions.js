// String
String.prototype.isNullOrEmpty = function IsNullOrEmpty() {
    return this === undefined || this.length === 0;
}

String.prototype.hasValue = function hasValue() {
    return this !== undefined & this.length > 0;
}

String.prototype.contains = function contains(text) {
    return this.indexOf(text) > -1;
}

String.prototype.containsInvariant = function containsInvariant(text) {
    return this.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) > -1;
}

String.prototype.euqals = function euqals(text) {
    return this === text;
}

String.prototype.euqalsInvariant = function euqalsInvariant(text) {
    return this.toLocaleLowerCase() === text.toLocaleLowerCase();
}