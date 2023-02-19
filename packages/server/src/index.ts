import express from "express";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";
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


const t = initTRPC.create()
interface ChatMessage {
    user: string;
    message: string;
}

const appRouter = t.router({
    getStore: t.procedure
        .input(z.object({ name: z.string() }))
        .query((req) => {
            const { input } = req;
            return {
                text: `Hello ${input.name}` as const,
            };
        })
})

export type AppRouter = typeof appRouter;
export interface TestSetup {
    nworker: number
    host: string
    sqlserver: string
    db: string  // root name of database iMISMain10
    bak: string // database to restore
    datadir: string
}
const app = express();
app.use(cors());
const port = 2022;

app.use(
    "/api",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
    })
);

app.get("/", (req, res) => {
    res.send("Hello from api-server");
});

app.listen(port, () => {
    console.log(`api-server listening at http://localhost:${port}`);
});