import { defaultSetup, store, TestSetup } from "./lib/db"
import { createSignal, Show } from "solid-js";
import { CodeView } from "./lib/codeview";
import json from 'highlight.js/lib/languages/json';
import hljs from 'highlight.js/lib/core';
hljs.registerLanguage('json', json);

export function make_tenant(s: TestSetup) {
  let tenant: any[] = []
  for (let i = 0; i < s.nworker; i++) {
    var name = `Tenant${i}`
    var ihost = `${i}.${s.host}`
    tenant.push({
      "TenantId": name,
      "IsActive": true,
      "Name": name,
      "HostNames": ihost,
      "DatabaseConnectionInformation": {
        "DatabaseName": `${s.db}_${i}`,
        "DatabasePassword": "dsa",
        "DatabaseUserId": "sa",
        "DataSource": s.sqlserver
      },
      "DatabaseConnectionInformationIsEncrypted": false,
      "WebsiteBaseUri": `https://${ihost}`,
      "ServicesBaseUri": `https://${s.host}/iMISService`,
      "ReportingServiceBaseUri": "https://Exago.asiops.com/Exago/",
      "FileSystemBaseUri": `c:\\VSTS\\master\\deployment\\v10\\TenantData\\Tenants\\Tenant${i}`,
      "UpgradePackageFolder": "c:\\VSTS\\master\\tools\\v10\\DevelopmentResources\\Setup\\Upgrade\\IMISDBUpgrade",
      "CloudConnectionInformation": {
        "ClientId": null,
        "ClientSecret": null,
        "KeyVaultUri": null
      },
      "AuthorityEndpoints": {
        "DiscoveryEndpoint": `https://${ihost}/.well-known/openid-configuration`,
        "TokenEndpoint": `https://${ihost}/connect/token`,
        "AuthorizationEndpoint": `https://${ihost}/connect/authorize`
      }
    })
  }
  return {
    "Tenants": tenant,
    "ApplicationSettings": {
      "TrustedIps": "::1,127.0.0.1,10.0.0.0/8,192.168.0.0/16,172.16.0.0/12",
      "DefaultSharedCacheHostName": "localhost:6379",
      "SessionStateHostHostName": "localhost",
      "UsageReportServiceBaseUri": "https://informationservice.imistest.com"
    }
  }

}

export default function Tenant() {

  return (
    <main class="mx-auto text-gray-700 p-4">
      <CodeView language={'json'}
        downloadAs='tenant.json'
        code={JSON.stringify(make_tenant(store().setup), null, "    ")}
      />
    </main>
  );
}
