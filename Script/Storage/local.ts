namespace game.storage.local {
    export function set(key: string, value: any) {
        localStorage.setItem(getKey(key), JSON.stringify(value));
    }
    
    export function get<Type>(key: string): Type | undefined {
        const item = localStorage.getItem(getKey(key));
        if (item)
            return JSON.parse(item) as Type;

        return undefined;
    }
    
    export function del(key: string) {
        localStorage.removeItem(getKey(key));
    }

    function getKey(key: string): string {
        return `${core.Version.replaceAll('.', '_')}-${key}`;
    }
}