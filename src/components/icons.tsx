import { Component, JSXElement } from "solid-js";


export function IncompleteIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="-3 -3 105 105"
      >
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#ededed"
          stroke-width="3"
        />
      </svg>
    );
  }
  
  export function CompleteIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="-3 -3 105 105"
      >
        <circle
          cx="50"
          cy="50"
          r="50"
          fill="none"
          stroke="#bddad5"
          stroke-width="3"
        />
        <path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z" />
      </svg>
    );
  }

  export const Button: Component<{ class?: string, onClick: () => void, children: JSXElement }> = (props) => {
    return <button class={`${props.class} mr-2 inline-flex items-center rounded border border-transparent bg-sky-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`} onClick={props.onClick}>{props.children}</button>
  }
  export const SmallButton: Component<{ onClick: () => void, children: JSXElement }> = (props) => {
    return <a class="mr-2 cursor-pointer inline-flex items-center  text-sky-800 px-2.5 py-1.5  font-medium rounded-md  hover:underline " onClick={props.onClick}>{props.children}</a>
  }
  