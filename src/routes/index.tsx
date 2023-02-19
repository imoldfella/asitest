import { Component, createResource, createSignal, For, JSXElement, Show } from "solid-js"
import { A, createRouteMultiAction, createRouteAction, createRouteData, refetchRouteData, useRouteData } from "solid-start"
import server$, { createServerData$, createServerMultiAction$ } from "solid-start/server"
import Counter from "~/components/Counter"
import { Button, IncompleteIcon, SmallButton } from "~/components/icons"
import db from '~/lib/db'

// home is dashboard that shows any running tests

export const routeData = () => createServerData$(()=>{
  const r = db.getStore()
  console.log(r)
  return r
});
const addReservation$ = async (desc: string)=>{
  return db.reserve(desc)
}
const releaseReservation$ = async (id:number)=>{
  return db.free(id)
}
const releaseAll$ = async ()=>{
  return db.freeAll()
}
export default function Home() {
  const dash = useRouteData<typeof routeData>()

  const [, reserve] = createServerMultiAction$(addReservation$);
  const [, free] = createServerMultiAction$(releaseReservation$);
  const [, freeAll] = createServerMultiAction$(releaseAll$);
  const availCount = () => dash()?.setup? dash()!.setup.nworker - dash()!.servers.length : 0
  let descInput : HTMLInputElement
  return (
    <main class="mx-auto text-gray-700 p-4">
      <label for="desc" class="block font-medium text-gray-700">Lock a server</label>

      <div class='mt-1' >
        <div class='flex flex-row'>   
        <input  ref={descInput!} class="mr-2 border-2 p-1 rounded-md border-sky-800 opacity-100'" autofocus name='desc'  type='text' placeholder='Reservation notice'></input>
        <Button onClick={()=>reserve(descInput!.value)}>Reserve</Button>
        </div>
      </div>
      <div>Servers Available: {availCount()} </div>
      <table class='mt-4'>
        <For each={dash!()?.servers ?? []} >{(e) => {
          return <tr><td>{e.description} <span class='text-neutral-400'>(#{e.id})</span></td>
            <td><SmallButton onClick={()=>free(e.id)}>Release</SmallButton></td>
          </tr>
        }

        }</For></table>
      <div class='my-4'>
        <Button onClick={()=>refetchRouteData()}>Refresh</Button>
        <Button onClick={()=>freeAll()}>Release all</Button></div>
    </main>
  );
}
