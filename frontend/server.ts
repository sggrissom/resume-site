import * as rpc from "vlens/rpc"

export interface Empty {
}

export interface ResumeResponse {
    Field: string
}

export async function GetResume(data: Empty): Promise<rpc.Response<ResumeResponse>> {
    return await rpc.call<ResumeResponse>('GetResume', JSON.stringify(data));
}

