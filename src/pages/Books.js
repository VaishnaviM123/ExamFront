import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Button, Modal, Card, Container, Row, Col } from 'react-bootstrap';
import { accessBooksAPI, addBookAPI, editBookAPI } from '../services/AllApis';

function BookGallery() {
  const [showModal, setShowModal] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [bookInputs, setBookInputs] = useState({
    title: "",
    author: "",
    coverImg: ""
  });

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const setData = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setBookInputs({ ...bookInputs, [name]: value });
  };

  const addBook = async () => {
    const { title, author, coverImg } = bookInputs;
    if (title === "" || coverImg === "" || author === "") {
      alert("Fill all * data");
    } else {
      try {
        const out = await addBookAPI({ title, author, coverImg });

        if (out.status >= 200 && out.status < 300) {
          setBookInputs({ title: "", author: "", coverImg: "" });
          handleCloseModal();
          alert('Book added successfully!');
          setAllBooks([...allBooks, out.data]);
        } else {
          throw new Error('Book adding failed');
        }
      } catch (error) {
        alert(`${error.message}`);
      }
    }
  };

  const getBooks = async () => {
    const out = await accessBooksAPI();
    if (out.status >= 200 && out.status < 300) {
      setAllBooks(out.data);
    } else {
      alert("Book fetching failed");
    }
  };

  const editBook = (id) => {
    const bookToEdit = allBooks.find(b => b.id === id);
    if (bookToEdit) {
      setBookInputs({
        title: bookToEdit.title,
        author: bookToEdit.author,
        coverImg: bookToEdit.coverImg
      });
      setSelectedBookId(id);
      setEditMode(true);
      setShowModal(true);
    }
  };

  const updateBook = async () => {
    const { title, author, coverImg } = bookInputs;
    if (title === "" || coverImg === "" || author === "") {
      alert("Fill all * data");
    } else {
      try {
        const res = await editBookAPI(selectedBookId, { title, author, coverImg });
        if (res.status >= 200 && res.status < 300) {
          alert("Updated Successfully");
          setBookInputs({ title: "", author: "", coverImg: "" });
          setAllBooks(allBooks.map(b => b.id === selectedBookId ? res.data : b));
          handleCloseModal();
          setEditMode(false);
          setSelectedBookId(null);
        } else {
          throw new Error('Book updating failed');
        }
      } catch (error) {
        alert(`${error.message}`);
      }
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className='py-5 text-center' style={{background:'rgba(210,238,238,1) 0%'}}>
      <Container>
        <h1 className='a1 text-center pb-3 fw-bolder fs-1' style={{color:'rgba(38,66,71,1)'}}>Welcome to the Book Gallery</h1>
        <Button variant='outline-dark mb-3 px-3' onClick={handleShowModal}>Add New Book</Button>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
        <div style={{ backgroundColor: '#FED8B1', padding: '10px', borderRadius: '10px', fontFamily: 'Playfair Display, serif' }}>
          <div style={{ backgroundColor: '#fff', color: 'black', borderRadius: '2px' }}>
            <Modal.Header className='d-flex text-center justify-content-center align-items-center flex-column'>
              <Modal.Title className='fs-2 pb-2'>{editMode ? 'Edit' : 'Add'} Book Details</Modal.Title>
              <InputGroup>
                <Form.Control type="text" placeholder="Book Title" name="title"
                  style={{ marginBottom: '14px', boxShadow: 'none', backgroundColor: 'transparent' }} value={bookInputs.title} onChange={setData} />
              </InputGroup>
              <InputGroup>
                <Form.Control type="url" placeholder="Cover Image URL" name="coverImg"
                  style={{ marginBottom: '14px', boxShadow: 'none', backgroundColor: 'transparent' }} value={bookInputs.coverImg} onChange={setData} />
              </InputGroup>
              <InputGroup>
                <Form.Control type="text" placeholder="Author" name="author"
                  style={{ marginBottom: '14px', boxShadow: 'none', backgroundColor: 'transparent' }} value={bookInputs.author} onChange={setData} />
              </InputGroup>
              <div className='mt-2'>
                <Button variant="outline-danger border-2 fw-bolder" onClick={handleCloseModal} className='me-4'>Close</Button>
                <Button variant="outline-success border-2 fw-bolder" onClick={editMode ? updateBook : addBook}>{editMode ? 'Update' : 'Add'} Book</Button>
              </div>
            </Modal.Header>
          </div>
        </div>
      </Modal>

      {allBooks?.length > 0 ?
        <div>
          <h1 className='text-center pb-5 fw-bold' style={{color:'rgba(38,66,71,1)'}}>Our Book Collection</h1>
          <Container className='d-flex flex-column'>
            <Row className='justify-content-center'>
              {allBooks.map(book => (
                <Col key={book.id} className='mb-4 d-flex justify-content-center'>
                  <Card style={{ width: '18em' }} data-aos="fade-in">
                    <div className='card-cont'>
                      <img src={book.coverImg} style={{ cursor: 'pointer' }} onClick={() => window.open(book.coverImg, '_blank')} width='100%' height="280em" alt={book.title} />
                    </div>
                    <Card.Body className='d-flex justify-content-center flex-column text-center p-1' style={{lineHeight:'0'}}>
                      <Card.Title className='fs-5 pb-2'>{book.title}</Card.Title>
                      <Card.Text>
                        {book.author}
                      </Card.Text>
                      <Button variant="outline-primary mx-3 mb-3 border-1 fw-bold" onClick={() => editBook(book.id)}>Edit</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        : <h2 className='text-center mt-5'>No Books to Show</h2>
      }
    </div>
  );
}

export default BookGallery;