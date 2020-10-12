let count = 0

process.on('message', message => {
    if (process.send) {
        process.send('Starting...')
        setInterval(() => {
            if (process.send) {
                process.send(`blarg ${++count}`)
            }
        }, 250)
    }
})
