import { Show } from "solid-js";
import { A, useRouteData } from "solid-start";
import { createServerData$, createServerMultiAction$ } from "solid-start/server";
import Counter from "~/components/Counter";
import { Button } from "~/components/icons";
import db from "~/lib/db";
import { Editor } from "~/lib/editor";

const save$ = async (desc: string) => {
  return db.reserve(desc)
}
export const routeData = () => createServerData$(db.getStore);
export default function About() {
  const dash = useRouteData<typeof routeData>()
  const [, save] = createServerMultiAction$(save$);

  return (
    <main class="mx-auto text-gray-700 p-4">
      <Show when={dash}>
        <Editor onSave={save} value={JSON.stringify(dash()!.setup, null, "    ")} /></Show>
    </main>
  );
}