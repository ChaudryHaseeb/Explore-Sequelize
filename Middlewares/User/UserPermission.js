const func = require('./../permission/CommonFunc')
const ViewUser = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'user_view');
    return func.sendResponse(is_assigned, res, next)
}
const CreateUser = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'user_create');
    return func.sendResponse(is_assigned, res, next)
}
const UpdateUser = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'user_update');
    return func.sendResponse(is_assigned, res, next)
}
const DeleteUser = async function (req, res, next) {
    let is_assigned = await func.isAssigned(req, 'user_delete');
    return func.sendResponse(is_assigned, res, next)
}
module.exports = {
    ViewUser,
    CreateUser,
    DeleteUser,
    UpdateUser
}