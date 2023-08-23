const isProd = process.argv.includes('--prod')
const isDev = !isProd

export {
    isProd,
    isDev
}
