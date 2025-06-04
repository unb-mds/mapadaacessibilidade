export const logRequisicoes = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next()
}

export const logCompleto = (req, res, next) => {
    const start = Date.now()
    
    res.on('finish', () => {
        const duration = Date.now() - start
        console.log(
            `[${new Date().toISOString()}] ${req.method} ${req.path} - ` +
            `Status: ${res.statusCode} - ` +
            `Duração: ${duration}ms`
        )
    })
    
    next()
}
