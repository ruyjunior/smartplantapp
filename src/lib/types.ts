export type propsPage = {
  params: Promise<{
    id: string;
    search: string;
    query: string;
    page: number;
  }>;
  alert: {
    title: string;
    message: string;
    type: string | 'success' | 'error' | 'info' | 'warning';
  };
};