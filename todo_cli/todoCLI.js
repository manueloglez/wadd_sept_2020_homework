const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const list = []

rl.setPrompt('(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit\n> ')

rl.on('line', (answer) => {
    if(answer === 'q') rl.close() 
    else {
        if (answer === 'v'){
            if (list.length === 0) {
                console.log('List is empty...')
            } else {
                list.forEach((x, i) => {
                    console.log(`${i} [${x[1] ? '✓' : ' '}] ${x[0]}`)
                })
            }
        } else if (answer === 'n') {
            rl.question('What?\n>', (answer) => {
                list.push([answer, false])
                rl.prompt()
            })
        } else if (answer.startsWith('c') && answer.length > 1) {
            let selectedAct = list[Number(answer.slice(1))]
            if (selectedAct) {
                selectedAct[1] = !selectedAct[1]
                console.log(`${selectedAct[1] ? 'Completed' : 'Pending'} "${selectedAct[0]}"`)
            } else {
                console.log('Activity Index not available')
            }
    
        } else if (answer.startsWith('d')) {
            let selectedAct = list[Number(answer.slice(1))]
            if (selectedAct) {
                console.log(`Deleted "${selectedAct[0]}"`)
                list.splice(Number(answer.slice(1)), 1)
            } else {
                console.log('Activity Index not available')
            }
        }
        else {
            console.log('Please type a valid command')
        }
        rl.prompt()
    }
})

rl.on('close', () => {
    console.log(`See you soon! :)`)
})

console.log("Welcome to Todo CLI!\n--------------")
rl.prompt()