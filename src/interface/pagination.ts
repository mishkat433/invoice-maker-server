
export type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    nextPage?: number | null;
    prevPage?: number | null;
};



export type IUserFilters = {
    searchTerm?: string
}