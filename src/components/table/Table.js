import React from 'react';
import TableItem from './TableItem';
import AddUser from '../AddUser';

const Table = ({ users, setEditingFlag, delUser, addUser, editUser, isEditing }) => (
	<section className="text-center">
		<h1 className="mt-5 display-6 text-muted">Данные пользователей</h1>
		<div className="wrapper
										row
										align-items-start
										justify-content-between">
			<table className="table
												table-striped
												table-borderless
												table-hover
												col-9">
				<tbody>
					{
						users.map(item => (
							<TableItem
								key = { item._id }
								user = { item }
								delUser = { delUser }
								editUser = { editUser }
								setEditingFlag = { setEditingFlag }
								isEditing = { isEditing }
							/>
						))
					}
				</tbody>
			</table>
			<AddUser
				addUser = { addUser }
				setEditingFlag = { setEditingFlag }
				isEditing = { isEditing }
			/>
		</div>
	</section>
);

export default Table;