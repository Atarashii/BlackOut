namespace game {
    export class KeyValue {
        Key: string;
        Value: string;

        constructor(key: string, value: string) {
            this.Key = key;
            this.Value = value;
        }
    }

    export class Pairs {
        List: Array<KeyValue> = [];

        constructor(pairs: Array<KeyValue> = []) {
            pairs.forEach(pair => {
                this.List.push(pair);
            });
        }

        get keys() {
            const keys: Array<string> = [];

            this.List.forEach(item => {
                keys.push(item.Key);
            });

            return keys;
        }

        value(key: string): KeyValue {
            return this.List.filter(o => o.Key.euqals(key))[0];
        }
    }
}