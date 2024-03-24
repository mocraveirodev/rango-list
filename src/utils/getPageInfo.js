export function getPageInfo(page, perPage, count) {
    const lastPage = Math.ceil(count / perPage);
    const currentPage = page;
    const pageInfo = {
        total: count,
        perPage,
        currentPage,
        lastPage: lastPage,
        hasNextPage: currentPage < lastPage,
    };

    return pageInfo;
}
