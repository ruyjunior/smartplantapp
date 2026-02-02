export type propsPage = {
    params: Promise<{
        search: '',
        query: '',
        page: 1,
    }>,
    alert: {
        title: string,
        message: string,
        type: string | 'success' | 'error' | 'info' | 'warning'
    }
}
