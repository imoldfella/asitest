
import db, { defaultSetup, TestSetup } from "~/lib/db"
import { A, useRouteData } from "solid-start";
import { createSignal } from "solid-js";
import { CodeView } from "~/lib/codeview";
import json from 'highlight.js/lib/languages/json';
import hljs from 'highlight.js/lib/core';
import { createServerData$ } from "solid-start/server";
import { snapshot } from "~/lib/mssql";
import { nstring } from "~/lib/foreach";
hljs.registerLanguage('json', json);



// call every time there is a new database to use.
// how can we look in the bak file to find out the mdf to move?
export  function  create_db(s: TestSetup, i: number) {
  const db = `${s.db}_${i}`
  const dbpath = `${s.datadir}\\${db}`
  return `\ndrop database if exists ${db}\nGO\nRESTORE DATABASE [${s.db}_${i}] FROM  DISK = N'${s.bak}' WITH  FILE = 1,  MOVE N'iMISMain15' TO N'${dbpath}.mdf',  MOVE N'iMISMain15_log' TO N'${dbpath}.ldf',  NOUNLOAD,  STATS = 5\GO\n`
  + snapshot(db,dbpath+".ss")
}


export const routeData = () => createServerData$(db.getStore);
export default function Install() {
  const dash = useRouteData<typeof routeData>()
  
  const sql = () => nstring(dash()!.setup.nworker, (i:number)=> create_db(dash()!.setup,i))
  return (
    <main class="mx-auto text-gray-700 p-4">
      <CodeView language={'json'}
        downloadAs='build.sql'
        code={sql()}
      />
    </main>
  );
}