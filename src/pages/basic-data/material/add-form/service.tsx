import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request('/api/advancedForm', {
    method: 'POST',
    data: params,
  });
}

/** 获取仓位列表 GET /api/query */
export async function query(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<Position.ListItem>('/api/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
