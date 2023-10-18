import './scss/index.scss'

console.log('Working')

async function start(){
    return await Promise.resolve('async working')
}

start().then(console.log)