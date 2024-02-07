const utils = {
    toString: (...params) => params.reduce((prev, curr) => `${prev}${curr}`, ''),
    parseBigInt: (...params) => {
        const str = utils.toString(params)
        let int = ''
        for (let i of str)
            if (!isNaN(+i)) int += i
        return BigInt(int)
    },
    parseInt: (...params) => {
        const str = utils.toString(...params)
        let int = ''
        for (let i of str)
            if (!isNaN(+i)) int += i
        return +int
    },
    changeType: (param, requiredType) => {
        if (param && typeof param === requiredType.toLowerCase()) return param
        if (param && typeof param.length >= 0 && requiredType.toLowerCase() === 'array') return param
        if (param && typeof param === 'function') param = `${param()}`
        switch (requiredType.toLowerCase()) {
            case 'null':
                return null
            case 'undefined':
                return undefined
            case null:
                return null
            case undefined:
                return undefined
            case 'number':
                if (typeof param === 'number') return param;
                if (param && param.length >= 0) `${param}`.split().reduce((prev, curr) => prev += utils.parseInt(curr), 0)
                return utils.parseInt(param)
            case 'int':
                // console.log('Type int returned ', utils.changeType(param, 'number'));
                return utils.changeType(param, 'number')
            case 'integer':
                return utils.changeType(param, 'number')
            case 'array':
                return [param]
            case 'bigint':
                if (param && param.length >= 0) `${param}`.split().reduce((prev, curr) => prev += utils.parseBigInt(curr), BigInt(0))
                return utils.parseBigInt(param)
            case 'object':
                return { data: param }
            case 'boolean':
                return Boolean(param)
            case 'function':
                return () => param
            default:
                return `${param}`
        }
    },
    checkType: (param, requiredType) => {
        if (requiredType.toLowerCase() == 'array') return param && param.length >= 0
        return typeof param === requiredType.toLowerCase()
    }
}
module.exports = utils