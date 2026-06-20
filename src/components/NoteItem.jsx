// NoteItem.js
import React from 'react';
import { Card } from 'antd';

const NoteItem = ({ note }) => {
  return (
    <Card title={note.title} style={{ marginBottom: '16px' }} extra={note.createdAt}>
      <p>{note.body}</p>
    </Card>
  );
};

export default NoteItem;
