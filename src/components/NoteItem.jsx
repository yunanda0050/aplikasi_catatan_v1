// NoteItem.js
import React from 'react';
import { Card } from 'antd';
//import PropTypes from 'prop-types';
//import DeleteButton from './DeleteButton';
//import NoteItemBody from './NoteItemBody';


const NoteItem = ({ note }) => {
  const handleHapus = () => {
    hapusCatatan(index);
  };
  return (
    <Card title={note.title} style={{ marginBottom: '16px' }} extra={note.createdAt}>
      <p>{note.body}</p>
      <Button type="danger" onClick={handleHapus}>
        Hapus
      </Button>
    </Card>
  );
};

/*NoteItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onDelete: PropTypes.string.isRequired,
}*/

export default NoteItem;
