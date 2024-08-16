import { api } from '@/utils/api';

export async function fetchUsers() {
    const response = await api.get<ApiResponse<any>>(`/shared/fetchUsers`);
    return response.data.data;
}
