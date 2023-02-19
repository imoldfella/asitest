import fs from 'fs/promises'


// do we need 100 for v10 and 100 for v100?
export interface TestSetup {
    nworker: number
    host: string
    sqlserver: string
    db: string  // root name of database iMISMain10
    bak: string // database to restore
    datadir: string
}
export function defaultSetup(s: Partial<TestSetup>) : TestSetup {
    return {
        nworker:s.nworker??100,
        host:  s.host ?? 'asi.datagrove.com',
        sqlserver: s.sqlserver ?? "LIGHTS\\MSSQLSERVER01",
        db: s.db??'iMISMain10',
        bak: s.bak??'D:\\DB\\v10.bak',
        datadir: s.datadir??"d:\\db"
    }
}

// this needs to be server side state, we can cache on the client
interface ActiveTest {
    name: string
}

const serverState = {
    active: new Array<ActiveTest>(100)
}
export type Reservation = {id:number,description:string}

const store = {
    setup: defaultSetup({}),
    servers: [] as Reservation[]
}

let avail : number[] =  [...Array(store.setup.nworker)].map((_,i)=> i)

export default   {
    getStore() {
        console.log("store", store)
        return store
    },
    async setup(s: string) {
        console.log("setup", s)
        await fs.writeFile("asi.json", s)
        store.setup = JSON.parse(s)
    },
    reserve(desc: string) {
        if (avail.length==0) 
            return -1
        const r = avail.pop()!
        store.servers.unshift({
            id: r, 
            description: desc
        })
        return r
    },
    free(r: number) {
        avail.push(r)
        store.servers = store.servers.filter(e => e.id!=r)
    },
    freeAll() {
        store.servers=[]
        avail = [...Array(store.setup.nworker)].map((_,i)=> i)
    }
}
