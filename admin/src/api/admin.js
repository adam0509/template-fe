import request from "../axios";
const entity = "admins"; // 需手动修改

// 食材列表 (with pagination, sorting, and search)
export function getEntities(
  params = { page: 1, limit: 10, sortBy: "name", order: "ASC", search: "" }
) {
  return request({
    url: `/${entity}`,
    method: "get",
    params, // Pass pagination, sorting, and search parameters
  });
}

// 创建食材
export function createEntity(data) {
  return request({
    url: `/${entity}`,
    method: "post",
    data,
  });
}

// 修改食材
export function changeEntity(id, data) {
  return request({
    url: `/${entity}/${id}`,
    method: "put",
    data,
  });
}

// 删除食材
export function destroyEntity(id, data) {
  return request({
    url: `/${entity}/${id}`,
    method: "delete",
    data
  });
}

// 管理员登录
export function login(data) {
    return request({
        url: `/${entity}/login`,
        method: 'post',
        data
    })
}