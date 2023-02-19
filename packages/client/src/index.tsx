// @refresh reload
import { ErrorBoundary, For, Suspense } from "solid-js"
import {
  useLocation,
  A,
  Routes,
  Route,
  Router,
} from "@solidjs/router"
import "./index.css"
import { Home } from "./home"
import Sql, { Configure, CopyFiles } from "./db"
import Tenant from "./tenant"
import { render } from 'solid-js/web'

const tabs = [
  { href: '/', name: 'Home' },
  { href: '/setup', name: 'Configure' },
  { href: '/tenant', name: 'Tenant' },
  { href: '/copy', name: 'Copy' },
  { href: '/db', name: 'DB' }
]

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (

    <Suspense>
      <ErrorBoundary fallback={err => err}>
        <nav class="bg-sky-800">
          <ul class="container flex items-center p-3 text-gray-200">
            <For each={tabs}>{(e, i) => {
              return <li class={`border-b-2 ${active(e.href)} mx-1.5 sm:mx-6`}>
                <A href={e.href}>{e.name}</A>
              </li>
            }
            }</For>

          </ul>
        </nav>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/setup" component={Configure} />
          <Route path="/tenant" component={Tenant} />
          <Route path="/copy" component={CopyFiles} />
          <Route path="/db" component={Sql} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
}
render(() => <Router><Root /></Router>, document.getElementById("app")!);