class MissingValueError extends Error {
    constructor(field?: string) {
        if (field) {
            super(`Please make sure to enter a value for ${field}`)
            return
        }
        super('A value is missing')
    }
}

export default MissingValueError
