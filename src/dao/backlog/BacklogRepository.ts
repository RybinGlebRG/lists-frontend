import * as commonApi from '../../common/commonApi'

export interface BacklogItemResponse {
    id: number,
    title: string,
    type: number,
    note: string,
    creationDate: string
} 

export interface BacklogResponse {
    items: BacklogItemResponse[],
} 

export interface BacklogItemCreateRequest {
    title: string,
    type: number,
    note: string | null,
    creationDate: string | null
} 

export interface BacklogItemEventCreateRequest {
    eventTypeId: number
}

export async function getAll(userId: number, JWT: string, onUnauthorized: () => void): Promise<BacklogResponse> {

    let res = await fetch(`${window.location.origin}/api/v1/users/${userId}/backlogItems`,
            {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            }
        );
    await commonApi.checkError(res, onUnauthorized);

    let backlog: Promise<BacklogResponse> = await res.json();

    return backlog;       
}

export async function create(backlogItemCreateReqauest: BacklogItemCreateRequest, userId: number, JWT: string, onUnauthorized: () => void): Promise<BacklogItemResponse> {

    let res = await fetch(`${window.location.origin}/api/v1/users/${userId}/backlogItems`,
            {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${JWT}`,
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(backlogItemCreateReqauest)
            }
        );
    await commonApi.checkError(res, onUnauthorized);

    let backlog: Promise<BacklogItemResponse> = await res.json();

    return backlog;       
}

export async function deleteBacklogItem(backlogItemId: number, userId: number, JWT: string, onUnauthorized: () => void): Promise<void> {

    let res = await fetch(`${window.location.origin}/api/v1/users/${userId}/backlogItems/${backlogItemId}`,
            {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            }
        );
    await commonApi.checkError(res, onUnauthorized);
     
}

export async function createBacklogItemEvent(backlogItemEventCreateRequest: BacklogItemEventCreateRequest, backlogItemId: number, userId: number, JWT: string, onUnauthorized: () => void): Promise<void> {

    let res = await fetch(`${window.location.origin}/api/v1/users/${userId}/backlogItems/${backlogItemId}/events`,
            {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${JWT}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(backlogItemEventCreateRequest)
            }
        );
    await commonApi.checkError(res, onUnauthorized);
     
}
