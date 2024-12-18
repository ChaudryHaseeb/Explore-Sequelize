const func = require('../permission/CommonFunc')
const ViewRole = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'view_role');
    return func.sendResponse(is_assigned, res, next)
}
const CreateRole = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'create_role');
    return func.sendResponse(is_assigned, res, next)
}
const UpdateRole = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'update_role');
    return func.sendResponse(is_assigned, res, next)
}
const DeleteRole = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'delete_role');
    return func.sendResponse(is_assigned, res, next)
}
module.exports = {
    ViewRole,
    CreateRole,
    DeleteRole,
    UpdateRole,
}