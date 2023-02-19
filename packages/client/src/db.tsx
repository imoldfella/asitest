
import { defaultSetup, store, TestSetup } from "./lib/db"
import { createSignal, Show } from "solid-js";
import { CodeView } from "./lib/codeview";
import hljs from 'highlight.js/lib/core';
import { snapshot } from "./lib/mssql";
import { nstring } from "./lib/foreach";
import { Editor } from "./lib/editor";




export function Configure() {
  const save = (s: string) => { }

  return (
    <main class="mx-auto text-gray-700 p-4" >

      <Editor onSave={save} value={JSON.stringify(store().setup, null, "    ")} />
    </main >
  );
}

export function CopyFiles() {
  const cd = (): string => nstring(store().setup.nworker, (i: number) => `copy /y tenant_template /tenant${i}`)

  return (
    <main class="mx-auto text-gray-700 p-4">
      <CodeView language={'json'}
        downloadAs='copytenant.bat'
        code={cd()}
      />
    </main>
  );
}

// call every time there is a new database to use.
// how can we look in the bak file to find out the mdf to move?
export function create_db(s: TestSetup, i: number) {
  const db = `${s.db}_${i}`
  const dbpath = `${s.datadir}\\${db}`
  return `\ndrop database if exists ${db}\nGO\nRESTORE DATABASE [${s.db}_${i}] FROM  DISK = N'${s.bak}' WITH  FILE = 1,  MOVE N'iMISMain15' TO N'${dbpath}.mdf',  MOVE N'iMISMain15_log' TO N'${dbpath}.ldf',  NOUNLOAD,  STATS = 5\nGO\n`
    + snapshot(db, dbpath + ".ss")
    + "\nGO\n"
}

export default function Sql() {
  const sql = () => nstring(store().setup.nworker, (i: number) => create_db(store().setup, i))
  return (
    <main class="mx-auto text-gray-700 p-4">
      <CodeView language={'json'}
        downloadAs='build.sql'
        code={sql()}
      />
    </main>
  );
}