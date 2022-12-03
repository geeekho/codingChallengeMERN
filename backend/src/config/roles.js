const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageEmployees', 'getEmployees', 'manageTimeSlot', 'getTimeSlots'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
