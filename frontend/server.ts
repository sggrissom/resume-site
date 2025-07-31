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

export async function GetResume(data: Empty): Promise<rpc.Response<ResumeResponse>> {
    return await rpc.call<ResumeResponse>('GetResume', JSON.stringify(data));
}

