import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const AddUser = ({ addUser }) => {
	const [show, setShow] = useState(false);

	const data = {
		firstName : '',
		lastName : '',
		age : 0,
		country : ''
	};

	const [user, setUser] = useState(data);

	const handleInputChange = e => {
    const { name, value } = e.currentTarget;
    setUser({ ...user, [name]: value });
  }

	const handleSubmit = e => {
		e.preventDefault();
		addUser(user);

		handleClose();
	}

  const handleClose = () => {
		setShow(false);
	}

	const handleShow = () => setShow(true);
	
	return(
		<>
			<button className="add-btn
													btn
													btn-primary
													col-auto"
							onClick={ handleShow }
			>Добавить пользователя</button>
			<Modal
				centered
				className="modal fade"
				show={ show }
				onHide={ handleClose }
				size="lg">
				<Modal.Header className="modal-header" closeButton>
					<Modal.Title className="modal-title">Добавление нового пользователя</Modal.Title>
				</Modal.Header>
				<Modal.Body className="modal-body">
					<form id="add-user-form" onSubmit={ handleSubmit }>
						<div className="form-group">
							<label htmlFor="first-name">Имя</label>
							<input type="text"
											className="form-control"
											id="first-name"
											name="firstName"
											required
											onChange = { handleInputChange }/>
						</div>
						<div className="form-group">
							<label htmlFor="last-name">Фамилия</label>
							<input type="text"
											className="form-control"
											id="last-name"
											name="lastName"
											required
											onChange = { handleInputChange }/>
						</div>
						<div className="form-group">
							<label htmlFor="age">Возраст</label>
							<input type="number"
											className="form-control"
											id="age"
											name="age"
											required
											onChange = { handleInputChange }/>
						</div>
						<div className="form-group">
							<label htmlFor="country">Страна</label>
							<input type="text"
											className="form-control"
											id="country"
											name="country"
											required
											onChange = { handleInputChange }/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer className="modal-footer">
					<button
						className="btn btn-secondary"
						onClick={ handleClose }
					>Закрыть</button>
					<button
						type="submit"
						form="add-user-form"
						className="btn btn-primary"
					>Добавить</button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default AddUser;