import React, { useState } from 'react';
import $ from 'jquery';

const TableItem = ({ user, delUser, editUser, setEditingFlag, isEditing }) => {

	const handleEdit = e => {
		if (isEditing) {
			editUser(userData, user._id);
			setEditingFlag(false);
		} else
			setEditingFlag(true);
		
		const target = e.target;
		$(target).text(isEditing ? 'редактировать' : 'coхранить');
		$(target).toggleClass('btn-outline-info', isEditing);
		$(target).toggleClass('btn-outline-success', !isEditing);

		const tableItem = $(target).closest(".table-item");
		const itemInputs = $(tableItem).find("input");

		$(itemInputs).toggleClass('form-control-plaintext', isEditing);
		$(itemInputs).toggleClass('form-control', !isEditing);

		$(itemInputs).prop('disabled', isEditing);
	}

	const data = {
		firstName : user.data.firstName || "Не определено",
		lastName : user.data.lastName || "Не определено",
		age : user.data.age || 0,
		country : user.data.country || "Не определено"
	};

	const [userData, setUser] = useState(data);

	const handleInputChange = e => {
		const { name, value } = e.target;
		
		setUser({ ...userData, [name]: value });
  }

	return(
		<tr className="table-item">
			<td>
				<input
					className="form-control-plaintext
											text-center"
					type="text"
					name="firstName"
					disabled
					value={ userData.firstName }
					onChange={ handleInputChange }>
				</input>
			</td>
			<td>
				<input
					className="form-control-plaintext
											text-center"
					type="text"
					name="lastName"
					disabled
					value={ userData.lastName }
					onChange={ handleInputChange }>
				</input>
			</td>
			<td>
				<input
					className="form-control-plaintext
											text-center"
					type="number"
					name="age"
					disabled
					value={ userData.age }
					onChange={ handleInputChange }>
				</input>
			</td>
			<td>
				<input
					className="form-control-plaintext
											text-center"
					type="text"
					name="country"
					disabled
					value={ userData.country }
					onChange={ handleInputChange }>
				</input>
			</td>
			<td>
				<button className='table-item__change
														btn
														btn-sm
														btn-outline-info'
								onClick={ handleEdit }
				>редактировать</button>
			</td>
			<td>
				<button className="table-item__delete
														btn
														btn-sm
														btn-outline-danger"
								onClick={ () => window.confirm('Вы уверены?') ? delUser(user._id) : false }
				>удалить</button>
			</td>
		</tr>
	)
}

export default TableItem;
