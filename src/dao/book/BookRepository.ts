import * as commonApi from '../../common/commonApi'


export async function deleteBook(bookId: number, userId: number, JWT: string, onUnauthorized: () => void): Promise<void> {
    
    let res = await fetch(`${window.location.origin}/api/v1/users/${userId}/books/${bookId}`,
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${JWT}`
            }
        }
    );
    await commonApi.checkError(res, onUnauthorized);
}
