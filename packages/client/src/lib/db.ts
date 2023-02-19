import fs from 'fs/promises'
import { createSignal } from 'solid-js'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter, TestSetup } from '../../../server/src/index'
export { TestSetup }
// do we need 100 for v10 and 100 for v100?

export function defaultSetup(s: Partial<TestSetup>): TestSetup {
    return {
        nworker: s.nworker ?? 100,
        host: s.host ?? 'asi.datagrove.com',
        sqlserver: s.sqlserver ?? "LIGHTS\\MSSQLSERVER01",
        db: s.db ?? 'iMISMain10',
        bak: s.bak ?? 'D:\\DB\\v10.bak',
        datadir: s.datadir ?? "d:\\db"
    }
}
export type Reservation = { id: number, description: string }

export const [store, setStore] = createSignal({
    setup: defaultSetup({}),
    servers: [] as Reservation[]
})
//let avail: number[] = [...Array(store.setup.nworker)].map((_, i) => i)

/*
export default {
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
        if (avail.length == 0)
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
        store.servers = store.servers.filter(e => e.id != r)
    },
    freeAll() {
        store.servers = []
        avail = [...Array(store.setup.nworker)].map((_, i) => i)
    }
}
*/
