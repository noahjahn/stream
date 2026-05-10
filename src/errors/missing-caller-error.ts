class MissingCallerError extends Error {
    constructor() {
        super('There is no caller to answer a call from.')
    }
}

export default MissingCallerError
