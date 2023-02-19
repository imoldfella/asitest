import { Component, createResource, createSignal, For, JSXElement, Show } from "solid-js"
import { Button, IncompleteIcon, SmallButton } from "./components/icons"
import { store } from './lib/db'

// home is dashboard that shows any running tests

const reserve = async (desc: string) => {

}
const release = async (id: number) => {

}
const releaseAll = async () => {

}
export function Home() {

  const availCount = () => store().setup ? store().setup.nworker - store()!.servers.length : 0
  let descInput: HTMLInputElement
  return (
    <main class="mx-auto text-gray-700 p-4">
      <label for="desc" class="block font-medium text-gray-700">Lock a server</label>

      <div class='mt-1' >
        <div class='flex flex-row'>
          <input ref={descInput!} class="mr-2 border-2 p-1 rounded-md border-sky-800 opacity-100'" autofocus name='desc' type='text' placeholder='Reservation notice'></input>
          <Button onClick={() => reserve(descInput!.value)}>Reserve</Button>
        </div>
      </div>
      <div>Servers Available: {availCount()} </div>
      <table class='mt-4'>
        <For each={store()?.servers ?? []} >{(e) => {
          return <tr><td>{e.description} <span class='text-neutral-400'>(#{e.id})</span></td>
            <td><SmallButton onClick={() => release(e.id)}>Release</SmallButton></td>
          </tr>
        }

        }</For></table>
      <div class='my-4'>
        <Button onClick={() => { }}>Refresh</Button>
        <Button onClick={() => releaseAll()}>Release all</Button></div>
    </main>
  );
}
