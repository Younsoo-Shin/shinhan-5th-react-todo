import { useCallback, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { serverLogin } from '../services/authService';

export default function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [authToken, setAuthToken] = useState({});

  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });
  useEffect(() => {
    const data = sessionStorage.getItem('authToken');
    if (data) {
      setAuthToken(JSON.parse(data));
    }
  }, []);

  const submitLogin = useCallback(() => {
    serverLogin(userInput.email, userInput.password).then((data) => {
      setAuthToken(data);
      handleClose();
    });
  }, [userInput]);

  return (
    <>
      {authToken.email ? (
        authToken.email
      ) : (
        <Button variant="primary" onClick={handleShow}>
          로그인
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) => {
                  setUserInput((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
                value={userInput.email}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={userInput.password}
                onChange={(e) => {
                  setUserInput((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              submitLogin();
            }}
          >
            {/* Save Changes */}
            로그인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
