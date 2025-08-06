import * as rpc from "vlens/rpc"

export interface Empty {
}

export interface ResumeResponse {
    Name: string
    Title: string
    Summary: string
    Experience: ExperienceResponse[]
    Skills: SkillResponse
    Education: EducationResponse
}

export interface VisitsResponse {
    Visits: Visit[]
}

export interface SessionsResponse {
    Sessions: Session[]
}

export interface ExperienceResponse {
    Company: string
    Role: string
    Location: string
    Period: string
    Bullets: string[]
}

export interface SkillResponse {
    Languages: string[]
    Tools: string[]
}

export interface EducationResponse {
    School: string
    Degree: string
    Period: string
}

export interface Visit {
    Id: number
    Timestamp: string
    Ip: string
    UserAgent: string
    Referrer: string
    Path: string
}

export interface Session {
    Id: number
    StartTime: string
    EndTime: string
    Ip: string
    UserAgent: string
    Country: string
    RequestCount: number
    IsBot: boolean
    IsMobile: boolean
    Platform: string
    Browser: string
}

export async function GetResume(data: Empty): Promise<rpc.Response<ResumeResponse>> {
    return await rpc.call<ResumeResponse>('GetResume', JSON.stringify(data));
}

export async function GetVisits(data: Empty): Promise<rpc.Response<VisitsResponse>> {
    return await rpc.call<VisitsResponse>('GetVisits', JSON.stringify(data));
}

export async function GetSessions(data: Empty): Promise<rpc.Response<SessionsResponse>> {
    return await rpc.call<SessionsResponse>('GetSessions', JSON.stringify(data));
}

