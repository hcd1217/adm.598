interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    data: T;
    result: T
}

interface ApiResponseList<T> {
    success: boolean;
    statusCode: number;
    data: {
        items: T[];
        count: number;
    };
}
