namespace game {
    String.prototype.isNullOrEmpty = function (): boolean {
        return this === undefined || this.length === 0;
    }

    String.prototype.hasValue = function () {
        return this !== undefined && this.length > 0;
    }

    String.prototype.contains = function (text: string) {
        return this.indexOf(text) > -1;
    }

    String.prototype.containsIgnoreCase = function (text: string) {
        return this.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) > -1;
    }

    String.prototype.euqals = function (text) {
        return this === text;
    }

    String.prototype.euqalsIgnoreCase = function euqalsInvariant(text: string) {
        return this.toLocaleLowerCase() === text.toLocaleLowerCase();
    }
}

// String
interface String {
    isNullOrEmpty: () => boolean;
    hasValue: () => boolean;
    contains: (text: string) => boolean;
    containsIgnoreCase: (text: string) => boolean;
    euqals: (text: string) => boolean;
    euqalsIgnoreCase: (text: string) => boolean;
}