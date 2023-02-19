// some code generation to let you view the code before executing it.

import { TestSetup } from "./db"
import { nstring } from "./foreach"


// how do we execute this with sqlcmd?
export const killall = (db: string) => `DECLARE @DatabaseName nvarchar(50)
SET @DatabaseName = N'${db}'
DECLARE @SQL varchar(max)
SELECT @SQL = COALESCE(@SQL,'') + 'Kill ' + Convert(varchar, SPId) + ';'
FROM MASTER..SysProcesses
WHERE DBId = DB_ID(@DatabaseName) AND SPId <> @@SPId
EXEC(@SQL)`

export const reset_db = (db: string) => `RESTORE DATABASE ${db} from DATABASE_SNAPSHOT = '${db}_ss'`

export const snapshot = (db: string,path:string) => `CREATE DATABASE ${db}_ss ON  ( NAME = ${db}, FILENAME = '${path}' ) AS SNAPSHOT OF ${db}`





