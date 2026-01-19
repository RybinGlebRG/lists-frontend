import User from '../../domain/user/User'
import * as BaseRepository from '../base/BaseRepository'

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

export async function getAll(): Promise<BacklogResponse> {

    let res = await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(`${window.location.origin}/api/v1/users/${user.id}/backlogItems`,
                {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                }
            )
        }
    );

    let backlog: Promise<BacklogResponse> = await res.json();

    return backlog;       
}

export async function create(backlogItemCreateReqauest: BacklogItemCreateRequest): Promise<BacklogItemResponse> {

    let res = await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(`${window.location.origin}/api/v1/users/${user.id}/backlogItems`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(backlogItemCreateReqauest)
                }
            )
        }
    );

    let backlog: Promise<BacklogItemResponse> = await res.json();

    return backlog;       
}

export async function deleteBacklogItem(backlogItemId: number): Promise<void> {

    await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(`${window.location.origin}/api/v1/users/${user.id}/backlogItems/${backlogItemId}`,
                {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                }
            )
        }
    );
     
}

export async function createBacklogItemEvent(backlogItemEventCreateRequest: BacklogItemEventCreateRequest, backlogItemId: number): Promise<void> {

    await BaseRepository.fetchWithRetry(
        (user: User) => {
            return fetch(`${window.location.origin}/api/v1/users/${user.id}/backlogItems/${backlogItemId}/events`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${user.accessToken}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(backlogItemEventCreateRequest)
                }
            )
        }
    );
     
}
