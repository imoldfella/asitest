// @refresh reload
import { For, Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";


const tabs = [
  { href: '/', name: 'Home'},
  { href: '/setup', name: 'Configure'},
  { href: '/tenant', name: 'Tenant'},
  { href: '/copy', name: 'Copy'},
  { href: '/db', name: 'DB'}
]

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <nav class="bg-sky-800">
              <ul class="container flex items-center p-3 text-gray-200">
                <For each={tabs}>{(e,i)=>{
                  return <li class={`border-b-2 ${active(e.href)} mx-1.5 sm:mx-6`}>
                  <A href={e.href}>{e.name}</A>
                </li>
                }
}</For>
                
              </ul>
            </nav>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
