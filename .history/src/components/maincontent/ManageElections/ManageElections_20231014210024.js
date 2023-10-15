import React from 'react';
import CreateElections from './CreateElection';
import ElectionList from './ElectionList';

const ManageElections = () => {
    return (
        <div>
            <h1>Manage Elections</h1>
            <CreateElections />
            <ElectionList />
        </div>
    );
};

export default ManageElections;
