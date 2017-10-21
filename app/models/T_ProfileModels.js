'use strict';

module.exports = function(sequelize, DataTypes) {

	var T_Profile = sequelize.define('T_Profile', {
			ProfileID: DataTypes.STRING,
			FirstName: DataTypes.STRING,
			LastName: DataTypes.STRING,
			Address: DataTypes.STRING,
			Gender: DataTypes.INTEGER,
			DOB: DataTypes.DATE,
			Remarks: DataTypes.STRING,
			CreatedDate: DataTypes.DATE,
			CreatedBy: DataTypes.STRING,
			LastUpdatedDate: DataTypes.DATE,
			LastUpdatedBy: DataTypes.STRING
		}
		// {
		// 	associate: function(models){
		// 		T_Profile.belongsTo(models.T_Profile);
		// 	}
		// }
	);

	return T_Profile;
};
