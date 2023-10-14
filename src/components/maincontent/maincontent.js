import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ManageAdmins from './ManageAdmins';
import StudentAffairs from './StudentAffairs';
import ElectionCommittee from './ElectionCommittee';
import ManageElections from './ManageElections';
import RegisterStudents from './RegisterStudents';
import Messages from './Messages';
import ViewResults from './ViewResults';
import Settings from './Settings';

function MainContent() {
  return (
    <main>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/manage-admins" component={ManageAdmins} />
        <Route path="/student-affairs" component={StudentAffairs} />
        <Route path="/election-committee" component={ElectionCommittee} />
        <Route path="/manage-elections" component={ManageElections} />
        <Route path="/register-students" component={RegisterStudents} />
        <Route path="/messages" component={Messages} />
        <Route path="/view-results" component={ViewResults} />
        <Route path="/settings" component={Settings} />
      </Switch>
    </main>
  );
}

export default MainContent;
