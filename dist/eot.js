class EloquentObjectTools {
    
    constructor(){}

    clone(obj = null){
        if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj) {
            return obj;
        }
        let temp = null;
        if (obj instanceof Date) {
            temp = new obj.constructor();
        } else {
            temp = obj.constructor();
        }

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj['isActiveClone'] = null;
                temp[key] = this.clone(obj[key]);
                delete obj['isActiveClone'];
            }
        }

        return temp;
    } 

    getDeep(obj = {}, path = '', def) {
        if (path === '') {
            return '';
        }
        return (() => typeof path === 'string' ? path.replace(/\[(\d+)]/g, '.$1') : path.join('.'))()
            .split('.')
            .filter(Boolean)
            .every(step => ((obj = obj[step]) !== undefined)) ? obj : def;
    }

    setDeep(obj = {}, path = '', val = '') {
        const pathArray = (() => typeof path === 'string' ? path.replace(/\[(\d+)]/g, '.$1') : path.join('.'))()
            .split('.')
            .filter(Boolean);
        const finalIndex = pathArray.length;
        let deepIndex = 0;
        return pathArray.every((step) => {
            deepIndex++;
            if (obj[step] && typeof obj[step] !== 'object' && !(finalIndex === deepIndex)) {
                return false;
            } else if (finalIndex === deepIndex) {
                obj[step] = val;
                return true;
            } else if (!obj[step]) {
                obj[step] = {};
            }
            return obj = obj[step];
        });
    }

} 

module.exports = EloquentObjectTools;
