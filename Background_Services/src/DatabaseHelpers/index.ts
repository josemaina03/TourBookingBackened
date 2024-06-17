import mssql, { ConnectionPool, Request } from "mssql";
import { sqlConfig } from "../config";


export class DBHelper {
    private pool: Promise<ConnectionPool>
    constructor() {
        this.pool = mssql.connect(sqlConfig)
    }


    async exec(storedProcedure: string, data: { [x: string]: string | number }) {
        const emptyRequest = (await this.pool).request()
        const request = this.createRequest(emptyRequest, data)
        let results = await request.execute(storedProcedure)

         return results
    }

    async query(queryString: string) {
        return await (await this.pool).request().query(queryString)
    }

    private createRequest(emptyRequest: Request, data: { [x: string]: string | number }) {
        const keys = Object.keys(data)
        keys.map(key => {
            emptyRequest.input(key, data[key])
        })

        return emptyRequest
    }


}