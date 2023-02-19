import db, { defaultSetup, TestSetup } from "~/lib/db"
import { A, useRouteData } from "solid-start";
import { CodeView } from "~/lib/codeview";
import json from 'highlight.js/lib/languages/json';
import hljs from 'highlight.js/lib/core';
import { createServerData$ } from "solid-start/server";
import { nstring } from "~/lib/foreach";
import { Show } from "solid-js";
hljs.registerLanguage('json', json);

export const routeData = () => createServerData$(db.getStore);
export default function Install() {
  const dash = useRouteData<typeof routeData>()
  
  const cd = ():string=> nstring(dash()!.setup.nworker, (i: number) => `copy /y tenant_template /tenant${i}`)

  return (
    <main class="mx-auto text-gray-700 p-4">
      <Show when={dash}>
      <CodeView language={'json'}
        downloadAs='copytenant.bat'
        code={cd()}
      /></Show>
    </main>
  );
}