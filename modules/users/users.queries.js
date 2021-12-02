class UsersQueries {
  findByEmail = `SELECT
  user_admin.admin_id,
  user_admin.admin_type,
  admin_type.type_name,
  user_admin.first_name,
  user_admin.last_name,
  user_admin.email,
  user_admin.password,
  user_admin.date_created
FROM
  user_admin
LEFT JOIN admin_type ON user_admin.admin_type = admin_type.type_id
WHERE user_admin.email = ? `;

  findByID = `SELECT
  user_admin.admin_id,
  user_admin.admin_type,
  admin_type.type_name,
  user_admin.first_name,
  user_admin.last_name,
  user_admin.email,
  user_admin.date_created
FROM
  user_admin
LEFT JOIN admin_type ON user_admin.admin_type = admin_type.type_id
WHERE user_admin.admin_id = ? `;

  create = `INSERT INTO user_admin(admin_type, first_name, last_name, email, password, date_created)
  VALUES(?, ?, ?, ?, ?, ?)
  `;

  setAccess = `INSERT INTO user_admin_access(admin_id, access_id, admin_granter)
  SELECT
    ? AS admin_id,
    access_id,
    ? AS admin_granter
  FROM
    admin_access
    WHERE access_id IN (?)`;

  getAccess = `SELECT admin_access.access_id, admin_access.access_name 
  FROM 
  admin_access
  JOIN
    user_admin_access ON user_admin_access.access_id = admin_access.access_id
  WHERE
    user_admin_access.admin_id = ?`;
}

module.exports = new UsersQueries();
